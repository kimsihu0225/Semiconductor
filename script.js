const navLinks = document.querySelectorAll('.nav-links a');
const pageSections = document.querySelectorAll('main section[id]');
const toggleButtons = document.querySelectorAll('[data-target]');
const processFlowSteps = document.querySelectorAll('.process-flow-step');
const quizItems = document.querySelectorAll('.quiz-item');
const searchInput = document.getElementById('search-input');
const searchFilterButtons = document.querySelectorAll('.search-filter');
const searchableCards = document.querySelectorAll('.searchable');
const glossaryMore = document.getElementById('glossary-more');
const glossaryToggle = document.querySelector('.glossary-toggle');
const searchMeta = document.getElementById('search-meta');
const searchEmpty = document.getElementById('search-empty');
const processFlowProgress = document.getElementById('process-flow-progress');
const processFlowStepLabel = document.getElementById('process-flow-step-label');
const processFlowStepCount = document.getElementById('process-flow-step-count');

let activeSearchFilter = 'all';

const glossaryMetaRules = [
  { category: 'process', major: '공정', minor: '전공정', keywords: ['lithography', 'etch', 'deposition', 'oxidation', 'ion implantation', 'cmp', 'metallization', 'anneal', 'feol', 'beol'] },
  { category: 'process', major: '공정', minor: '품질/수율/테스트', keywords: ['yield', 'defect', 'overlay', 'uniformity', 'selectivity', 'particle', 'step coverage', 'electromigration', 'reliability', 'cleanroom', 'spc', 'cpk', 'wat', 'cp', 'ft', 'binning'] },
  { category: 'equipment', major: '장비', minor: '진공/챔버', keywords: ['vacuum', 'load lock', 'transfer module', 'wafer handler', 'showerhead', 'throttle valve', 'turbo pump', 'dry pump', 'rga'] },
  { category: 'equipment', major: '장비', minor: '플라즈마/RF', keywords: ['plasma', 'rf power', 'oes', 'endpoint', 'esc', 'mfc', 'chuck temperature control', 'chuck'] },
  { category: 'equipment', major: '장비', minor: '주입/이송', keywords: ['mass filter', 'beamline', 'stage'] },
  { category: 'equipment', major: '장비', minor: '자동화/소프트웨어', keywords: ['recipe', 'interlock', 'secs/gem', 'secs gem', 'mes', 'fdc'] },
  { category: 'material', major: '재료', minor: '기판/막/화학', keywords: ['silicon', 'photoresist', 'wafer', 'mask', 'reticle', 'slurry', 'substrate', 'material'] },
  { category: 'device', major: '소자/구조', minor: '물성/소자', keywords: ['doping', 'pn junction', 'mosfet', 'finfet', 'gaa', 'dram', 'nand', 'sram', 'soc', 'pmic', 'leakage'] },
  { category: 'package', major: '패키징', minor: '구조/연결', keywords: ['chiplet', 'tsv', 'rdl', 'bump', 'package substrate', 'hbm', 'osat', 'packaging'] },
  { category: 'company', major: '기업', minor: '생태계/기업군', keywords: ['company', 'samsung', 'sk hynix', 'tsmc', 'intel', 'micron', 'kioxia', 'western digital', 'globalfoundries', 'umc', 'smic', 'qualcomm', 'nvidia', 'amd', 'broadcom', 'mediatek', 'marvell', 'infineon', 'texas instruments', 'nxp', 'stmicroelectronics', 'renesas', 'onsemi', 'asml', 'applied materials', 'lam research', 'tokyo electron', 'kla', 'asm international', 'screen', 'besi', 'ase', 'amkor', 'jcet', 'synopsys', 'cadence', 'arm', 'idm', 'fabless', 'foundry'] },
  { category: 'job', major: '직무', minor: '엔지니어링', keywords: ['process engineer', 'equipment engineer', 'yield engineer', 'test engineer', 'automation / software engineer', 'automation software engineer', '직무', '엔지니어'] },
];

