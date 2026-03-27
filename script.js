const navLinks = document.querySelectorAll(".nav-links a");
const pageSections = document.querySelectorAll("main section[id]");
const trackedSections = document.querySelectorAll("[data-track-section]");
const completeButtons = document.querySelectorAll(".complete-button");
const toggleButtons = document.querySelectorAll("[data-target]");
const processFlowSteps = document.querySelectorAll(".process-flow-step");
const quizItems = document.querySelectorAll(".quiz-item");
const searchInput = document.getElementById("search-input");
const searchFilterButtons = document.querySelectorAll(".search-filter");
const searchableCards = document.querySelectorAll(".searchable");
const glossaryMore = document.getElementById("glossary-more");
const glossaryToggle = document.querySelector(".glossary-toggle");
const searchMeta = document.getElementById("search-meta");
const searchEmpty = document.getElementById("search-empty");
const processFlowProgress = document.getElementById("process-flow-progress");
const processFlowStepLabel = document.getElementById("process-flow-step-label");
const processFlowStepCount = document.getElementById("process-flow-step-count");
const progressPercent = document.getElementById("progress-percent");
const progressCount = document.getElementById("progress-count");
const progressNext = document.getElementById("progress-next");
const progressRing = document.getElementById("progress-ring");
const resetProgressButton = document.getElementById("reset-progress");
const learnerNameInput = document.getElementById("learner-name");
const saveLearnerButton = document.getElementById("save-learner");
const learnerStatus = document.getElementById("learner-status");
const learnerList = document.getElementById("learner-list");
const progressProfileLabel = document.getElementById("progress-profile-label");

const progressStorageKey = "semiconductor-learning-progress";
const currentLearnerStorageKey = "semiconductor-current-learner";
const defaultLearner = "\uae30\ubcf8";

let activeSearchFilter = "all";

const glossaryMetaRules = [
  {
    category: "process",
    major: "\uacf5\uc815",
    minor: "\uc804\uacf5\uc815",
    keywords: ["lithography", "etch", "deposition", "oxidation", "ion implantation", "cmp", "metallization", "anneal", "feol", "beol"],
  },
  {
    category: "process",
    major: "\uacf5\uc815",
    minor: "\ud488\uc9c8/\uc218\uc728/\ud14c\uc2a4\ud2b8",
    keywords: ["yield", "defect", "overlay", "uniformity", "selectivity", "particle", "step coverage", "electromigration", "reliability", "cleanroom", "spc", "cpk", "wat", "cp", "ft", "binning"],
  },
  {
    category: "equipment",
    major: "\uc7a5\ube44",
    minor: "\uc9c4\uacf5/\ucc54\ubc84",
    keywords: ["vacuum", "load lock", "transfer module", "wafer handler", "showerhead", "throttle valve", "turbo pump", "dry pump", "rga"],
  },
  {
    category: "equipment",
    major: "\uc7a5\ube44",
    minor: "\ud50c\ub77c\uc988\ub9c8/RF",
    keywords: ["plasma", "rf power", "oes", "endpoint", "esc", "mfc", "chuck temperature control", "chuck"],
  },
  {
    category: "equipment",
    major: "\uc7a5\ube44",
    minor: "\uc8fc\uc785/\uc774\uc1a1",
    keywords: ["mass filter", "beamline", "stage"],
  },
  {
    category: "equipment",
    major: "\uc7a5\ube44",
    minor: "\uc790\ub3d9\ud654/\uc18c\ud504\ud2b8\uc6e8\uc5b4",
    keywords: ["recipe", "interlock", "secs/gem", "secs gem", "mes", "fdc"],
  },
  {
    category: "material",
    major: "\uc7ac\ub8cc",
    minor: "\uae30\ud310/\ub9c9/\ud654\ud559",
    keywords: ["silicon", "photoresist", "wafer", "mask", "reticle", "slurry", "substrate", "material"],
  },
  {
    category: "device",
    major: "\uc18c\uc790/\uad6c\uc870",
    minor: "\ubb3c\uc131/\uc18c\uc790",
    keywords: ["doping", "pn junction", "mosfet", "finfet", "gaa", "dram", "nand", "sram", "soc", "pmic", "leakage"],
  },
  {
    category: "package",
    major: "\ud328\ud0a4\uc9d5",
    minor: "\uad6c\uc870/\uc5f0\uacb0",
    keywords: ["chiplet", "tsv", "rdl", "bump", "package substrate", "hbm", "osat", "packaging"],
  },
  {
    category: "company",
    major: "\uae30\uc5c5",
    minor: "\uc0dd\ud0dc\uacc4/\uae30\uc5c5\uad70",
    keywords: ["company", "samsung", "sk hynix", "tsmc", "intel", "micron", "kioxia", "western digital", "globalfoundries", "umc", "smic", "qualcomm", "nvidia", "amd", "broadcom", "mediatek", "marvell", "infineon", "texas instruments", "nxp", "stmicroelectronics", "renesas", "onsemi", "asml", "applied materials", "lam research", "tokyo electron", "kla", "asm international", "screen", "besi", "ase", "amkor", "jcet", "synopsys", "cadence", "arm", "idm", "fabless", "foundry"],
  },
  {
    category: "job",
    major: "\uc9c1\ubb34",
    minor: "\uc5d4\uc9c0\ub2c8\uc5b4\ub9c1",
    keywords: ["process engineer", "equipment engineer", "yield engineer", "test engineer", "automation / software engineer", "automation software engineer", "\uc9c1\ubb34", "\uc5d4\uc9c0\ub2c8\uc5b4"],
  },
];

