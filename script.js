const toggleButtons = document.querySelectorAll("[data-target]");
const navLinks = document.querySelectorAll(".nav-links a");
const pageSections = document.querySelectorAll("main section[id]");
const trackedSections = document.querySelectorAll("[data-track-section]");
const completeButtons = document.querySelectorAll(".complete-button");
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
const defaultLearner = "기본";

toggleButtons.forEach((button) => {
  const targetId = button.getAttribute("data-target");
  const panel = targetId ? document.getElementById(targetId) : null;
  if (panel) {
    button.setAttribute("aria-controls", targetId);
    button.setAttribute("aria-expanded", "false");
  }

  button.addEventListener("click", () => {
    if (button.classList.contains("glossary-toggle")) {
      return;
    }

    if (!panel) {
      return;
    }

    const isHidden = panel.hasAttribute("hidden");
    panel.toggleAttribute("hidden");
    button.setAttribute("aria-expanded", String(isHidden));

    if (button.classList.contains("accordion-trigger")) {
      const plus = button.querySelector(".plus");
      button.classList.toggle("is-open", isHidden);
      if (plus) {
        plus.textContent = isHidden ? "−" : "+";
      }
    }

    if (button.classList.contains("toggle-button")) {
      button.textContent = isHidden ? "상세 설명 닫기" : "상세 설명 보기";
    }
  });
});

const quizItems = document.querySelectorAll(".quiz-item");

quizItems.forEach((item) => {
  const answer = item.dataset.answer;
  const feedback = item.querySelector(".quiz-feedback");
  const options = item.querySelectorAll(".quiz-options button");

  options.forEach((option) => {
    option.addEventListener("click", () => {
      options.forEach((button) => {
        button.classList.remove("correct", "wrong");
      });

      const selected = option.dataset.choice;
      if (selected === answer) {
        option.classList.add("correct");
      } else {
        option.classList.add("wrong");
        const correctButton = item.querySelector(`[data-choice="${answer}"]`);
        if (correctButton) {
          correctButton.classList.add("correct");
        }
      }

      if (feedback) {
        feedback.hidden = false;
      }
    });
  });
});

const searchInput = document.getElementById("search-input");
const searchableCards = document.querySelectorAll(".searchable");
const glossaryMore = document.getElementById("glossary-more");
const glossaryToggle = document.querySelector(".glossary-toggle");
const searchMeta = document.getElementById("search-meta");
const searchEmpty = document.getElementById("search-empty");

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
  const learner = getCurrentLearner();
  return progressStore[learner] || {};
}

function saveProgress(progress) {
  const progressStore = loadProgressStore();
  const learner = getCurrentLearner();
  progressStore[learner] = progress;
  saveProgressStore(progressStore);
}

function refreshLearnerList() {
  if (!learnerList) {
    return;
  }

  const progressStore = loadProgressStore();
  learnerList.innerHTML = "";
  Object.keys(progressStore)
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

  if (progressPercent) {
    progressPercent.textContent = `${percent}%`;
  }

  if (progressCount) {
    progressCount.textContent = `${completed}/${total}`;
  }

  if (progressNext) {
    progressNext.textContent = nextSection
      ? `다음 추천: ${nextSection.dataset.sectionLabel}`
      : "모든 핵심 섹션을 완료했습니다";
  }

  if (progressProfileLabel) {
    progressProfileLabel.textContent = `현재 학습자: ${learner}`;
  }

  if (learnerNameInput) {
    learnerNameInput.value = learner;
  }

  if (learnerStatus) {
    learnerStatus.textContent = `${learner} 프로필 기준으로 진도가 저장됩니다.`;
  }

  if (progressRing) {
    progressRing.style.setProperty("--progress-angle", `${Math.max(percent * 3.6, 0)}deg`);
  }

  completeButtons.forEach((button) => {
    const target = button.dataset.completeTarget;
    const done = Boolean(progress[target]);
    button.classList.toggle("is-complete", done);
    button.textContent = done ? "완료됨" : "이 섹션 완료";
    button.setAttribute("aria-pressed", String(done));
  });

  refreshLearnerList();
}

function updateGlossaryToggle(isOpen) {
  if (!glossaryToggle || !glossaryMore) {
    return;
  }

  glossaryMore.classList.toggle("is-open", isOpen);
  glossaryToggle.classList.toggle("is-open", isOpen);
  glossaryToggle.setAttribute("aria-expanded", String(isOpen));

  const label = glossaryToggle.querySelector("span");
  if (label) {
    label.textContent = isOpen ? "추가 용어/기업 접기" : "추가 용어/기업 펼치기";
  }
}

if (glossaryToggle && glossaryMore) {
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
  searchInput.addEventListener("input", (event) => {
    const query = event.target.value.trim().toLowerCase();

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
      const match = query === "" || text.includes(query);
      card.classList.toggle("is-hidden", !match);
      if (match) {
        visibleCount += 1;
      }
    });

    if (searchMeta) {
      searchMeta.textContent =
        query === ""
          ? "현재 핵심 용어와 확장 용어/기업을 함께 탐색할 수 있습니다."
          : `"${event.target.value}" 검색 결과 ${visibleCount}개`;
    }

    if (searchEmpty) {
      searchEmpty.hidden = visibleCount !== 0;
    }
  });
}

if (navLinks.length > 0 && pageSections.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

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

updateProgressUI();