const quizExplanations = [
  { a: '정공은 P-type의 다수 운반자이므로 N-type 설명과 맞지 않습니다.', b: 'donor 도핑을 하면 자유 전자가 늘어나 N-type의 다수 운반자가 됩니다.', c: '광자는 기본 전하 운반자 분류가 아닙니다.' },
  { o: 'CMP는 다음 공정 정밀도를 위해 표면을 평탄하게 만드는 핵심 공정입니다.', x: 'CMP를 단순 세정으로만 보면 부족합니다. 핵심 목적은 평탄화입니다.' },
  { a: 'CMP는 평탄화 공정이라 EUV scanner의 직접 역할과 다릅니다.', b: 'Ion Implantation은 도핑 주입 공정으로 노광 장비와 직접 연결되지 않습니다.', c: 'EUV scanner는 미세 패턴을 웨이퍼에 전사하는 Lithography 장비입니다.' },
  { a: '막 두께 자체도 중요하지만 selectivity의 직접 정의와는 거리가 있습니다.', b: '선택비가 좋아야 목표막은 깎고 보호막 손상은 줄일 수 있습니다.', c: '감도는 포토레지스트 이슈에 더 가깝고 selectivity의 핵심 설명은 아닙니다.' },
  { a: 'PM, chamber, calibration은 장비 엔지니어의 일상 업무와 가장 직접적으로 맞닿아 있습니다.', b: '문장 표현력이나 글쓰기는 부가 요소일 수 있어도 핵심 키워드는 아닙니다.', c: '통계 계산만으로 장비 직무를 설명하기에는 범위가 너무 좁습니다.' },
  { a: '패키징만 수행하는 기업은 OSAT에 더 가깝습니다.', b: '장비만 공급하는 기업은 equipment vendor 설명에 가깝습니다.', c: 'Foundry는 외부 고객 설계를 받아 웨이퍼 생산을 담당하는 구조입니다.' },
  { a: '기계식 가공 장비와 HBM의 대표 응용 분야는 직접 연결되지 않습니다.', b: 'HBM은 AI, HPC 환경과 특히 잘 맞습니다.', c: '종이 인쇄 공정은 반도체 HBM과 관련이 없습니다.' },
  { a: 'WAT는 웨이퍼 단계 전기 파라미터 측정으로 공정 상태를 확인하는 테스트입니다.', b: '패키지 외관 검사만으로는 WAT의 목적을 설명할 수 없습니다.', c: '면접 문항 생성은 테스트 공정 목적과 무관합니다.' },
];

function getGlossaryMeta(card) {
  const text = `${card.querySelector('h3')?.textContent || ''} ${card.dataset.search || ''}`.toLowerCase();
  for (const rule of glossaryMetaRules) {
    if (rule.keywords.some((keyword) => text.includes(keyword))) return rule;
  }
  return { category: 'device', major: '소자/구조', minor: '핵심 개념' };
}

function decorateGlossaryItems() {
  document.querySelectorAll('.glossary-item').forEach((card) => {
    const meta = getGlossaryMeta(card);
    card.dataset.searchCategory = meta.category;
    let tagRow = card.querySelector('.glossary-tags');
    if (!tagRow) {
      tagRow = document.createElement('div');
      tagRow.className = 'glossary-tags';
      card.insertBefore(tagRow, card.querySelector('h3'));
    }
    tagRow.innerHTML = `<span class="glossary-tag glossary-tag-major">${meta.major}</span><span class="glossary-tag glossary-tag-minor">${meta.minor}</span>`;
  });
}

function updateGlossaryToggle(isOpen) {
  if (!glossaryToggle || !glossaryMore) return;
  glossaryMore.classList.toggle('is-open', isOpen);
  glossaryToggle.classList.toggle('is-open', isOpen);
  glossaryToggle.setAttribute('aria-expanded', String(isOpen));
  const label = glossaryToggle.querySelector('span');
  if (label) label.textContent = isOpen ? '확장 용어사전 접기' : '확장 용어사전 펼치기';
}