function getGlossaryMeta(card) {
  const text = `${card.querySelector("h3")?.textContent || ""} ${card.dataset.search || ""}`.toLowerCase();

  for (const rule of glossaryMetaRules) {
    if (rule.keywords.some((keyword) => text.includes(keyword))) {
      return rule;
    }
  }

  return {
    category: "device",
    major: "\uc18c\uc790/\uad6c\uc870",
    minor: "\ud575\uc2ec \uac1c\ub150",
  };
}

function decorateGlossaryItems() {
  document.querySelectorAll(".glossary-item").forEach((card) => {
    const meta = getGlossaryMeta(card);
    card.dataset.searchCategory = meta.category;
    card.dataset.majorCategory = meta.major;
    card.dataset.minorCategory = meta.minor;

    let tagRow = card.querySelector(".glossary-tags");
    if (!tagRow) {
      tagRow = document.createElement("div");
      tagRow.className = "glossary-tags";
      card.insertBefore(tagRow, card.querySelector("h3"));
    }

    tagRow.innerHTML = `
      <span class="glossary-tag glossary-tag-major">${meta.major}</span>
      <span class="glossary-tag glossary-tag-minor">${meta.minor}</span>
    `;
  });
}

const quizExplanations = [
  {
    a: "\uc815\uacf5\uc740 P-type\uc5d0\uc11c \ub2e4\uc218 \uc6b4\ubc18\uc790\uc774\ubbc0\ub85c N-type \uc124\uba85\uacfc \ub9de\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.",
    b: "donor \ub3c4\ud551\uc744 \ud558\uba74 \uc790\uc720 \uc804\uc790\uac00 \ub298\uc5b4\ub098 N-type\uc758 \ub2e4\uc218 \uc6b4\ubc18\uc790\uac00 \ub429\ub2c8\ub2e4.",
    c: "\uad11\uc790\ub294 \ube5b \uc785\uc790\uc774\uba70 \ubc18\ub3c4\uccb4\uc758 \uae30\ubcf8 \uc6b4\ubc18\uc790 \ubd84\ub958\uac00 \uc544\ub2d9\ub2c8\ub2e4.",
  },
  {
    o: "CMP\ub294 \ub2e4\uc74c \uacf5\uc815 \uc815\ubc00\ub3c4\ub97c \uc704\ud574 \ud45c\uba74\uc744 \ud3c9\ud0c4\ud558\uac8c \ub9cc\ub4dc\ub294 \ud575\uc2ec \uacf5\uc815\uc785\ub2c8\ub2e4.",
    x: "CMP\ub97c \ub2e8\uc21c \uc138\uc815\uc73c\ub85c\ub9cc \ubcf4\uba74 \ubd80\uc871\ud569\ub2c8\ub2e4. \ud575\uc2ec \ubaa9\uc801\uc740 \ud3c9\ud0c4\ud654\uc785\ub2c8\ub2e4.",
  },
  {
    a: "CMP\ub294 \ud3c9\ud0c4\ud654 \uacf5\uc815\uc774\ub77c EUV scanner\uc758 \uc9c1\uc811 \uc5ed\ud560\uacfc \ub2e4\ub985\ub2c8\ub2e4.",
    b: "Ion Implantation\uc740 \ub3c4\ud551 \uc8fc\uc785 \uacf5\uc815\uc73c\ub85c \ub178\uad11 \uc7a5\ube44\uc640 \uc9c1\uc811 \uc5f0\uacb0\ub418\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.",
    c: "EUV scanner\ub294 \ubbf8\uc138 \ud328\ud134\uc744 \uc6e8\uc774\ud37c\uc5d0 \uc804\uc0ac\ud558\ub294 Lithography \uc7a5\ube44\uc785\ub2c8\ub2e4.",
  },
  {
    a: "\ub9c9 \ub450\uaed8 \uc790\uccb4\ub3c4 \uc911\uc694\ud558\uc9c0\ub9cc selectivity\uc758 \uc9c1\uc811 \uc815\uc758\uc640\ub294 \uac70\ub9ac\uac00 \uc788\uc2b5\ub2c8\ub2e4.",
    b: "\uc120\ud0dd\ube44\uac00 \uc88b\uc544\uc57c \ubaa9\ud45c\ub9c9\uc740 \uae4e\uace0 \ubcf4\ud638\ub9c9 \uc190\uc0c1\uc740 \uc904\uc77c \uc218 \uc788\uc2b5\ub2c8\ub2e4.",
    c: "\uac10\ub3c4\ub294 \ud3ec\ud1a0\ub808\uc9c0\uc2a4\ud2b8 \uc774\uc288\uc5d0 \ub354 \uac00\uae5d\uace0 selectivity\uc758 \ud575\uc2ec \uc124\uba85\uc740 \uc544\ub2d9\ub2c8\ub2e4.",
  },
  {
    a: "PM, chamber, calibration\uc740 \uc7a5\ube44 \uc5d4\uc9c0\ub2c8\uc5b4\uc758 \uc77c\uc0c1 \uc5c5\ubb34\uc640 \uac00\uc7a5 \uc9c1\uc811\uc801\uc73c\ub85c \ub9de\ub2ff\uc544 \uc788\uc2b5\ub2c8\ub2e4.",
    b: "\ubb38\uc7a5 \ud45c\ud604\uc774\ub098 \uae00\uc4f0\uae30 \uc5ed\ub7c9\uc740 \ubd80\uac00 \uc694\uc18c\uc77c \uc218 \uc788\uc5b4\ub3c4 \ud575\uc2ec \ud0a4\uc6cc\ub4dc\ub294 \uc544\ub2d9\ub2c8\ub2e4.",
    c: "\ud1b5\uacc4 \uacc4\uc0b0\ub9cc\uc73c\ub85c \uc7a5\ube44 \uc9c1\ubb34\ub97c \uc124\uba85\ud558\uae30\uc5d0\ub294 \ubc94\uc704\uac00 \ub108\ubb34 \uc881\uc2b5\ub2c8\ub2e4.",
  },
  {
    a: "\ud328\ud0a4\uc9d5\ub9cc \uc218\ud589\ud558\ub294 \uae30\uc5c5\uc740 OSAT\uc5d0 \ub354 \uac00\uae5d\uc2b5\ub2c8\ub2e4.",
    b: "\uc7a5\ube44\ub9cc \uacf5\uae09\ud558\ub294 \uae30\uc5c5\uc740 equipment vendor \uc124\uba85\uc5d0 \uac00\uae5d\uc2b5\ub2c8\ub2e4.",
    c: "Foundry\ub294 \uc678\ubd80 \uace0\uac1d\uc758 \uc124\uacc4\ub97c \ubc1b\uc544 \uc6e8\uc774\ud37c \uc0dd\uc0b0\uc744 \ub2f4\ub2f9\ud558\ub294 \uad6c\uc870\uc785\ub2c8\ub2e4.",
  },
  {
    a: "\uae30\uacc4 \uc7a5\ube44 \uc77c\ubc18\uacfc HBM\uc758 \ub300\ud45c \uc751\uc6a9 \ubd84\uc57c\ub294 \uc9c1\uc811 \uc5f0\uacb0\ub418\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.",
    b: "HBM\uc740 \ub300\uc6a9\ub7c9 \ub370\uc774\ud130\ub97c \ube60\ub974\uac8c \ucc98\ub9ac\ud574\uc57c \ud558\ub294 AI, HPC \ud658\uacbd\uacfc \ud2b9\ud788 \uc798 \ub9de\uc2b5\ub2c8\ub2e4.",
    c: "\uc885\uc774 \uc778\uc1c4 \uacf5\uc815\uc740 \ubc18\ub3c4\uccb4 HBM\uacfc \uad00\ub828\uc774 \uc5c6\uc2b5\ub2c8\ub2e4.",
  },
  {
    a: "WAT\ub294 \uc6e8\uc774\ud37c \ub2e8\uacc4 \uc804\uae30 \ud30c\ub77c\ubbf8\ud130 \uce21\uc815\uc73c\ub85c \uacf5\uc815 \uc0c1\ud0dc\ub97c \ud655\uc778\ud558\ub294 \ud14c\uc2a4\ud2b8\uc785\ub2c8\ub2e4.",
    b: "\ud328\ud0a4\uc9c0 \uc678\uad00 \uac80\uc0ac\ub9cc\uc73c\ub85c\ub294 WAT\uc758 \ubaa9\uc801\uc744 \uc124\uba85\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4.",
    c: "\uba74\uc811 \ubb38\ud56d \uc0dd\uc131\uc740 \ud14c\uc2a4\ud2b8 \uacf5\uc815 \ubaa9\uc801\uacfc \ubb34\uad00\ud569\ub2c8\ub2e4.",
  },
];

