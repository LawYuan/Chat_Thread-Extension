document.addEventListener('DOMContentLoaded', () => {
  const userLang = navigator.language.toLowerCase();
  const isZh = userLang.startsWith('zh');

  const i18n = {
    zh: {
      title: "AI 动力引擎设置",
      subtitle: "请选择用于提取导航摘要的大模型，并填入您的 API 凭证。",
      zhipuTitle: "智谱 GLM-4-Flash <span class='badge badge-green'>国内免翻直连</span>",
      zhipuDesc: "响应极速且免费。无需配置网络代理，即插即用（强烈推荐国内用户）。",
      geminiTitle: "Google Gemini 1.5 Flash <span class='badge badge-orange'>需全局代理</span>",
      geminiDesc: "谷歌轻量级极速模型。提取精准且免费（海外网络环境推荐）。",
      zhipuLabel: "智谱 API Key",
      geminiLabel: "Gemini API Key",
      btnActionText: "前往获取免费 Key 🚀", 
      zhipuGuideText: "路径：注册登录 ➔ 创建项目 ➔ 添加新的 API Key ➔ 复制",
      geminiGuideText: "路径：登录 AI Studio ➔ Create API key ➔ 复制",
      viewImgText: "[查看图示]",
      zhipuPh: "粘贴您的智谱 Key",
      geminiPh: "粘贴您的 Gemini Key",
      save: "保存并启用",
      selectFirst: "请先选择一个 AI 引擎",
      status: "设置已成功保存，请刷新聊天网页生效",
      privacyText: "🛡️ 本插件仅提取当前网页的提示词并发送至您配置的 AI 服务商。API Key 仅保存在本地。保存设置即表示您同意我们的 <a href='https://attractive-bank-172.notion.site/Privacy-Policy-for-ChatThread-31414846fcea8018bd9eddb94c605d0f' target='_blank' style='color: #0b57d0; text-decoration: none; font-weight: 600;'>隐私政策</a>。"
    },
    en: {
      title: "AI Engine Settings",
      subtitle: "Select the AI model for generating navigation summaries and enter your API key.",
      zhipuTitle: "Zhipu GLM-4-Flash <span class='badge badge-green'>Mainland CN Ready</span>",
      zhipuDesc: "Excellent Chinese LLM alternative. Fast and reliable without VPN.",
      geminiTitle: "Google Gemini 1.5 Flash <span class='badge badge-orange'>Global</span>",
      geminiDesc: "Google's lightweight fast model. Highly accurate and globally accessible.",
      zhipuLabel: "Zhipu API Key",
      geminiLabel: "Gemini API Key",
      btnActionText: "🚀 Get Free Key ↗",
      zhipuGuideText: "Steps: Login ➔ Create Project ➔ Add New API Key ➔ Copy",
      geminiGuideText: "Steps: Login AI Studio ➔ Create API key ➔ Copy",
      viewImgText: "[View Image]",
      zhipuPh: "Paste your Zhipu Key",
      geminiPh: "Paste your Gemini Key",
      save: "Save & Apply",
      selectFirst: "Please select an engine first",
      status: "Settings saved! Please refresh the chat page.",
      privacyText: "🛡️ We only extract and send your prompts to your configured AI provider. API Keys are stored locally. By saving, you agree to our <a href='https://attractive-bank-172.notion.site/Privacy-Policy-for-ChatThread-31414846fcea8018bd9eddb94c605d0f' target='_blank' style='color: #0b57d0; text-decoration: none; font-weight: 600;'>Privacy Policy</a>."
    }
  };

  const t = isZh ? i18n.zh : i18n.en;

  document.getElementById('ui-title').innerText = t.title;
  document.getElementById('ui-subtitle').innerText = t.subtitle;
  document.getElementById('zhipu-title').innerHTML = t.zhipuTitle;
  document.getElementById('zhipu-desc').innerText = t.zhipuDesc;
  document.getElementById('gemini-title').innerHTML = t.geminiTitle;
  document.getElementById('gemini-desc').innerText = t.geminiDesc;
  document.getElementById('zhipu-label').innerText = t.zhipuLabel;
  document.getElementById('gemini-label').innerText = t.geminiLabel;
  
  document.getElementById('zhipu-link').innerText = t.btnActionText;
  document.getElementById('gemini-link').innerText = t.btnActionText;
  document.getElementById('zhipu-guide-text').innerText = t.zhipuGuideText;
  document.getElementById('gemini-guide-text').innerText = t.geminiGuideText;
  
  const zhipuViewImgEl = document.getElementById('zhipu-view-img');
  zhipuViewImgEl.innerHTML = t.viewImgText + zhipuViewImgEl.innerHTML;

  document.getElementById('zhipu-key').placeholder = t.zhipuPh;
  document.getElementById('gemini-key').placeholder = t.geminiPh;
  document.getElementById('status-text').innerText = t.status;
  
  // 🚨 新增：注入隐私披露文案（注意这里使用的是 innerHTML 以支持 a 标签）
  document.getElementById('privacy-text').innerHTML = t.privacyText;

  if (!isZh) document.getElementById('card-gemini').style.order = "-1";

  const radios = document.getElementsByName('engine');
  const zhipuGroup = document.getElementById('zhipu-group');
  const geminiGroup = document.getElementById('gemini-group');
  const zhipuInput = document.getElementById('zhipu-key');
  const geminiInput = document.getElementById('gemini-key');
  const btnSave = document.getElementById('btn-save');
  const status = document.getElementById('status');

  chrome.storage.local.get(['apiEngine', 'zhipuKey', 'geminiKey'], (res) => {
    if (res.zhipuKey) zhipuInput.value = res.zhipuKey;
    if (res.geminiKey) geminiInput.value = res.geminiKey;
    
    let engine = res.apiEngine;
    if (engine) {
        const activeRadio = document.querySelector(`input[value="${engine}"]`);
        if (activeRadio) activeRadio.checked = true;
        toggleGroups(engine);
        btnSave.innerText = t.save;
        btnSave.disabled = false;
    } else {
        zhipuGroup.style.display = 'none';
        geminiGroup.style.display = 'none';
        btnSave.innerText = t.selectFirst;
        btnSave.disabled = true;
    }
  });

  radios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        toggleGroups(e.target.value);
        btnSave.innerText = t.save;
        btnSave.disabled = false; 
    });
  });

  function toggleGroups(engine) {
    if (engine === 'zhipu') {
      zhipuGroup.style.display = 'block'; geminiGroup.style.display = 'none';
    } else {
      zhipuGroup.style.display = 'none'; geminiGroup.style.display = 'block';
    }
  }

  document.querySelectorAll('.toggle-vis').forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      const currentBtn = e.target.closest('.toggle-vis');
      const input = document.getElementById(currentBtn.getAttribute('data-target'));
      if (!input) return;
      if (input.type === "password") {
        input.type = "text";
        currentBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
      } else {
        input.type = "password";
        currentBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;
      }
    };
  });

  if (btnSave) {
    btnSave.onclick = () => {
      const selectedRadio = document.querySelector('input[name="engine"]:checked');
      if (!selectedRadio) return; 
      const engine = selectedRadio.value;
      chrome.storage.local.set({
        apiEngine: engine,
        zhipuKey: zhipuInput.value.trim(),
        geminiKey: geminiInput.value.trim()
      }, () => {
        status.style.display = 'flex'; 
        setTimeout(() => { status.style.display = 'none'; }, 2500);
      });
    };
  }
});