function openPanel(panel, button) {
  if (!panel || !button) return;
  panel.hidden = false;
  button.setAttribute('aria-expanded', 'true');
  if (button.classList.contains('accordion-trigger')) {
    button.classList.add('is-open');
    const plus = button.querySelector('.plus');
    if (plus) plus.textContent = '−';
  }
  if (button.classList.contains('toggle-button')) {
    button.textContent = '상세 설명 닫기';
  }
}

function closePanel(panel, button) {
  if (!panel || !button) return;
  panel.hidden = true;
  button.setAttribute('aria-expanded', 'false');
  if (button.classList.contains('accordion-trigger')) {
    button.classList.remove('is-open');
    const plus = button.querySelector('.plus');
    if (plus) plus.textContent = '+';
  }
  if (button.classList.contains('toggle-button')) {
    button.textContent = '상세 설명 보기';
  }
}

function setActiveProcessStep(step) {
  if (!step) return;
  processFlowSteps.forEach((button) => button.classList.toggle('is-active', button === step));
  const stepIndex = Number(step.dataset.stepIndex || 1);
  const total = processFlowSteps.length || 1;
  const percent = Math.max((stepIndex / total) * 100, 12.5);
  if (processFlowProgress) processFlowProgress.style.width = `${percent}%`;
  if (processFlowStepLabel) processFlowStepLabel.textContent = `Step ${stepIndex} · ${step.dataset.stepLabel || ''}`;
  if (processFlowStepCount) processFlowStepCount.textContent = `${stepIndex} / ${total}`;
}

function highlightProcessDetail(panelId) {
  document.querySelectorAll('.process-grid .accordion-card').forEach((card) => {
    const trigger = card.querySelector('.accordion-trigger');
    card.classList.toggle('is-linked', trigger?.dataset.target === panelId);
  });
}

function inferSearchCategory(card) {
  if (card.dataset.searchCategory) return card.dataset.searchCategory;
  if (card.classList.contains('glossary-item')) return getGlossaryMeta(card).category;
  const section = card.closest('section');
  if (!section) return 'device';
  const sectionId = section.id;
  if (sectionId === 'process' || sectionId === 'lithography-page' || sectionId === 'etching-page' || sectionId === 'deposition-page' || sectionId === 'cmp-page') return 'process';
  if (sectionId === 'equipment') return 'equipment';
  if (sectionId === 'materials') return 'material';
  if (sectionId === 'industry') return 'company';
  if (sectionId === 'career') return 'job';
  if (sectionId === 'advanced-packaging' || sectionId === 'packaging-page') return 'package';
  return 'device';
}

function applySearch() {
  const query = (searchInput?.value || '').trim().toLowerCase();
  if (glossaryMore && glossaryToggle) {
    if (query !== '') updateGlossaryToggle(true);
    else if (glossaryToggle.dataset.userExpanded !== 'true') updateGlossaryToggle(false);
  }
  let visibleCount = 0;
  searchableCards.forEach((card) => {
    const text = (card.dataset.search || '').toLowerCase();
    const category = inferSearchCategory(card);
    const visible = (query === '' || text.includes(query)) && (activeSearchFilter === 'all' || activeSearchFilter === category);
    card.classList.toggle('is-hidden', !visible);
    if (visible) visibleCount += 1;
  });
  if (searchMeta) {
    const filterLabelMap = { all: '전체', process: '공정', equipment: '장비', material: '재료', device: '소자/구조', package: '패키징', company: '기업', job: '직무' };
    searchMeta.textContent = query === '' ? `${filterLabelMap[activeSearchFilter]} 범위에서 공정, 장비, 재료, 소자/구조, 패키징, 기업, 직무를 탐색할 수 있습니다.` : `"${searchInput.value}" 검색 결과 ${visibleCount}개`;
  }
  if (searchEmpty) searchEmpty.hidden = visibleCount !== 0;
}