function getCurrentLearner() {
  return localStorage.getItem(currentLearnerStorageKey) || defaultLearner;
}

function setCurrentLearner(name) {
  localStorage.setItem(currentLearnerStorageKey, name);
}

function loadProgressStore() {
  try {
    return JSON.parse(localStorage.getItem(progressStorageKey) || "{}");
  } catch {
    return {};
  }
}

function saveProgressStore(progressStore) {
  localStorage.setItem(progressStorageKey, JSON.stringify(progressStore));
}

function loadProgress() {
  const progressStore = loadProgressStore();
  return progressStore[getCurrentLearner()] || {};
}

function saveProgress(progress) {
  const progressStore = loadProgressStore();
  progressStore[getCurrentLearner()] = progress;
  saveProgressStore(progressStore);
}

function refreshLearnerList() {
  if (!learnerList) return;

  learnerList.innerHTML = "";
  Object.keys(loadProgressStore())
    .sort((a, b) => a.localeCompare(b, "ko"))
    .forEach((name) => {
      const option = document.createElement("option");
      option.value = name;
      learnerList.appendChild(option);
    });
}

function updateProgressUI() {
  const progress = loadProgress();
  const total = trackedSections.length;
  const completedSections = Array.from(trackedSections).filter((section) => progress[section.dataset.trackSection]);
  const completed = completedSections.length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  const nextSection = Array.from(trackedSections).find((section) => !progress[section.dataset.trackSection]);
  const learner = getCurrentLearner();

  if (progressPercent) progressPercent.textContent = `${percent}%`;
  if (progressCount) progressCount.textContent = `${completed}/${total}`;
  if (progressNext) {
    progressNext.textContent = nextSection
      ? `\ub2e4\uc74c \ucd94\ucc9c: ${nextSection.dataset.sectionLabel}`
      : "\ubaa8\ub4e0 \ud559\uc2b5 \uc139\uc158\uc744 \uc644\ub8cc\ud588\uc2b5\ub2c8\ub2e4";
  }
  if (progressProfileLabel) progressProfileLabel.textContent = `\ud604\uc7ac \ud559\uc2b5\uc790: ${learner}`;
  if (learnerNameInput) learnerNameInput.value = learner;
  if (learnerStatus) learnerStatus.textContent = `${learner} \ud504\ub85c\ud544 \uae30\uc900\uc73c\ub85c \uc9c4\ub3c4\ub97c \uc800\uc7a5\ud569\ub2c8\ub2e4.`;
  if (progressRing) progressRing.style.setProperty("--progress-angle", `${Math.max(percent * 3.6, 0)}deg`);

  completeButtons.forEach((button) => {
    const target = button.dataset.completeTarget;
    const done = Boolean(progress[target]);
    button.classList.toggle("is-complete", done);
    button.textContent = done ? "\uc644\ub8cc\ub428" : "\uc774 \uc139\uc158 \uc644\ub8cc";
    button.setAttribute("aria-pressed", String(done));
  });

  refreshLearnerList();
}

