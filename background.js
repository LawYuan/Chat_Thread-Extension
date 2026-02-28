chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GENERATE_SUMMARY') {
    handleSummary(request.text).then(sendResponse);
    return true;
  }
  if (request.type === 'FETCH_IMAGE_BASE64') {
    fetchImageAsBase64(request.url).then(sendResponse);
    return true;
  }
});

async function fetchImageAsBase64(url) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve({ success: true, dataUrl: reader.result });
      reader.onerror = () => resolve({ success: false, error: 'FileReader error' });
      reader.readAsDataURL(blob);
    });
  } catch (err) {
    return { success: false, error: err.message };
  }
}

async function handleSummary(text) {
  try {
    const res = await chrome.storage.local.get(['apiEngine', 'zhipuKey', 'geminiKey']);
    const engine = res.apiEngine || 'zhipu';

    const rawKey = engine === 'zhipu' ? res.zhipuKey : res.geminiKey;
    if (!rawKey || rawKey.trim() === "") {
      throw new Error(`未设置 ${engine} Key`);
    }
    const apiKey = rawKey.trim();

    const systemPrompt = `你是一个资深的对话意图提炼专家。你的任务是为长对话生成侧边栏导航标签。
请精准提取以下用户提问的“核心诉求”或“具体任务”。

严格遵守以下要求：
1. 必须提炼出【动宾结构】或【核心意图】，绝对不要只摘抄名词！
   (反例：用户发了一段文案说“帮我优化”，标签不能是“广告文案”，必须是“优化广告文案”)
2. 对于长文本，请重点关注开头和结尾的真实指令。
3. 如果用户在探讨代码/Bug，请指出具体的语言或问题方向（如“排查React点击失效Bug”）。
4. 字数控制在 8-16 个字左右，必须极具辨识度。
5. 直接输出结果，不要带标点符号，不要有任何附加解释。

用户输入内容：\n`;

    let response;

    if (engine === 'zhipu') {
      response = await fetch("https://open.bigmodel.cn/api/paas/v4/chat/completions", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "glm-4-flash",
          messages: [{ role: "user", content: systemPrompt + text }],
          max_tokens: 50,
          temperature: 0.3
        })
      });
    } else if (engine === 'gemini') {
      response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: systemPrompt + text }] }],
          generationConfig: { maxOutputTokens: 50, temperature: 0.3 },
          safetySettings: [
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_ONLY_HIGH" },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_ONLY_HIGH" },
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_ONLY_HIGH" }
          ]
        })
      });
    }

    const data = await response.json();
    if (!response.ok || data.error) {
      throw new Error(data.error?.message || "服务器拒绝请求");
    }

    let summary = "";
    if (engine === 'zhipu') {
      summary = data.choices[0].message.content.trim().replace(/["'。，\n]/g, '');
    } else {
      // 加入容错判断，防止因内容被拦截而崩溃
      if (data.candidates && data.candidates[0].content) {
        summary = data.candidates[0].content.parts[0].text.trim().replace(/["'。，\n]/g, '');
      } else {
        summary = "⚠️ 内容被安全策略拦截";
      }
    }
    return { success: true, summary: summary };

  } catch (err) {
    return { success: false, error: err.message };
  }
}