toggleButtons.forEach((button) => {
  const targetId = button.getAttribute('data-target');
  const panel = targetId ? document.getElementById(targetId) : null;
  if (panel) {
    button.setAttribute('aria-controls', targetId);
    button.setAttribute('aria-expanded', 'false');
  }
  if (button.classList.contains('accordion-trigger')) {
    const plus = button.querySelector('.plus');
    if (plus) plus.textContent = '+';
  }
  button.addEventListener('click', () => {
    if (button.classList.contains('glossary-toggle')) return;
    if (!panel) return;
    if (panel.hidden) openPanel(panel, button);
    else closePanel(panel, button);
  });
});

processFlowSteps.forEach((step) => {
  step.addEventListener('click', () => {
    const panelId = step.dataset.targetPanel;
    const panel = panelId ? document.getElementById(panelId) : null;
    const trigger = panel ? document.querySelector(`.accordion-trigger[data-target="${panelId}"]`) : null;
    setActiveProcessStep(step);
    if (panelId) highlightProcessDetail(panelId);
    if (panel && trigger) {
      openPanel(panel, trigger);
      trigger.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
});

document.querySelectorAll('.process-grid .accordion-trigger').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const panelId = trigger.dataset.target;
    const matchingStep = document.querySelector(`.process-flow-step[data-target-panel="${panelId}"]`);
    if (matchingStep) setActiveProcessStep(matchingStep);
    if (panelId) highlightProcessDetail(panelId);
  });
});

quizItems.forEach((item, index) => {
  const answer = item.dataset.answer;
  const feedback = item.querySelector('.quiz-feedback');
  const options = item.querySelectorAll('.quiz-options button');
  const explanationBox = document.createElement('div');
  explanationBox.className = 'quiz-explanations';
  explanationBox.hidden = true;
  item.appendChild(explanationBox);

  options.forEach((option) => {
    option.addEventListener('click', () => {
      const selected = option.dataset.choice;
      const explanationSet = quizExplanations[index] || {};
      options.forEach((button) => button.classList.remove('correct', 'wrong'));
      if (selected === answer) option.classList.add('correct');
      else {
        option.classList.add('wrong');
        const correctButton = item.querySelector(`[data-choice="${answer}"]`);
        if (correctButton) correctButton.classList.add('correct');
      }
      if (feedback) feedback.hidden = false;
      explanationBox.innerHTML = '';
      options.forEach((button) => {
        const choice = button.dataset.choice;
        const label = button.textContent?.trim() || choice;
        const row = document.createElement('div');
        row.className = 'quiz-explanation';
        row.innerHTML = `<strong>${choice === answer ? '정답' : '오답'}: ${label}</strong><p>${explanationSet[choice] || '이 선택지는 현재 문제 의도와 직접 맞지 않습니다.'}</p>`;
        explanationBox.appendChild(row);
      });
      explanationBox.hidden = false;
    });
  });
});

if (glossaryToggle && glossaryMore) {
  decorateGlossaryItems();
  updateGlossaryToggle(false);
  glossaryToggle.addEventListener('click', () => {
    const isOpen = glossaryMore.classList.contains('is-open');
    updateGlossaryToggle(!isOpen);
    glossaryToggle.dataset.userExpanded = isOpen ? 'false' : 'true';
  });
}

if (searchInput) searchInput.addEventListener('input', applySearch);
searchFilterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeSearchFilter = button.dataset.filter || 'all';
    searchFilterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle('is-active', isActive);
      filterButton.setAttribute('aria-selected', String(isActive));
    });
    applySearch();
  });
});

if (navLinks.length > 0 && pageSections.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        const isHashLink = href && href.startsWith('#');
        const isActive = isHashLink && href === `#${entry.target.id}`;
        link.classList.toggle('is-active', Boolean(isActive));
      });
    });
  }, { rootMargin: '-30% 0px -55% 0px', threshold: 0.1 });
  pageSections.forEach((section) => observer.observe(section));
}

if (processFlowSteps.length > 0) {
  setActiveProcessStep(processFlowSteps[0]);
  const firstPanelId = processFlowSteps[0].dataset.targetPanel;
  if (firstPanelId) highlightProcessDetail(firstPanelId);
}

applySearch();