function updateGlossaryToggle(isOpen) {
  if (!glossaryToggle || !glossaryMore) return;

  glossaryMore.classList.toggle("is-open", isOpen);
  glossaryToggle.classList.toggle("is-open", isOpen);
  glossaryToggle.setAttribute("aria-expanded", String(isOpen));

  const label = glossaryToggle.querySelector("span");
  if (label) {
    label.textContent = isOpen
      ? "\ud655\uc7a5 \uc6a9\uc5b4\uc0ac\uc804 \uc811\uae30"
      : "\ud655\uc7a5 \uc6a9\uc5b4\uc0ac\uc804 \ud3bc\uce58\uae30";
  }
}

function openPanel(panel, button) {
  if (!panel || !button) return;

  panel.hidden = false;
  button.setAttribute("aria-expanded", "true");

  if (button.classList.contains("accordion-trigger")) {
    button.classList.add("is-open");
    const plus = button.querySelector(".plus");
    if (plus) plus.textContent = "\u2212";
  }

  if (button.classList.contains("toggle-button")) {
    button.textContent = "\uc0c1\uc138 \uc124\uba85 \ub2eb\uae30";
  }
}

function closePanel(panel, button) {
  if (!panel || !button) return;

  panel.hidden = true;
  button.setAttribute("aria-expanded", "false");

  if (button.classList.contains("accordion-trigger")) {
    button.classList.remove("is-open");
    const plus = button.querySelector(".plus");
    if (plus) plus.textContent = "+";
  }

  if (button.classList.contains("toggle-button")) {
    button.textContent = "\uc0c1\uc138 \uc124\uba85 \ubcf4\uae30";
  }
}

