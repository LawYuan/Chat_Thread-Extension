(function () {
  if (window !== window.top) return;

  const userLang = navigator.language.toLowerCase();
  const isZh = userLang.startsWith('zh');

  const t = {
    emptyStateText: isZh ? '当前无对话，等待开始...' : 'Waiting for conversation to start...',
    headerSuffix: isZh ? '时间线' : 'Timeline',
    searchPlaceholder: isZh ? '输入关键字过滤...' : 'Filter threads...',
    moveTitle: isZh ? '拖动调整位置' : 'Drag to move',
    resizeTitle: isZh ? '拖动调整大小，双击自适应' : 'Drag to resize, double-click to auto-fit',
    searchBtnTitle: isZh ? '搜索/过滤对话' : 'Search / Filter',
    exportBtnTitle: isZh ? '批量导出' : 'Export',
    toggleBtnTitle: isZh ? '展开/收起' : 'Expand / Collapse',
    expandTitle: isZh ? '展开' : 'Expand',
    collapseTitle: isZh ? '最小化' : 'Minimize',
    starBtnTitle: isZh ? '点击星标/取消置顶' : 'Star / Unstar',
    renameTitle: isZh ? '编辑' : 'Edit',
    exportItemTitle: isZh ? '导出当前' : 'Export Item',
    moreItemTitle: isZh ? '更多' : 'More',
    analyzing: isZh ? '正在提炼...' : 'Analyzing...',
    moreBtnTitle: isZh ? '更多' : 'More',
    extractFailed: isZh ? '❌ 提取失败' : '❌ Failed',
    savedPrefix: isZh ? '已收录: ' : 'Saved: ',
    selectAll: isZh ? '全选' : 'Select All',
    deselectAll: isZh ? '取消全选' : 'Deselect All',
    exitMode: isZh ? '退出' : 'Exit',
    exportAction: isZh ? '导出' : 'Export',
    formatMD: isZh ? '导出为 Markdown' : 'Export as Markdown',
    formatTXT: isZh ? '导出为 纯文本 (TXT)' : 'Export as Text',
    formatPDF: isZh ? '导出为 高清 PDF' : 'Export as PDF',
    formatWord: isZh ? '导出为 Word 文档' : 'Export as Word',
    obTitle: isZh ? '欢迎使用 AI时间线' : 'Welcome to AI Timeline',
    obStep1: isZh ? '1. 点击右上角<b>扩展程序</b>' : '1. Click Extensions',
    obStep2: isZh ? '2. 找到 <b>AI时间线</b> 并打开设置' : '2. Open AI Timeline settings',
    obStep3: isZh ? '3. 获取并填入免费 <b>API Key</b>' : '3. Enter API Key',
    obStep4: isZh ? '4. 保存后即刻 <b>自动启动</b>' : '4. Save to start',
    ghostToast: isZh ? '该记录较早，请向上滚动加载' : 'Scroll up to load'
  };

  function getSiteConfig() {
    const host = window.location.hostname;
    const path = window.location.pathname;
    if (host.includes('chatgpt.com') || host.includes('openai.com')) return { nameZh: 'ChatGPT', nameEn: 'ChatGPT', color: '#171717', bg: '#f4f4f4' };
    if (host.includes('gemini.google.com')) return { nameZh: 'Gemini', nameEn: 'Gemini', color: '#1a73e8', bg: '#e8f0fe' };
    if (host.includes('claude.ai')) return { nameZh: 'Claude', nameEn: 'Claude', color: '#d97757', bg: '#fbf5f3' };
    if (host.includes('deepseek.com')) return { nameZh: 'DeepSeek', nameEn: 'DeepSeek', color: '#4d6bfe', bg: '#edf0ff' };
    if (host.includes('doubao.com')) return { nameZh: '豆包', nameEn: 'Doubao', color: '#5c92fa', bg: '#eff5ff' };
    if (host.includes('kimi.com') || host.includes('moonshot.cn')) return { nameZh: 'Kimi', nameEn: 'Kimi', color: '#2a2a2a', bg: '#f5f5f5' };
    if (host.includes('grok.com') || (host.includes('x.com') && path.includes('/i/grok'))) return { nameZh: 'Grok', nameEn: 'Grok', color: '#0f1419', bg: '#f7f9f9' };
    if (host.includes('yuanbao.tencent.com')) return { nameZh: '元宝', nameEn: 'Yuanbao', color: '#46c279', bg: '#f0faf4' };
    if (host.includes('yiyan.baidu.com')) return { nameZh: '文心一言', nameEn: 'Ernie', color: '#1b62ff', bg: '#f0f5ff' };
    if (host.includes('qianwen.aliyun.com') || host.includes('tongyi.aliyun.com') || host.includes('qianwen.com') || host.includes('tongyi.ai')) return { nameZh: '通义千问', nameEn: 'Qwen', color: '#615ced', bg: '#f2f1fe' };
    if (host.includes('chatglm.cn') || host.includes('zhipuqingyan.cn')) return { nameZh: '智谱清言', nameEn: 'GLM', color: '#315efb', bg: '#f0f4ff' };
    if (host.includes('xinghuo.xfyun.cn')) return { nameZh: '讯飞星火', nameEn: 'Spark', color: '#0152d9', bg: '#eef4fd' };
    if (host.includes('tiangong.cn')) return { nameZh: '天工', nameEn: 'Tiangong', color: '#5C45FF', bg: '#F2F0FF' };
    if (host.includes('manus.im')) return { nameZh: 'Manus', nameEn: 'Manus', color: '#333333', bg: '#F4F5F7' };
    if (host.includes('perplexity.ai')) return { nameZh: 'Perplexity', nameEn: 'Perplexity', color: '#247c84', bg: '#eaf1f2' };
    if (host.includes('minimax.com') || host.includes('hailuoai.com') || host.includes('hailu.minimax.com')) return { nameZh: 'MiniMax', nameEn: 'MiniMax', color: '#B4393C', bg: '#f8eaeb' };
    return { nameZh: 'AI', nameEn: 'AI', color: '#0b57d0', bg: '#e8f0fe' };
  }

  const siteConfig = getSiteConfig();
  if (!siteConfig) return;
  const currentSiteName = isZh ? siteConfig.nameZh : siteConfig.nameEn;
  const SAFE_TOP_MARGIN = 75;

  const AppState = {
    summaryCache: new Map(),
    starredItems: new Set(),
    starredDetails: new Map(), // 新增：保存星标节点跨页所需的信息（供幽灵渲染）
    navMappings: [],
    isAutoScrolling: false,
    scrollTimeout: null,
    lastMessageCount: 0,
    currentSearchTerm: "",
    savedHeight: 'auto',
    isSearchAutoExpanded: false,
    isStorageLoaded: false,
    isExportMode: false,
    selectedExportIds: new Set(),
    isFormatMenuOpen: false,
    hasValidKey: false,
    emptyStateTimeout: null,
    customTitles: new Map()
  };

  chrome.storage.local.get(['acnGlobalCache', 'acnStarredItems', 'acnStarredDetails', 'apiEngine', 'zhipuKey', 'geminiKey', 'acnCustomTitles'], (res) => {
    if (res.acnGlobalCache) { try { AppState.summaryCache = new Map(JSON.parse(res.acnGlobalCache)); } catch (e) { } }
    if (res.acnStarredItems) { try { AppState.starredItems = new Set(JSON.parse(res.acnStarredItems)); } catch (e) { } }
    if (res.acnStarredDetails) { try { AppState.starredDetails = new Map(JSON.parse(res.acnStarredDetails)); } catch (e) { } }
    if (res.acnCustomTitles) { try { AppState.customTitles = new Map(JSON.parse(res.acnCustomTitles)); } catch (e) { } }

    const engine = res.apiEngine || (isZh ? 'zhipu' : 'gemini');
    AppState.hasValidKey = engine === 'zhipu' ? !!res.zhipuKey : !!res.geminiKey;

    AppState.isStorageLoaded = true;
    syncNavigation();
  });

  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local' && (changes.apiEngine || changes.zhipuKey || changes.geminiKey)) {
      window.location.reload();
    }
  });

  function saveCacheToLocal() {
    const entries = Array.from(AppState.summaryCache.entries()).slice(-800);
    chrome.storage.local.set({ acnGlobalCache: JSON.stringify(entries) });
  }

  function saveStarsToLocal() {
    chrome.storage.local.set({
      acnStarredItems: JSON.stringify(Array.from(AppState.starredItems)),
      acnStarredDetails: JSON.stringify(Array.from(AppState.starredDetails.entries()))
    });
  }

  function saveCustomTitlesToLocal() {
    chrome.storage.local.set({ acnCustomTitles: JSON.stringify(Array.from(AppState.customTitles.entries())) });
  }

  let toastTimeout;
  function showToast(msg) {
    const toast = document.getElementById('ai-chat-nav-toast');
    if (!toast) return;
    toast.innerText = msg;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove('show'), 3000);
  }

  function ensureNavUI() {
    if (!document.body || window.innerWidth < 300 || window.innerHeight < 300) return;
    if (document.getElementById('ai-chat-nav-container')) return;

    const nav = document.createElement('div');
    nav.id = 'ai-chat-nav-container';
    nav.style.setProperty('--nav-theme-color', siteConfig.color);
    nav.style.setProperty('--nav-theme-bg', siteConfig.bg);

    nav.innerHTML = `
    <div id="ai-chat-nav-top-resize-handle" title="${t.resizeTitle}"></div>
    <div id="ai-chat-nav-header">
      <div class="header-controls-left">
        <div class="header-btn header-search-btn" title="${t.searchBtnTitle}">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>
      </div>
      <input type="text" id="ai-chat-nav-search-input" placeholder="${t.searchPlaceholder}" autocomplete="off"/>
      <div class="header-title-text" title="${t.moveTitle}">${t.headerSuffix}</div>
      <div class="header-controls-right">
        <div class="header-btn header-toggle-icon" title="${t.collapseTitle}">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
        </div>
      </div>
    </div>
    <div id="ai-chat-nav-peek"></div>
    <div id="ai-chat-nav-toast" class="nav-toast"></div>
    <div id="ai-chat-nav-item-menu" class="item-more-menu">
        <div class="more-menu-item action-item-rename">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
          <span>${t.renameTitle}</span>
        </div>
        <div class="more-menu-item action-item-export">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          <span>${t.exportAction}</span>
        </div>
    </div>
      
    <div id="ai-chat-nav-onboarding">
        <div class="onboarding-icon">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="10" y1="5" x2="21" y2="5"></line><line x1="10" y1="12" x2="21" y2="12"></line><line x1="10" y1="19" x2="21" y2="19"></line><circle cx="4" cy="5" r="2.5" fill="currentColor" stroke="none"></circle><circle cx="4" cy="12" r="2.5" fill="currentColor" stroke="none"></circle><circle cx="4" cy="19" r="2.5" fill="currentColor" stroke="none"></circle></svg>
        </div>
        <div class="onboarding-title">${t.obTitle}</div>
        <div class="onboarding-step"><p>${t.obStep1}</p><p>${t.obStep2}</p><p>${t.obStep3}</p><p>${t.obStep4}</p></div>
      </div>
      <div id="ai-chat-nav-empty-state">
        <svg class="empty-state-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
        <div class="empty-state-text">${t.emptyStateText}</div>
      </div>

      <div id="ai-chat-nav-pinned-list"></div>
      <div id="ai-chat-nav-global-loading"><div class="nav-dot"></div><div class="nav-dot"></div><div class="nav-dot"></div></div>
      <div id="ai-chat-nav-list"></div>
      
      <div id="ai-chat-nav-format-menu">
         <div class="format-option-btn" data-format="md">${t.formatMD}</div>
         <div class="format-option-btn" data-format="word">${t.formatWord}</div>
         <div class="format-option-btn" data-format="txt">${t.formatTXT}</div>
         <div class="format-option-btn" data-format="pdf">${t.formatPDF}</div>
      </div>

      <div id="ai-chat-nav-action-bar">
         <div class="action-bar-left">
           <div class="action-btn btn-text action-select-all">${t.selectAll}</div>
         </div>
         <div class="action-bar-right">
           <div class="action-btn btn-text action-cancel">${t.exitMode}</div>
           <div class="action-btn btn-primary action-confirm disabled">${t.exportAction}</div>
         </div>
      </div>

      <div id="ai-chat-nav-resize-handle" title="${t.resizeTitle}"><div class="resize-bar-pill"></div></div>
    `;
    document.body.appendChild(nav);
    // === 创建后立即同步深色主题，避免刷新时闪烁浅色 ===
    syncTheme();
    // === 新增：将气泡雷达容器挂载到页面 ===
    if (!document.getElementById('ai-chat-nav-global-tooltip')) {
      const tooltip = document.createElement('div');
      tooltip.id = 'ai-chat-nav-global-tooltip';
      document.body.appendChild(tooltip);
    }
    bindUIEvents(nav);
  }

  // === 共用：向上查找 AI 回答节点 ===
  const AI_SELECTORS = ['.markdown-body', '.prose', '[data-message-author-role="assistant"]', '.msg-content-container', '[class*="assistant" i]', '.message-bubble', '[class*="model-response"]', '.result-streaming', '[data-testid*="bot" i]', '[class*="bot" i][class*="message" i]', '.ai-message'];

  function findAINode(userEl) {
    let current = userEl, aiNode = null, attempts = 0;
    while (current && current !== document.body && attempts < 15) {
      let sibling = current.nextElementSibling;
      while (sibling) {
        if (sibling.innerText && sibling.innerText.trim().length > 0) { aiNode = sibling; break; }
        sibling = sibling.nextElementSibling;
      }
      if (aiNode) break;
      current = current.parentElement; attempts++;
    }
    return aiNode;
  }

  function findAITarget(aiNode) {
    for (const sel of AI_SELECTORS) {
      const inner = aiNode.querySelector(sel);
      if (inner) return inner;
    }
    return aiNode;
  }

  function extractAIResponseText(userEl) {
    const aiNode = findAINode(userEl);
    if (!aiNode) return "*(未抓取到 AI 回答，可能是当前对话还在生成或已被删除)*";
    return (findAITarget(aiNode).innerText || "").replace(/\n{3,}/g, '\n\n').trim();
  }
  // === 补回：专门用于 PDF/Word 导出的富文本带图提取器 ===
  async function extractAIResponseHTML(userEl) {
    const aiNode = findAINode(userEl);
    if (!aiNode) return "*(未抓取到 AI 回答)*";
    const clone = findAITarget(aiNode).cloneNode(true);

    // 清理噪音，保护包含图片的 button（ChatGPT DALL-E）
    clone.querySelectorAll('button, script, iframe, .copy-button, [style*="display: none"]').forEach(el => {
      if (el.tagName.toLowerCase() === 'button' && el.querySelector('img')) {
        const div = document.createElement('div');
        div.innerHTML = el.innerHTML;
        el.replaceWith(div);
      } else {
        el.remove();
      }
    });

    clone.querySelectorAll('source').forEach(el => el.remove());
    const images = Array.from(clone.querySelectorAll('img'));

    await Promise.all(images.map(async img => {
      let src = img.getAttribute('src') || img.getAttribute('data-src');
      img.removeAttribute('loading'); img.removeAttribute('srcset'); img.removeAttribute('sizes'); img.removeAttribute('decoding');
      if (!src) return;
      if (!src.startsWith('http') && !src.startsWith('data:') && !src.startsWith('blob:')) {
        try { src = new URL(src, window.location.href).href; } catch (e) { }
      }
      if (!src.startsWith('data:')) {
        try {
          const res = await new Promise(resolve => chrome.runtime.sendMessage({ type: 'FETCH_IMAGE_BASE64', url: src }, resolve));
          if (res && res.success) src = res.dataUrl;
        } catch (e) { /* fallback to original src */ }
      }
      img.src = src;
      img.style.cssText = 'max-width:100%;height:auto;display:block;margin:16px 0;border-radius:6px;border:1px solid #eee';
    }));

    return clone.innerHTML;
  }
  // === 新增：纯本地无延迟提纲提取引擎 (智能识别：提纲模式 vs 故事模式) ===
  function extractOutlineLocally(userEl) {
    const aiNode = findAINode(userEl);
    if (!aiNode) return "*(正在生成回答...)*";

    const targetNode = findAITarget(aiNode) || aiNode;
    const clone = targetNode.cloneNode(true);
    // 预清理：移除代码块、SVG、隐藏元素，避免干扰
    clone.querySelectorAll('pre, code, svg, [style*="display: none"]').forEach(el => el.remove());

    const structuralPoints = [];
    const maxPoints = 4;

    // 1. 抓取所有潜在的结构化点 (标题、加粗列表项、数字编号行)
    // 优先：H2~H4 标题
    const headings = clone.querySelectorAll('h2, h3, h4');
    for (const h of headings) {
      const text = h.innerText.replace(/^[#\s]+/, '').trim();
      if (text && structuralPoints.length < maxPoints) structuralPoints.push("🔹 " + text);
    }

    // 补充：加粗开头的列表项 (如果标题还不够的话)
    if (structuralPoints.length < maxPoints) {
      for (const li of clone.querySelectorAll('li')) {
        const boldEl = li.querySelector('strong');
        if (boldEl && li.innerText.trim().startsWith(boldEl.innerText.trim()) && structuralPoints.length < maxPoints) {
          const text = boldEl.innerText.replace(/[:：]$/, '').trim();
          if (text && !structuralPoints.some(p => p.includes(text))) {
            structuralPoints.push("🔸 " + text);
          }
        }
      }
    }

    // 补充：正则匹配行首编号 (如果还没到 maxPoints)
    if (structuralPoints.length < maxPoints) {
      const pointRegex = /^(\d+\.|[一二三四五六七八九十]+、|\-|\*)\s*(.*)/;
      const lines = clone.innerText.split('\n');
      for (const line of lines) {
        const match = line.trim().match(pointRegex);
        if (match && match[2].length > 2 && structuralPoints.length < maxPoints) {
          const text = match[2].substring(0, 30).trim();
          if (text && !structuralPoints.some(p => p.includes(text))) {
            structuralPoints.push("▪️ " + text + (match[2].length > 30 ? "..." : ""));
          }
        }
      }
    }

    // 2. 智能判断：
    // 如果提取到的结构化点 >= 1，说明存在标题或条理，采用提纲模式
    if (structuralPoints.length >= 1) {
      return structuralPoints.join('\n');
    }

    // 3. 故事模式 (Fallback)：如果结构化点几乎没有，说明是“讲故事”或大段文本，直接复制开头
    // 增加长度到 120 字左右，并尝试在句号处优雅截断
    let plainText = clone.innerText.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();
    if (plainText.length === 0) return "📦 包含代码片段或特殊格式";

    const limit = 120;
    if (plainText.length <= limit) return plainText;

    // 尝试在最后一个标点处截断
    let slice = plainText.substring(0, limit);
    const lastPunct = Math.max(slice.lastIndexOf('。'), slice.lastIndexOf('.'), slice.lastIndexOf('！'), slice.lastIndexOf('!'), slice.lastIndexOf('？'), slice.lastIndexOf('?'));
    if (lastPunct > limit * 0.6) {
      return slice.substring(0, lastPunct + 1);
    }
    return slice + "...";
  }

  function bindUIEvents(nav) {
    const header = document.getElementById('ai-chat-nav-header');
    const searchBtn = nav.querySelector('.header-search-btn');
    const searchInput = document.getElementById('ai-chat-nav-search-input');
    const toggleIcon = nav.querySelector('.header-toggle-icon');
    const resizeHandle = document.getElementById('ai-chat-nav-resize-handle');
    const topResizeHandle = document.getElementById('ai-chat-nav-top-resize-handle');
    const actionBar = document.getElementById('ai-chat-nav-action-bar');
    const formatMenu = document.getElementById('ai-chat-nav-format-menu');
    const itemMenu = document.getElementById('ai-chat-nav-item-menu');
    const btnSelectAll = actionBar.querySelector('.action-select-all');
    const btnExit = actionBar.querySelector('.action-cancel');
    const btnConfirm = actionBar.querySelector('.action-confirm');

    document.addEventListener('click', (e) => {
      if (itemMenu.classList.contains('show')) {
        const isClickInside = itemMenu.contains(e.target) || e.target.closest('.item-more-btn');
        if (!isClickInside) { itemMenu.classList.remove('show'); }
      }
    });

    itemMenu.querySelector('.action-item-export').addEventListener('click', (e) => {
      e.stopPropagation(); itemMenu.classList.remove('show');
      if (AppState.navMappings.length === 0 || !AppState.hasValidKey) return;
      if (!AppState.isExportMode) {
        if (nav.classList.contains('nav-collapsed')) toggleNav('expand');
        if (header.classList.contains('search-active')) {
          header.classList.remove('search-active'); searchInput.value = '';
          AppState.currentSearchTerm = ''; applySearchFilter(); searchInput.blur();
        }
        AppState.isExportMode = true; nav.classList.add('export-mode'); updateExportConfirmBtn();
      }
    });

    itemMenu.querySelector('.action-item-rename').addEventListener('click', (e) => {
      e.stopPropagation();
      const starKey = itemMenu.dataset.activeStarKey;
      itemMenu.classList.remove('show');
      if (!starKey) return;

      const mapping = AppState.navMappings.find(m => m.starKey === starKey);
      if (!mapping) return;

      const textEl = mapping.navEl.querySelector('.item-text-content');
      const originalTitle = textEl.innerText;

      const input = document.createElement('input');
      input.className = 'item-rename-input';
      input.placeholder = originalTitle;
      input.value = ''; // Empty for "overwrite" feel

      textEl.innerHTML = '';
      textEl.appendChild(input);
      input.focus();
      input.setSelectionRange(0, 0);

      const finishRename = () => {
        const newVal = input.value.trim();
        const finalTitle = newVal || originalTitle;
        if (newVal) {
          AppState.customTitles.set(starKey, finalTitle);
          saveCustomTitlesToLocal();
        }
        textEl.innerText = finalTitle;
        if (AppState.starredItems.has(starKey)) {
          const details = AppState.starredDetails.get(starKey);
          if (details) { details.title = finalTitle; saveStarsToLocal(); }
        }
      };

      input.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter') { ev.preventDefault(); finishRename(); }
        if (ev.key === 'Escape') { ev.preventDefault(); textEl.innerText = originalTitle; }
      });
      input.addEventListener('blur', finishRename);
    });

    function updateSelectAllBtnState() {
      const visibleMappings = AppState.navMappings.filter(m => m.navEl.style.display !== 'none');
      if (visibleMappings.length === 0) return;
      const allSelected = visibleMappings.every(m => AppState.selectedExportIds.has(m.navEl.dataset.refId));
      if (allSelected && AppState.selectedExportIds.size > 0) {
        btnSelectAll.innerText = t.deselectAll; btnSelectAll.classList.add('is-active');
      } else {
        btnSelectAll.innerText = t.selectAll; btnSelectAll.classList.remove('is-active');
      }
    }

    function exitExportMode() {
      AppState.isExportMode = false; AppState.isFormatMenuOpen = false; AppState.selectedExportIds.clear();
      nav.classList.remove('export-mode'); formatMenu.classList.remove('show');
      AppState.navMappings.forEach(m => m.navEl.classList.remove('is-selected'));
      updateExportConfirmBtn();
    }

    btnExit.addEventListener('click', exitExportMode);

    btnSelectAll.addEventListener('click', () => {
      const visibleMappings = AppState.navMappings.filter(m => m.navEl.style.display !== 'none');
      const allSelected = visibleMappings.every(m => AppState.selectedExportIds.has(m.navEl.dataset.refId));
      if (!allSelected) {
        visibleMappings.forEach(m => { AppState.selectedExportIds.add(m.navEl.dataset.refId); m.navEl.classList.add('is-selected'); });
      } else {
        visibleMappings.forEach(m => { AppState.selectedExportIds.delete(m.navEl.dataset.refId); m.navEl.classList.remove('is-selected'); });
      }
      updateExportConfirmBtn();
    });

    btnConfirm.addEventListener('click', () => {
      if (AppState.selectedExportIds.size === 0) return;
      AppState.isFormatMenuOpen = !AppState.isFormatMenuOpen;
      if (AppState.isFormatMenuOpen) formatMenu.classList.add('show'); else formatMenu.classList.remove('show');
    });

    formatMenu.querySelectorAll('.format-option-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const format = e.target.dataset.format;
        const selectedMappings = AppState.navMappings.filter(m => AppState.selectedExportIds.has(m.navEl.dataset.refId));
        selectedMappings.sort((a, b) => a.msgEl.getBoundingClientRect().top - b.msgEl.getBoundingClientRect().top);

        const originalText = btn.innerText;
        btn.innerText = t.analyzing;
        btn.style.pointerEvents = 'none';

        // 核心逻辑：PDF和Word都会提取带图片的 HTML 排版
        const exportData = await Promise.all(selectedMappings.map(async m => ({
          title: m.navEl.querySelector('.item-text-content').innerText,
          prompt: m.msgEl.acnCleanText,
          answer: extractAIResponseText(m.msgEl),
          answerHTML: (format === 'pdf' || format === 'word') ? await extractAIResponseHTML(m.msgEl) : ""
        })));

        btn.innerText = originalText;
        btn.style.pointerEvents = 'auto';

        const timestamp = Date.now();
      const filename = `AI_Timeline_${currentSiteName}_${timestamp}`;

        if (format === 'md') {
          let mdContent = `# 💬 AI Chat Log (${currentSiteName})\n\n*Exported on: ${new Date().toLocaleString()}*\n\n---\n\n`;
          exportData.forEach(item => { mdContent += `### 📌 ${item.title}\n\n**🙋‍♂️ User:**\n${item.prompt}\n\n**🤖 AI:**\n${item.answer}\n\n---\n\n`; });
          downloadBlob(mdContent, `${filename}.md`, 'text/markdown');
        } else if (format === 'txt') {
          let txtContent = `=== AI Chat Log (${currentSiteName}) ===\nExported on: ${new Date().toLocaleString()}\n\n`;
          exportData.forEach(item => { txtContent += `[标题]: ${item.title}\n\n[🙋‍♂️ 提问]:\n${item.prompt}\n\n[🤖 回答]:\n${item.answer}\n\n----------------------------------------\n\n`; });
          downloadBlob(txtContent, `${filename}.txt`, 'text/plain');
        } else if (format === 'word') {
          // 新增：纯前端 Word (.doc) 导出引擎，完美兼容图片和排版
          let wordContent = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head><meta charset='utf-8'><title>AI Timeline Export</title>
              <style>
                body { font-family: "Microsoft YaHei", "Segoe UI", sans-serif; line-height: 1.6; color: #333; }
                h1 { color: ${siteConfig.color}; border-bottom: 2px solid #eee; padding-bottom: 10pt; font-size: 18pt; }
                .qa-block { margin-bottom: 20pt; border: 1px solid #e0e0e0; border-radius: 8pt; background-color: #ffffff; }
                .qa-title { background-color: #f0f0f0; padding: 10pt; font-size: 14pt; font-weight: bold; color: #222; }
                .prompt-section { background-color: #fafbfc; padding: 10pt; font-size: 11pt; border-bottom: 1px dashed #eee; color: #444; }
                .answer-section { padding: 10pt; font-size: 11pt; color: #111; }
                img { max-width: 100%; height: auto; display: block; margin: 10pt 0; border-radius: 6pt; border: 1px solid #eee; }
                pre { background-color: #f6f8fa; padding: 10pt; font-family: monospace; border: 1px solid #eaecef; border-radius: 6pt; }
                code { font-family: monospace; color: #d73a49; }
              </style>
              </head><body>
              <h1>💬 AI Chat Log (${currentSiteName})</h1>
              <p style="color: #888; font-size: 10pt;">Exported on: ${new Date().toLocaleString()}</p>`;

          exportData.forEach(item => {
            // Fix for Word: Word's HTML parser is very strict. We need to ensure images are treated robustly.
            // The images are already base64 in item.answerHTML, but Word sometimes fails if the img tag is improperly formatted.
            let cleanAnswerHTML = item.answerHTML.replace(/<img(.*?)>/gi, (match, attrs) => {
              return `<img ${attrs} />`; // Ensure self-closing tags
            });

            wordContent += `<div class="qa-block">
                    <div class="qa-title">📌 ${item.title.replace(/</g, '&lt;')}</div>
                    <div class="prompt-section"><b>🙋‍♂️ User:</b><br/><br/>${item.prompt.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br/>')}</div>
                    <div class="answer-section"><b>🤖 AI:</b><br/><br/>${cleanAnswerHTML}</div>
                  </div><br/>`;
          });
          wordContent += `</body></html>`;
          downloadBlob(wordContent, `${filename}.doc`, 'application/msword');
        } else if (format === 'pdf') {
          const iframe = document.createElement('iframe');
          iframe.style.position = 'fixed'; iframe.style.left = '200vw'; iframe.style.top = '0'; iframe.style.width = '800px'; iframe.style.height = '100vh'; iframe.style.border = 'none';
          document.body.appendChild(iframe);
          const doc = iframe.contentWindow.document;
      doc.write('<html><head><title>AI Timeline Export</title><style>');
          doc.write('body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; line-height: 1.6; color: #333; padding: 40px; max-width: 800px; margin: 0 auto; }');
          doc.write(`h1 { color: ${siteConfig.color}; border-bottom: 2px solid #eee; padding-bottom: 10px; font-size: 24px; }`);
          doc.write('.qa-block { margin-bottom: 30px; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; page-break-inside: avoid; background: #fff; }');
          doc.write('.qa-title { background: #f0f0f0; padding: 12px 20px; font-size: 16px; font-weight: bold; color: #222; border-bottom: 1px solid #e0e0e0; margin: 0; display: flex; align-items: center; gap: 8px;}');
          doc.write('.prompt-section { background: #fafbfc; padding: 15px 20px; font-size: 14px; border-bottom: 1px dashed #eee; color: #444; white-space: pre-wrap; word-wrap: break-word;}');
          doc.write('.answer-section { background: #fff; padding: 15px 20px; font-size: 14px; color: #111; word-wrap: break-word; }');
          doc.write('.answer-section p { margin-top: 0; margin-bottom: 10px; }');
          doc.write('.answer-section pre { background: #f6f8fa; padding: 12px; border-radius: 6px; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word; font-family: monospace; border: 1px solid #eaecef; }');
          doc.write('.answer-section code { background: #f6f8fa; padding: 2px 4px; border-radius: 4px; font-family: monospace; color: #d73a49; }');
          doc.write('img { max-width: 100%; height: auto; display: block; margin: 16px 0; border-radius: 6px; border: 1px solid #eee; }');
          doc.write('</style></head><body>');
          doc.write(`<h1>💬 AI Chat Log (${currentSiteName})</h1>`);
          doc.write(`<p style="color: #888; font-size: 13px; margin-bottom: 40px;">Exported on: ${new Date().toLocaleString()}</p>`);

          exportData.forEach(item => {
            doc.write('<div class="qa-block">');
            doc.write(`<div class="qa-title">📌 ${item.title.replace(/</g, '&lt;')}</div>`);
            doc.write(`<div class="prompt-section"><b>🙋‍♂️ User:</b><br/>${item.prompt.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>`);
            doc.write(`<div class="answer-section"><b>🤖 AI:</b><br/>${item.answerHTML}</div>`);
            doc.write('</div>');
          });
          doc.write('</body></html>'); doc.close();

          showToast(isZh ? '正在拉起打印菜单，请稍候...' : 'Preparing PDF print menu...');

          // PDF 延时，确保iframe内的图片完全渲染后再调用print
          setTimeout(() => {
            try {
              iframe.contentWindow.focus();
              iframe.contentWindow.print();
            } catch (err) {
              console.error("Print failed", err);
              showToast(isZh ? '拉起打印失败，请重试' : 'Failed to open print menu');
            } finally {
              setTimeout(() => document.body.removeChild(iframe), 2000);
            }
          }, 1500);
        }
        formatMenu.classList.remove('show'); AppState.isFormatMenuOpen = false;
      });
    });

    function downloadBlob(content, filename, type) {
      const blob = new Blob([content], { type: `${type};charset=utf-8` }); const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url);
    }

    function toggleNav(forceState) {
      const isCollapsed = nav.classList.contains('nav-collapsed');
      if (forceState === 'collapse' && isCollapsed) return;
      if (forceState === 'expand' && !isCollapsed) return;

      nav.classList.add('animating-height');
      nav.classList.remove('peek-active');

      if (!isCollapsed && AppState.isExportMode) exitExportMode();

      if (!isCollapsed) {
        // Collapsing
        AppState.savedHeight = nav.style.height || 'auto';
        nav.style.height = nav.offsetHeight + 'px';
        void nav.offsetHeight;

        nav.classList.add('nav-collapsed');
        nav.style.height = '44px';
        nav.style.width = '44px';
        nav.title = t.expandTitle;
        toggleIcon.title = t.expandTitle;
      } else {
        // Expanding
        // Step 1: Suppress header content BEFORE removing the class
        // This prevents the title from flashing in during the transitionless measurement phase
        header.style.transition = 'none';
        const hiddenEls = header.querySelectorAll('.header-title-text, .header-controls-left');
        hiddenEls.forEach(el => { el.style.transition = 'none'; el.style.opacity = '0'; });

        nav.style.transition = 'none';
        nav.classList.remove('nav-collapsed');

        // Measure targeted state height
        nav.style.width = '240px';
        nav.style.height = 'auto';
        const targetPx = nav.offsetHeight;

        // Reset to initial
        nav.style.width = '44px';
        nav.style.height = '44px';
        void nav.offsetHeight; // force reflow

        // Step 2: Re-enable transitions and kick off the animation
        nav.style.transition = '';
        header.style.transition = '';
        nav.style.width = '';
        nav.style.height = targetPx + 'px';

        // Step 3: Fade-in the header content AFTER the animation has started
        // Use a very short delay to ensure the width transition is already running
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            hiddenEls.forEach(el => {
              el.style.transition = '';
              el.style.opacity = '';
            });
          });
        });

        setTimeout(() => {
          if (!nav.classList.contains('nav-collapsed')) {
            nav.style.height = AppState.savedHeight === 'auto' ? 'auto' : AppState.savedHeight;
          }
        }, 360);

        nav.title = '';
        toggleIcon.title = t.collapseTitle;
      }
      setTimeout(() => nav.classList.remove('animating-height'), 360);
    }

    searchBtn.addEventListener('mousedown', (e) => {
      e.preventDefault(); e.stopPropagation();
      if (AppState.isExportMode) exitExportMode();
      if (!header.classList.contains('search-active')) {
        header.classList.add('search-active'); setTimeout(() => searchInput.focus(), 50);
      } else {
        header.classList.remove('search-active'); searchInput.value = ''; AppState.currentSearchTerm = ''; applySearchFilter(); searchInput.blur();
        if (AppState.isSearchAutoExpanded) { toggleNav('collapse'); AppState.isSearchAutoExpanded = false; }
      }
    });

    searchInput.addEventListener('input', (e) => {
      AppState.currentSearchTerm = e.target.value.toLowerCase().trim(); applySearchFilter();
      if (AppState.currentSearchTerm.length > 0) { if (nav.classList.contains('nav-collapsed')) { AppState.isSearchAutoExpanded = true; toggleNav('expand'); } }
      else if (AppState.isSearchAutoExpanded) { toggleNav('collapse'); AppState.isSearchAutoExpanded = false; }
    });

    searchInput.addEventListener('blur', () => {
      if (searchInput.value.trim() === '') {
        header.classList.remove('search-active'); AppState.currentSearchTerm = ""; applySearchFilter();
        if (AppState.isSearchAutoExpanded) { toggleNav('collapse'); AppState.isSearchAutoExpanded = false; }
      }
    });

    let hasDragged = false;
    toggleIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      if (hasDragged) return; // Ignore click if we were dragging via the toggle icon
      AppState.isSearchAutoExpanded = false; toggleNav();
    });
    searchInput.addEventListener('mousedown', (e) => e.stopPropagation()); searchInput.addEventListener('keydown', (e) => e.stopPropagation());

    let isDraggingContainer = false, isResizing = false, isTopResizing = false, startY, startTop, startHeight;
    header.addEventListener('mousedown', (e) => {
      // In expanded state, avoid dragging if clicking buttons or input. In collapsed, the whole ball is draggable.
      if (!nav.classList.contains('nav-collapsed')) {
        if (e.target.closest('.header-btn') || e.target.closest('#ai-chat-nav-search-input')) return;
      }
      isDraggingContainer = true; hasDragged = false; startY = e.clientY; startTop = parseInt(window.getComputedStyle(nav).top, 10) || 100; document.body.style.userSelect = 'none';
    });
    resizeHandle.addEventListener('mousedown', (e) => { e.stopPropagation(); isResizing = true; startY = e.clientY; startHeight = nav.offsetHeight; document.body.style.userSelect = 'none'; nav.style.transition = 'none'; });
    resizeHandle.addEventListener('dblclick', (e) => { e.stopPropagation(); nav.style.height = 'auto'; AppState.savedHeight = 'auto'; });
    topResizeHandle.addEventListener('mousedown', (e) => { e.stopPropagation(); isTopResizing = true; startY = e.clientY; startTop = parseInt(window.getComputedStyle(nav).top, 10) || 100; startHeight = nav.offsetHeight; document.body.style.userSelect = 'none'; nav.style.transition = 'none'; });
    topResizeHandle.addEventListener('dblclick', (e) => { e.stopPropagation(); nav.style.height = 'auto'; AppState.savedHeight = 'auto'; });

    document.addEventListener('mousemove', (e) => {
      if (isDraggingContainer) {
        if (Math.abs(e.clientY - startY) > 3) hasDragged = true;
        let newTop = startTop + (e.clientY - startY); const maxTop = window.innerHeight - nav.offsetHeight; nav.style.top = Math.max(SAFE_TOP_MARGIN, Math.min(newTop, maxTop)) + 'px';
      }
      if (isResizing) { let newHeight = startHeight + (e.clientY - startY); const maxAllowed = window.innerHeight - nav.getBoundingClientRect().top; nav.style.height = Math.max(80, Math.min(newHeight, maxAllowed)) + 'px'; }
      if (isTopResizing) {
        let dy = e.clientY - startY; let newTop = startTop + dy; let newHeight = startHeight - dy;
        if (newTop < SAFE_TOP_MARGIN) { newTop = SAFE_TOP_MARGIN; newHeight = startHeight + (startTop - SAFE_TOP_MARGIN); }
        if (newHeight < 80) { newHeight = 80; newTop = startTop + (startHeight - 80); }
        nav.style.top = newTop + 'px'; nav.style.height = newHeight + 'px';
      }
    });

    document.addEventListener('mouseup', (e) => {
      if (isDraggingContainer || isResizing || isTopResizing) {
        if (isResizing || isTopResizing) AppState.savedHeight = nav.style.height;
        isDraggingContainer = isResizing = isTopResizing = false;
        document.body.style.userSelect = '';
        // keep hasDragged true briefly so the native click listener can intercept it
        setTimeout(() => { hasDragged = false; }, 50);
      }
    });
    // === 新增：完美复原气泡雷达交互系统 ===
    const globalTooltip = document.getElementById('ai-chat-nav-global-tooltip');
    let tooltipTimeout;

    nav.addEventListener('mouseover', (e) => {
      const item = e.target.closest('.ai-chat-nav-item');
      if (item && !AppState.isExportMode) {
        const refId = item.dataset.refId;
        const mapping = AppState.navMappings.find(m => m.navEl.dataset.refId === refId);
        if (!mapping || !mapping.msgEl) return;

        const outlineText = extractOutlineLocally(mapping.msgEl);
        if (!outlineText || outlineText === "undefined" || outlineText.trim() === "") return;

        globalTooltip.innerText = outlineText;

        // 计算气泡位置，防止超出屏幕
        const rect = item.getBoundingClientRect();
        let leftPos = rect.left - globalTooltip.offsetWidth - 12;
        if (leftPos < 10) leftPos = rect.right + 12;
        globalTooltip.style.left = leftPos + 'px';

        let topPos = rect.top + (rect.height / 2) - (globalTooltip.offsetHeight / 2);
        if (topPos < 10) topPos = 10;
        if (topPos + globalTooltip.offsetHeight > window.innerHeight - 10) {
          topPos = window.innerHeight - globalTooltip.offsetHeight - 10;
        }
        globalTooltip.style.top = topPos + 'px';

        clearTimeout(tooltipTimeout);
        tooltipTimeout = setTimeout(() => globalTooltip.classList.add('show'), 300); // 300ms防抖
      }
    });

    nav.addEventListener('mouseout', (e) => {
      const item = e.target.closest('.ai-chat-nav-item');
      if (item) {
        clearTimeout(tooltipTimeout);
        globalTooltip.classList.remove('show');
      }
    });

    document.getElementById('ai-chat-nav-list').addEventListener('scroll', () => {
      clearTimeout(tooltipTimeout); globalTooltip.classList.remove('show');
    }, { passive: true });
  }

  function applySearchFilter() {
    AppState.navMappings.forEach(m => {
      const textSpan = m.navEl.querySelector('.item-text-content'); if (!textSpan) return;
      const isMatch = textSpan.textContent.toLowerCase().includes(AppState.currentSearchTerm); m.navEl.style.display = isMatch ? 'flex' : 'none';
    });
  }

  function applyDOMList(container, elementsArray) { elementsArray.forEach((el, index) => { if (container.children[index] !== el) { container.insertBefore(el, container.children[index] || null); } }); }

  function syncNavigation(force = false) {
    if (!AppState.isStorageLoaded) return;

    const loadingEl = document.getElementById('ai-chat-nav-global-loading');
    const emptyStateEl = document.getElementById('ai-chat-nav-empty-state');
    const listEl = document.getElementById('ai-chat-nav-list');
    const pinnedList = document.getElementById('ai-chat-nav-pinned-list');

    if (!AppState.hasValidKey) {
      if (loadingEl) loadingEl.classList.add('hidden');
      if (emptyStateEl) emptyStateEl.style.display = 'none';
      if (listEl) listEl.style.display = 'none';
      if (pinnedList) pinnedList.style.display = 'none';
      document.getElementById('ai-chat-nav-onboarding').style.display = 'flex';
      return;
    } else {
      document.getElementById('ai-chat-nav-onboarding').style.display = 'none';
    }

    // === 站点专属选择器：避免在特定平台上误选 AI 回答节点 ===
    const host = window.location.hostname;
    const isGrok = host.includes('grok.com') || (host.includes('x.com') && window.location.pathname.includes('/i/grok'));

    let selectors;
    if (isGrok) {
      // Grok 专用选择器：通过浏览器实际 DOM 检测确认
      // 用户消息的父容器含 items-end（右对齐），AI 回答父容器含 items-start（左对齐）
      selectors = [
        'div[class*="items-end"] .message-bubble',
        'div[class*="items-end"] [data-testid="message-bubble"]',
      ];
    } else {
      selectors = [
        '.query-content', '[data-message-author-role="user"]', '.font-user-message', '[data-testid="message-row-user"]', '[data-testid*="user-message"]', '.ds-chat-message--user', '.ds-markdown--user', 'div[class*="fbb737a4"]', 'div[style*="flex-direction: row-reverse"] > div', '[data-role="user" i]', '[data-author-role="user" i]', '[data-author="user" i]', '[data-type="user" i]', 'div[class*="user" i][class*="message" i]', 'div[class*="user" i][class*="msg" i]', 'div[class*="user" i][class*="content" i]', 'div[class*="chat" i][class*="user" i]', '.agent-chat__bubble--human', '.message-bubble', '.msg-content-container', '[class*="group/query"]', '[class*="questionItem"]', '[class*="roleUser"]', '[class*="UserPrompt" i]', '[class*="user-prompt" i]', '[class*="UserBubble" i]', '[class*="user-bubble" i]', 'div[class*="bg-offsetPlus"]'
      ];
      // 针对豆包等平台增加激进的备用选择器捕获
      if (host.includes('doubao.com')) {
        selectors.push(
          '[data-testid="send_message"]',
          '[data-testid="send_message"] [data-testid="message_text_content"]',
          '[data-testid="send_message"] [data-testid="message_content"]',
          'div[data-testid*="user"]',
          'div[class*="user"][class*="msg"]',
          'div[class*="userMessage"]',
          '[class*="content-wrapper"] > div:not([class*="bot"])',
          '[class*="bubble"][class*="user"]'
        );
      }
    }

    const rawElements = Array.from(document.querySelectorAll(selectors.join(',')));
    if (!listEl || !pinnedList) return;

    // Grok 二次降级：如果主选择器返回 0（Grok 改版导致类名变动），按祖先 items-end 做判断
    let candidateElements = rawElements;
    if (isGrok && rawElements.length === 0) {
      const fallback = Array.from(document.querySelectorAll('.message-bubble, [data-testid="message-bubble"]'));
      candidateElements = fallback.filter(el => {
        let node = el.parentElement;
        while (node && node !== document.body) {
          const cls = node.className || '';
          // 排除 AI 回答侧容器
          if (/\bitems-start\b/.test(cls) || /markdown|prose|response|assistant/i.test(cls)) return false;
          // 保留用户侧容器（items-end = 右对齐）
          if (/\bitems-end\b/.test(cls)) return true;
          node = node.parentElement;
        }
        return false; // 无法确认为用户消息时丢弃
      });
    }

    const visibleElements = candidateElements.filter(el => {
      const rect = el.getBoundingClientRect(); if (rect.width === 0 || rect.height === 0) return false;
      const style = window.getComputedStyle(el); if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return false; return true;
    });

    const innermostElements = visibleElements.filter(el => !visibleElements.some(other => other !== el && el.contains(other)));

    const uniqueMessages = []; let lastText = "";

    innermostElements.forEach((el) => {
      const rawText = el.innerText.trim();
      const cleanText = rawText.replace(/^(你说|You said|You|User|用户)[:：]?\s*/gi, '').replace(/[\r\n]+/g, ' ').trim();
      if (cleanText.length < 1 || cleanText === lastText) return;
      if (uniqueMessages.some(existingEl => existingEl.contains(el))) return;
      el.acnCleanText = cleanText; uniqueMessages.push(el); lastText = cleanText;
    });

    // ====== 新增：检查当前页面是否有需要渲染的“幽灵记录” ======
    const currentChatUrl = window.location.pathname + window.location.search;
    let hasGhostInCurrentUrl = false;
    for (let details of AppState.starredDetails.values()) {
      if (details.url === currentChatUrl) { hasGhostInCurrentUrl = true; break; }
    }

    if (uniqueMessages.length > 0 || hasGhostInCurrentUrl) {
      if (AppState.emptyStateTimeout) { clearTimeout(AppState.emptyStateTimeout); AppState.emptyStateTimeout = null; }
      if (loadingEl && uniqueMessages.length > 0) loadingEl.classList.add('hidden');
      if (emptyStateEl) emptyStateEl.style.display = 'none';
      if (listEl) listEl.style.display = 'flex';
      if (pinnedList) pinnedList.style.display = 'flex';
    } else {
      if (listEl) { listEl.style.display = 'none'; listEl.innerHTML = ''; }
      if (pinnedList) { pinnedList.style.display = 'none'; pinnedList.innerHTML = ''; }

      // 【新增】智能 URL 侦测引擎：判断当前是否是新建聊天
      function checkIsNewChat() {
        const host = window.location.hostname;
        const path = window.location.pathname;
        const search = window.location.search;
        if (host.includes('chatgpt.com') || host.includes('openai.com')) return path === '/';
        if (host.includes('gemini.google.com')) return path.startsWith('/app') && path.length <= 5;
        if (host.includes('claude.ai')) return path === '/new' || path === '/';
        if (host.includes('kimi')) return path === '/';
        if (host.includes('doubao.com')) return path === '/chat/' || path === '/chat' || path === '/';
        if (host.includes('yuanbao')) return path === '/chat/' || path === '/chat' || path === '/';
        if (host.includes('deepseek.com')) return path === '/';
        if (host.includes('tongyi.aliyun.com') || host.includes('qianwen')) return !search.includes('sessionId');
        if (host.includes('yiyan.baidu.com')) return path === '/';
        if (host.includes('chatglm.cn') || host.includes('zhipuqingyan.cn')) return path === '/';
        if (host.includes('grok.com')) return path === '/';
        // 通用兜底规则
        return path === '/' || path === '/chat' || path === '/chat/' || path === '/new';
      }

      const isNew = checkIsNewChat();
      const isCurrentlyShowingNew = emptyStateEl && emptyStateEl.style.display === 'flex';
      const isCurrentlyLoading = loadingEl && !loadingEl.classList.contains('hidden');

      if (isNew) {
        // 场景 1：新建聊天，0 延迟立刻显示“等待开始”，不要转圈
        if (AppState.emptyStateTimeout) { clearTimeout(AppState.emptyStateTimeout); AppState.emptyStateTimeout = null; }
        if (!isCurrentlyShowingNew) {
          if (loadingEl) loadingEl.classList.add('hidden');
          if (emptyStateEl) emptyStateEl.style.display = 'flex';
        }
      } else {
        // 场景 2：载入旧聊天，立即显示转圈动画，等待网页渲染
        if (!AppState.emptyStateTimeout && !isCurrentlyShowingNew && !isCurrentlyLoading) {
          if (loadingEl) loadingEl.classList.remove('hidden');
          if (emptyStateEl) emptyStateEl.style.display = 'none';
          AppState.emptyStateTimeout = setTimeout(() => {
            if (loadingEl) loadingEl.classList.add('hidden');
            if (emptyStateEl) emptyStateEl.style.display = 'flex';
            AppState.emptyStateTimeout = null;
          }, 4000); // 延长至 4 秒，给足网页接口拉取历史记录的时间
        }
      }

      AppState.navMappings = []; AppState.lastMessageCount = 0; return;
    }

    let newlyAddedBottomId = null;

    let hasDetachedNodes = false;
    for (let i = 0; i < AppState.navMappings.length; i++) { if (!document.body.contains(AppState.navMappings[i].msgEl)) { hasDetachedNodes = true; break; } }
    if (!force && !hasDetachedNodes && uniqueMessages.length === AppState.lastMessageCount) return;
    AppState.lastMessageCount = uniqueMessages.length;

    uniqueMessages.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);

    const oldMappings = AppState.navMappings; AppState.navMappings = [];
    const pinnedElements = []; const normalElements = [];
    const currentValidIds = new Set(); const activeStarKeys = new Set();
    const textOccurrences = {};

    uniqueMessages.forEach((el, index) => {
      if (!el.dataset.acnId) {
        const deadMapping = oldMappings.find(m => m.msgEl.acnCleanText === el.acnCleanText && !document.body.contains(m.msgEl));
        if (deadMapping) el.dataset.acnId = deadMapping.msgEl.dataset.acnId; else el.dataset.acnId = 'acn_' + Math.random().toString(36).substr(2, 9);
      }

      const acnId = el.dataset.acnId; currentValidIds.add(acnId);
      const cleanText = el.acnCleanText;
      const baseMemKey = cleanText.replace(/[\s*_~`]/g, '').substring(0, 60);
      textOccurrences[baseMemKey] = (textOccurrences[baseMemKey] || 0) + 1;
      const starKey = baseMemKey + '_' + textOccurrences[baseMemKey];

      let item = pinnedList.querySelector(`[data-ref-id="${acnId}"]`) || listEl.querySelector(`[data-ref-id="${acnId}"]`);
      let isNewlyCreated = false;

      // 如果节点原来是幽灵状态，现在出现在 DOM 中了，就移除重新创建为正常节点
      if (!item || item.classList.contains('is-ghost')) {
        if (item && item.classList.contains('is-ghost')) { item.remove(); item = null; }
        isNewlyCreated = true;
        item = document.createElement('div');
        item.className = 'ai-chat-nav-item'; item.dataset.refId = acnId;
        item.style.animation = 'navItemSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards';
        item.innerHTML = `
          <div class="item-checkbox"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="display:none;"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
          <div class="item-more-btn" title="${t.moreItemTitle}"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="1.5"></circle><circle cx="12" cy="12" r="1.5"></circle><circle cx="12" cy="19" r="1.5"></circle></svg></div>
          <div class="item-text-content"></div>
          <div class="item-star-btn" title="${t.starBtnTitle}"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div>
        `;

        const textContent = item.querySelector('.item-text-content');
        const starBtn = item.querySelector('.item-star-btn');
        const moreBtn = item.querySelector('.item-more-btn');

        moreBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const rect = moreBtn.getBoundingClientRect();
          const itemMenu = document.getElementById('ai-chat-nav-item-menu');
          itemMenu.style.top = rect.top + 'px';
          itemMenu.style.left = (rect.right + 4) + 'px';
          itemMenu.classList.add('show');
          // Update global active context
          const activeMenuVar = 'activeMenuStarKey'; // We need access to the closure var or assign to window/AppState
          // Let's use a simpler way: global window property for event context
          window._acnActiveMenuStarKey = starKey;
        });

        // Small correction: The closure in bindUIEvents needs access to this key.
        // Let's modify the listener in bindUIEvents to use a shared variable or data-attribute on the menu.
        moreBtn.addEventListener('mousedown', () => {
          document.getElementById('ai-chat-nav-item-menu').dataset.activeStarKey = starKey;
        });

        starBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (AppState.starredItems.has(starKey)) {
            AppState.starredItems.delete(starKey);
            AppState.starredDetails.delete(starKey);
          } else {
            AppState.starredItems.add(starKey);
            AppState.starredDetails.set(starKey, {
              url: currentChatUrl,
              title: textContent.innerText
            });
          }
          saveStarsToLocal(); syncNavigation(true);
        });

        // ================= 这里回归稳定版本的单行提炼逻辑（不再解析 JSON） =================
        if (AppState.summaryCache.has(baseMemKey)) {
          const tempVal = AppState.summaryCache.get(baseMemKey);
          if (tempVal.includes("❌") || tempVal.includes("未设置") || tempVal.includes("废弃")) { AppState.summaryCache.delete(baseMemKey); }
        }

        // Initial Title Rendering (Prioritize Custom -> Cache -> Loading)
        if (AppState.customTitles.has(starKey)) {
          textContent.innerText = AppState.customTitles.get(starKey);
        } else if (AppState.summaryCache.has(baseMemKey)) {
          textContent.innerText = AppState.summaryCache.get(baseMemKey);
        } else {
          item.classList.add('is-loading'); textContent.innerText = t.analyzing;
          let safePromptText = cleanText;
          if (safePromptText.length > 600) safePromptText = safePromptText.substring(0, 250) + "\n...[中间内容已省略]...\n" + safePromptText.substring(safePromptText.length - 250);

          chrome.runtime.sendMessage({ type: 'GENERATE_SUMMARY', text: safePromptText }, (res) => {
            const finalResult = (res && res.success) ? res.summary : t.extractFailed;
            AppState.summaryCache.set(baseMemKey, finalResult); saveCacheToLocal();

            if (AppState.customTitles.has(starKey)) return; // If manually renamed during loading

            // 同步更新保存的星标详情
            if (AppState.starredItems.has(starKey)) {
              const details = AppState.starredDetails.get(starKey);
              if (details) { details.title = finalResult; saveStarsToLocal(); }
            }

            textContent.style.opacity = '0';
            setTimeout(() => {
              if (AppState.customTitles.has(starKey)) {
                textContent.innerText = AppState.customTitles.get(starKey);
              } else {
                textContent.innerText = finalResult;
              }
              item.classList.remove('is-loading'); textContent.style.opacity = '1'; applySearchFilter();
              if (acnId === newlyAddedBottomId && !AppState.isExportMode) showPeekNotification(textContent.innerText);
            }, 300);
          });
        }
      }
      // 取消静态赋值大纲，改为在鼠标 hover 时动态实时提炼
      item.onclick = (e) => {
        if (AppState.isExportMode) {
          e.preventDefault(); e.stopPropagation();
          if (AppState.selectedExportIds.has(acnId)) { AppState.selectedExportIds.delete(acnId); item.classList.remove('is-selected'); } else { AppState.selectedExportIds.add(acnId); item.classList.add('is-selected'); }
          const btnConfirm = document.querySelector('.action-confirm'); const count = AppState.selectedExportIds.size;
          if (btnConfirm) {
            btnConfirm.innerText = count > 0 ? `${t.exportAction} (${count})` : t.exportAction;
            if (count > 0) btnConfirm.classList.remove('disabled'); else { btnConfirm.classList.add('disabled'); const formatMenu = document.getElementById('ai-chat-nav-format-menu'); if (formatMenu) { formatMenu.classList.remove('show'); AppState.isFormatMenuOpen = false; } }
          }
          const btnSelectAll = document.querySelector('.action-select-all');
          if (btnSelectAll) {
            const visibleMappings = AppState.navMappings.filter(m => m.navEl.style.display !== 'none');
            const allSelected = visibleMappings.every(m => AppState.selectedExportIds.has(m.navEl.dataset.refId));
            if (allSelected && AppState.selectedExportIds.size > 0) { btnSelectAll.innerText = t.deselectAll; btnSelectAll.classList.add('is-active'); } else { btnSelectAll.innerText = t.selectAll; btnSelectAll.classList.remove('is-active'); }
          }
          return;
        }
        AppState.isAutoScrolling = true; AppState.navMappings.forEach(m => m.navEl.classList.remove('active'));
        item.classList.add('active');
        // 查找行容器祖先：Grok 用 items-end，Perplexity 用 bg-offsetPlus，其他平台 el 本身即行容器
        const scrollTarget = el.closest('div[class*="items-end"], div[class*="bg-offsetPlus"]') || el;
        scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Increase lock time to 1200ms to reliably bypass browser bouncy scroll events
        clearTimeout(AppState.scrollTimeout); AppState.scrollTimeout = setTimeout(() => { AppState.isAutoScrolling = false; }, 1200);
      };

      const isStarred = AppState.starredItems.has(starKey);
      if (isStarred) { item.classList.add('is-starred'); activeStarKeys.add(starKey); } else { item.classList.remove('is-starred'); }

      if (AppState.isExportMode && AppState.selectedExportIds.has(acnId)) item.classList.add('is-selected'); else item.classList.remove('is-selected');
      if (isNewlyCreated && index === uniqueMessages.length - 1 && AppState.lastMessageCount > 1) newlyAddedBottomId = acnId;
      if (isStarred) pinnedElements.push(item); else normalElements.push(item);

      AppState.navMappings.push({ acnId, starKey, baseMemKey, msgEl: el, navEl: item });
    });

    // ====== 渲染属于本页面但还未加载到 DOM 里的幽灵记录 ======
    for (let starKey of AppState.starredItems) {
      if (activeStarKeys.has(starKey)) continue;

      const details = AppState.starredDetails.get(starKey);
      if (details && details.url === currentChatUrl) {
        const ghostId = 'ghost_' + starKey;
        currentValidIds.add(ghostId);

        let item = pinnedList.querySelector(`[data-ref-id="${ghostId}"]`);
        if (!item) {
          item = document.createElement('div');
          item.className = 'ai-chat-nav-item is-starred is-ghost';
          item.dataset.refId = ghostId;
          const displayTitle = AppState.customTitles.get(starKey) || details.title || '未知幽灵节点';
          item.innerHTML = `
                  <div class="item-checkbox"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="display:none;"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                  <div class="item-text-content">${displayTitle}</div>
                  <div class="item-star-btn" title="${t.starBtnTitle}"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div>
                `;

          item.onclick = (e) => {
            if (AppState.isExportMode) { e.stopPropagation(); return; }
            showToast(t.ghostToast);
          };

          const starBtn = item.querySelector('.item-star-btn');
          starBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            AppState.starredItems.delete(starKey);
            AppState.starredDetails.delete(starKey);
            saveStarsToLocal(); syncNavigation(true);
          });
        }
        pinnedElements.push(item);
      }
    }

    applyDOMList(pinnedList, pinnedElements); applyDOMList(listEl, normalElements);

    Array.from(pinnedList.children).forEach(child => { if (!currentValidIds.has(child.dataset.refId)) child.remove(); });
    Array.from(listEl.children).forEach(child => { if (!currentValidIds.has(child.dataset.refId)) child.remove(); });

    applySearchFilter(); highlightCurrentNav();
  }

  let peekTimeout = null;
  function showPeekNotification(text) {
    const nav = document.getElementById('ai-chat-nav-container'); const peekEl = document.getElementById('ai-chat-nav-peek'); const header = document.getElementById('ai-chat-nav-header');
    if (!nav || !peekEl) return;
    if (nav.classList.contains('nav-collapsed') && !header.classList.contains('search-active')) {
      clearTimeout(peekTimeout); peekEl.innerText = t.savedPrefix + text;
      nav.style.transition = 'height 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), width 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease';
      nav.style.height = '100px'; nav.style.width = '240px'; nav.classList.add('peek-active');
      peekTimeout = setTimeout(() => {
        nav.style.height = '44px'; nav.style.width = '44px'; nav.classList.remove('peek-active');
        setTimeout(() => { if (nav.classList.contains('nav-collapsed')) nav.style.transition = 'none'; }, 400);
      }, 2500);
    }
  }

  function highlightCurrentNav() {
    if (AppState.navMappings.length === 0 || AppState.isAutoScrolling || AppState.isExportMode) return;
    const viewportHeight = window.innerHeight;
    const threshold = viewportHeight * 0.3;
    let currentActive = AppState.navMappings[0];

    // 正向遍历：找到最后一个 question 顶部已经滚过视口上方 30% 线的条目
    for (let i = 0; i < AppState.navMappings.length; i++) {
      const rect = AppState.navMappings[i].msgEl.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0 && rect.top === 0) continue;
      if (rect.top <= threshold) currentActive = AppState.navMappings[i];
    }

    // AI 生成感知：如果倒数第二条已经滚出屏幕顶部，而最后一条可见 → 锁定最后一条
    if (AppState.navMappings.length >= 2) {
      const lastIdx = AppState.navMappings.length - 1;
      const lastRect = AppState.navMappings[lastIdx].msgEl.getBoundingClientRect();
      const prevRect = AppState.navMappings[lastIdx - 1].msgEl.getBoundingClientRect();
      if (lastRect.top >= 0 && lastRect.top < viewportHeight && prevRect.top < 0) {
        currentActive = AppState.navMappings[lastIdx];
      }
    }

    let changed = false;
    AppState.navMappings.forEach(mapping => {
      if (mapping === currentActive) {
        if (!mapping.navEl.classList.contains('active')) { mapping.navEl.classList.add('active'); changed = true; }
      } else {
        mapping.navEl.classList.remove('active');
      }
    });

    if (changed) {
      const list = document.getElementById('ai-chat-nav-list');
      const pinnedList = document.getElementById('ai-chat-nav-pinned-list');
      const parentList = currentActive.navEl.parentElement;
      if (parentList === list || parentList === pinnedList) {
        const navRect = currentActive.navEl.getBoundingClientRect();
        const listRect = parentList.getBoundingClientRect();
        if (navRect.top < listRect.top || navRect.bottom > listRect.bottom) {
          currentActive.navEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    }
  }

  function debounce(func, wait) { let timeout; return () => { clearTimeout(timeout); timeout = setTimeout(func, wait); }; }

  // ====== 深度暗黑模式探测引擎 ======
  function syncTheme() {
    const nav = document.getElementById('ai-chat-nav-container');
    if (!nav) return;
    const isDarkAttr = document.documentElement.classList.contains('dark') || document.documentElement.getAttribute('data-theme') === 'dark' || document.documentElement.getAttribute('theme') === 'dark' || document.body.classList.contains('dark') || document.body.classList.contains('dark-theme') || document.body.getAttribute('data-theme') === 'dark';
    if (isDarkAttr) { nav.classList.add('is-dark-theme'); return; }
    let bg = window.getComputedStyle(document.body).backgroundColor;
    if (bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') { bg = window.getComputedStyle(document.documentElement).backgroundColor; }
    const rgb = bg.match(/\d+/g);
    if (rgb && rgb.length >= 3) {
      const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
      if (brightness < 128 && brightness > 0) { nav.classList.add('is-dark-theme'); return; }
    }
    nav.classList.remove('is-dark-theme');
  }

  // 立即执行一次，避免等待首个 interval 导致深色模式闪烁
  ensureNavUI();
  // 若 document.body 尚未就绪，DOMContentLoaded 时再补一次
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ensureNavUI(), { once: true });
  }
  setInterval(syncTheme, 1000);
  setInterval(ensureNavUI, 1000);
  setInterval(highlightCurrentNav, 500);
  const observer = new MutationObserver(debounce(syncNavigation, 1200));
  observer.observe(document.documentElement, { childList: true, subtree: true });

})();