function setActiveProcessStep(step) {
  if (!step) return;

  processFlowSteps.forEach((button) => {
    button.classList.toggle("is-active", button === step);
  });

  const stepIndex = Number(step.dataset.stepIndex || 1);
  const total = processFlowSteps.length || 1;
  const percent = Math.max((stepIndex / total) * 100, 12.5);

  if (processFlowProgress) processFlowProgress.style.width = `${percent}%`;
  if (processFlowStepLabel) processFlowStepLabel.textContent = `Step ${stepIndex} \u00b7 ${step.dataset.stepLabel || ""}`;
  if (processFlowStepCount) processFlowStepCount.textContent = `${stepIndex} / ${total}`;
}

function inferSearchCategory(card) {
  if (card.dataset.searchCategory) return card.dataset.searchCategory;
  if (card.classList.contains("glossary-item")) return getGlossaryMeta(card).category;

  const section = card.closest("section");
  if (!section) return "term";

  const sectionId = section.id;
  if (sectionId === "process") return "process";
  if (sectionId === "equipment") return "equipment";
  if (sectionId === "materials") return "material";
  if (sectionId === "industry") return "company";
  if (sectionId === "career") return "job";
  if (sectionId === "advanced-packaging") return "package";
  return "term";
}

function applySearch() {
  const query = (searchInput?.value || "").trim().toLowerCase();

  if (glossaryMore && glossaryToggle) {
    if (query !== "") {
      updateGlossaryToggle(true);
    } else if (glossaryToggle.dataset.userExpanded !== "true") {
      updateGlossaryToggle(false);
    }
  }

  let visibleCount = 0;

  searchableCards.forEach((card) => {
    const text = (card.dataset.search || "").toLowerCase();
    const category = inferSearchCategory(card);
    const matchesQuery = query === "" || text.includes(query);
    const matchesFilter = activeSearchFilter === "all" || activeSearchFilter === category;
    const visible = matchesQuery && matchesFilter;

    card.classList.toggle("is-hidden", !visible);
    if (visible) visibleCount += 1;
  });

  if (searchMeta) {
    const filterLabelMap = {
      all: "\uc804\uccb4",
      process: "\uacf5\uc815",
      equipment: "\uc7a5\ube44",
      material: "\uc7ac\ub8cc",
      device: "\uc18c\uc790/\uad6c\uc870",
      package: "\ud328\ud0a4\uc9d5",
      company: "\uae30\uc5c5",
      job: "\uc9c1\ubb34",
    };

    searchMeta.textContent =
      query === ""
        ? `${filterLabelMap[activeSearchFilter]} \ubc94\uc704\uc5d0\uc11c \uc6a9\uc5b4, \uacf5\uc815, \uc7a5\ube44, \uae30\uc5c5, \uc9c1\ubb34\ub97c \ud0d0\uc0c9\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.`
        : `"${searchInput.value}" \uac80\uc0c9 \uacb0\uacfc ${visibleCount}\uac1c`;
  }

  if (searchEmpty) {
    searchEmpty.hidden = visibleCount !== 0;
  }
}

toggleButtons.forEach((button) => {
  const targetId = button.getAttribute("data-target");
  const panel = targetId ? document.getElementById(targetId) : null;

  if (panel) {
    button.setAttribute("aria-controls", targetId);
    button.setAttribute("aria-expanded", "false");
  }

  if (button.classList.contains("accordion-trigger")) {
    const plus = button.querySelector(".plus");
    if (plus) plus.textContent = "+";
  }

  button.addEventListener("click", () => {
    if (button.classList.contains("glossary-toggle")) return;
    if (!panel) return;

    if (panel.hidden) {
      openPanel(panel, button);
    } else {
      closePanel(panel, button);
    }
  });
});

processFlowSteps.forEach((step) => {
  step.addEventListener("click", () => {
    const panelId = step.dataset.targetPanel;
    const panel = panelId ? document.getElementById(panelId) : null;
    const trigger = panel ? document.querySelector(`.accordion-trigger[data-target="${panelId}"]`) : null;

    setActiveProcessStep(step);

    if (panel && trigger) {
      openPanel(panel, trigger);
      trigger.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
});

quizItems.forEach((item, index) => {
  const answer = item.dataset.answer;
  const feedback = item.querySelector(".quiz-feedback");
  const options = item.querySelectorAll(".quiz-options button");
  const explanationBox = document.createElement("div");
  explanationBox.className = "quiz-explanations";
  explanationBox.hidden = true;
  item.appendChild(explanationBox);

  options.forEach((option) => {
    option.addEventListener("click", () => {
      const selected = option.dataset.choice;
      const explanationSet = quizExplanations[index] || {};

      options.forEach((button) => button.classList.remove("correct", "wrong"));

      if (selected === answer) {
        option.classList.add("correct");
      } else {
        option.classList.add("wrong");
        const correctButton = item.querySelector(`[data-choice="${answer}"]`);
        if (correctButton) correctButton.classList.add("correct");
      }

      if (feedback) feedback.hidden = false;

      explanationBox.innerHTML = "";
      options.forEach((button) => {
        const choice = button.dataset.choice;
        const label = button.textContent?.trim() || choice;
        const row = document.createElement("div");
        row.className = "quiz-explanation";
        row.innerHTML = `<strong>${choice === answer ? "\uc815\ub2f5" : "\uc624\ub2f5"}: ${label}</strong><p>${explanationSet[choice] || "\uc774 \uc120\ud0dd\uc9c0\ub294 \ud604\uc7ac \ubb38\uc81c \uc758\ub3c4\uc640 \uc9c1\uc811 \ub9de\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4."}</p>`;
        explanationBox.appendChild(row);
      });
      explanationBox.hidden = false;
    });
  });
});

if (glossaryToggle && glossaryMore) {
  decorateGlossaryItems();
  updateGlossaryToggle(false);
  glossaryToggle.addEventListener("click", () => {
    const isOpen = glossaryMore.classList.contains("is-open");
    updateGlossaryToggle(!isOpen);
    glossaryToggle.dataset.userExpanded = isOpen ? "false" : "true";
  });
}

if (saveLearnerButton && learnerNameInput) {
  saveLearnerButton.addEventListener("click", () => {
    const nextLearner = learnerNameInput.value.trim() || defaultLearner;
    setCurrentLearner(nextLearner);
    const progressStore = loadProgressStore();
    if (!progressStore[nextLearner]) {
      progressStore[nextLearner] = {};
      saveProgressStore(progressStore);
    }
    updateProgressUI();
  });

  learnerNameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      saveLearnerButton.click();
    }
  });
}

completeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.completeTarget;
    const progress = loadProgress();
    progress[target] = !progress[target];
    saveProgress(progress);
    updateProgressUI();
  });
});

if (resetProgressButton) {
  resetProgressButton.addEventListener("click", () => {
    const progressStore = loadProgressStore();
    delete progressStore[getCurrentLearner()];
    saveProgressStore(progressStore);
    updateProgressUI();
  });
}

if (searchInput) {
  searchInput.addEventListener("input", applySearch);
}

searchFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeSearchFilter = button.dataset.filter || "all";
    searchFilterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-selected", String(isActive));
    });
    applySearch();
  });
});

if (navLinks.length > 0 && pageSections.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navLinks.forEach((link) => {
          const isActive = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("is-active", isActive);
          if (isActive) {
            link.setAttribute("aria-current", "page");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    },
    {
      rootMargin: "-30% 0px -55% 0px",
      threshold: 0.1,
    }
  );

  pageSections.forEach((section) => observer.observe(section));
}

if (processFlowSteps.length > 0) {
  setActiveProcessStep(processFlowSteps[0]);
}

updateProgressUI();
applySearch();
