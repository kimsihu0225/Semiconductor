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
const processVisualStep = document.getElementById("process-visual-step");
const processVisualTitle = document.getElementById("process-visual-title");
const processVisualChange = document.getElementById("process-visual-change");
const processVisualSummary = document.getElementById("process-visual-summary");
const processVisualSvg = document.getElementById("process-visual-svg");
const processPurposeList = document.getElementById("process-purpose-list");
const processChangeList = document.getElementById("process-change-list");
const processEquipmentList = document.getElementById("process-equipment-list");
const processKeypointList = document.getElementById("process-keypoint-list");
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

const processVisualizationData = {
  "proc-oxidation": {
    title: "Oxidation",
    change: "\uc0b0\ud654\ub9c9 \ucd94\uac00",
    summary:
      "\uc2e4\ub9ac\ucf58 \ud45c\uba74 \uc704\uc5d0 \uade0\uc77c\ud55c SiO2 \uc0b0\ud654\ub9c9\uc774 \ucd94\uac00\ub418\uba70 \uc808\uc5f0\uacfc \ud45c\uba74 \ubcf4\ud638\uc758 \uae30\ubcf8 \ubc14\ud0d5\uc774 \ub9cc\ub4e4\uc5b4\uc9d1\ub2c8\ub2e4.",
    purpose: [
      "\uc808\uc5f0\ub9c9\uc744 \ub9cc\ub4e4\uc5b4 \uc774\ud6c4 \ud328\ud134 \ud615\uc131\uc758 \uae30\uc900 \uba74\uc744 \uc900\ube44\ud569\ub2c8\ub2e4.",
      "\uc6e8\uc774\ud37c \ud45c\uba74\uc744 \ubcf4\ud638\ud574 \uacf5\uc815 \uc548\uc815\uc131\uacfc \uc18c\uc790 \ud2b9\uc131\uc744 \ub192\uc785\ub2c8\ub2e4.",
    ],
    structure: [
      "\ud45c\uba74\uc5d0 \uc5c6\ub358 oxide layer\uac00 \uade0\uc77c\ud558\uac8c \uc0dd\uc131\ub429\ub2c8\ub2e4.",
      "\uae30\uc874 silicon substrate \uc704\uc5d0 \uc0c8 \uce35\uc774 \ucd94\uac00\ub418\ub294 \uac00\uc7a5 \uae30\ubcf8\uc801\uc778 '\ucd94\uac00' \ubcc0\ud654\uc785\ub2c8\ub2e4.",
    ],
    equipment: ["Furnace, oxidation tube", "O2, H2O \ud750\ub984 \uc81c\uc5b4 \uc2dc\uc2a4\ud15c"],
    keypoints: [
      "\uba74\uc811\uc5d0\uc11c\ub294 \uc65c oxide\uac00 \uc808\uc5f0/\ubcf4\ud638\uc5d0 \uc911\uc694\ud55c\uc9c0 \uc124\uba85\ud560 \uc218 \uc788\uc5b4\uc57c \ud569\ub2c8\ub2e4.",
      "\ud604\uc5c5\uc5d0\uc11c\ub294 \ub450\uaed8 \uade0\uc77c\ub3c4\uc640 \uc628\ub3c4 \uc81c\uc5b4\uac00 \ud575\uc2ec\uc785\ub2c8\ub2e4.",
    ],
    svg: `
      <svg class="wafer-svg-large" viewBox="0 0 760 480" role="img" aria-label="Oxidation wafer cross-section">
        <rect class="svg-board" x="16" y="16" width="728" height="448" rx="28" />
        <rect class="svg-label-box" x="36" y="34" width="178" height="38" rx="12" />
        <text class="svg-label" x="125" y="59" text-anchor="middle">Oxidation</text>
        <rect class="svg-substrate" x="90" y="274" width="580" height="118" rx="12" />
        <rect class="svg-oxide" x="90" y="228" width="580" height="34" rx="8" />
        <rect class="svg-machine" x="120" y="118" width="520" height="44" rx="16" />
        <text class="svg-small-label" x="380" y="145" text-anchor="middle">thermal oxidation environment</text>
        <path class="svg-arrow" d="M200 174 V216 M200 216 L190 202 M200 216 L210 202" />
        <path class="svg-arrow" d="M380 174 V216 M380 216 L370 202 M380 216 L390 202" />
        <path class="svg-arrow" d="M560 174 V216 M560 216 L550 202 M560 216 L570 202" />
        <rect class="svg-label-box" x="514" y="182" width="146" height="34" rx="12" />
        <text class="svg-caption" x="587" y="204" text-anchor="middle">oxide added</text>
        <rect class="svg-label-box" x="102" y="334" width="168" height="36" rx="12" />
        <text class="svg-caption" x="186" y="357" text-anchor="middle">silicon substrate</text>
      </svg>`,
  },
  "proc-lithography": {
    title: "Lithography",
    change: "PR \ud328\ud134 \ud615\uc131",
    summary:
      "\uc0b0\ud654\ub9c9 \uc704\uc5d0 photoresist\ub97c \uc62c\ub9ac\uace0, \ub178\uad11/\ud604\uc0c1 \ud6c4 \uc5f4\ub9b0 \ucc3d(open window)\ub9cc \ub0a8\uaca8 \ub2e4\uc74c \uacf5\uc815\uc774 \ub4e4\uc5b4\uac08 \uc790\ub9ac\ub97c \uc815\ud569\ub2c8\ub2e4.",
    purpose: [
      "\uc5b4\ub5a4 \uc601\uc5ed\uc744 \ub0a8\uae30\uace0 \uc5b4\ub5a4 \uc601\uc5ed\uc744 \uc5f4\uc5b4\uc904\uc9c0 \uacb0\uc815\ud558\ub294 \ud328\ud134 \uc124\uc815 \uacf5\uc815\uc785\ub2c8\ub2e4.",
      "\ub4a4\uc774\uc740 \uc2dd\uac01, \uc8fc\uc785, \uc99d\ucc29\uc774 '\uc5b4\ub514\uc5d0 \uc791\uc6a9\ud560\uc9c0'\ub97c \uc815\ud558\ub294 \uae30\uc900\uc774 \ub429\ub2c8\ub2e4.",
    ],
    structure: [
      "Before\uc5d0\ub294 \uade0\uc77c \ub9c9\ub9cc \uc788\uc9c0\ub9cc, After\uc5d0\ub294 resist \uc704\uc5d0 \uc120\ud0dd \uc601\uc5ed \ucc3d\uc774 \uc0dd\uae41\ub2c8\ub2e4.",
      "'\ub9c9 \ucd94\uac00' \uc790\uccb4\ubcf4\ub2e4 '\uc5b4\ub514\ub97c \uc5f4\uc5b4\ub450\ub290\ub0d0'\uac00 \ud575\uc2ec \ubcc0\ud654\uc785\ub2c8\ub2e4.",
    ],
    equipment: ["Track, scanner, coater/developer", "Mask/reticle, photoresist"],
    keypoints: [
      "CD, overlay, focus, dose \ud0a4\uc6cc\ub4dc\ub97c \ud568\uaed8 \ub9d0\ud558\uba74 \uba74\uc811\uc5d0\uc11c \uac15\ud569\ub2c8\ub2e4.",
      "\ub178\uad11 \ud6c4 '\uc6d0\ud558\ub294 \uc601\uc5ed\ub9cc \uc5f4\ub9b0\ub2e4'\ub294 \uac1c\ub150\uc744 \ubd84\uba85\ud788 \uc124\uba85\ud558\ub294 \uac8c \uc911\uc694\ud569\ub2c8\ub2e4.",
    ],
    svg: `
      <svg class="wafer-svg-large" viewBox="0 0 760 480" role="img" aria-label="Lithography before and after cross-section">
        <rect class="svg-board" x="16" y="16" width="728" height="448" rx="28" />
        <rect class="svg-label-box" x="42" y="34" width="184" height="38" rx="12" />
        <text class="svg-label" x="134" y="59" text-anchor="middle">Lithography</text>
        <text class="svg-small-label" x="210" y="112" text-anchor="middle">Before</text>
        <text class="svg-small-label" x="554" y="112" text-anchor="middle">After</text>
        <line class="svg-outline-line" x1="380" y1="92" x2="380" y2="404" />
        <rect class="svg-substrate" x="66" y="286" width="254" height="100" rx="10" />
        <rect class="svg-oxide" x="66" y="248" width="254" height="28" rx="8" />
        <rect class="svg-resist" x="66" y="204" width="254" height="32" rx="8" />
        <rect class="svg-substrate" x="440" y="286" width="254" height="100" rx="10" />
        <rect class="svg-oxide" x="440" y="248" width="254" height="28" rx="8" />
        <path class="svg-resist" d="M440 204 H500 V238 H540 V204 H594 V238 H632 V204 H694 V238 H440 Z" />
        <rect class="svg-label-box" x="486" y="162" width="160" height="30" rx="10" />
        <text class="svg-caption" x="566" y="182" text-anchor="middle">PR with open windows</text>
        <path class="svg-arrow" d="M566 192 V236 M566 236 L556 222 M566 236 L576 222" />
      </svg>`,
  },
  "proc-etching": {
    title: "Etching",
    change: "\uc120\ud0dd \uc601\uc5ed \uc81c\uac70",
    summary:
      "\uc5f4\ub824 \uc788\ub294 \ucc3d \ubd80\ubd84\ub9cc \uc544\ub798\uce35\uc774 \uc2dd\uac01\ub418\uc5b4 trench\uac00 \uc0dd\uae30\uace0, \ub2eb\ud78c \uc601\uc5ed\uc740 \uadf8\ub300\ub85c \ubcf4\ud638\ub429\ub2c8\ub2e4.",
    purpose: [
      "\ud328\ud134\uc774 \ud544\uc694\ud55c \ubd80\ubd84\ub9cc \uc120\ud0dd\uc801\uc73c\ub85c \uc81c\uac70\ud574 \uc2e4\uc81c \uad6c\uc870\ub97c \ub9cc\ub4ed\ub2c8\ub2e4.",
      "\ud3ec\ud1a0\uac00 '\ub514\uc790\uc778 \ub9c8\uc2a4\ud06c'\ub77c\uba74, \uc2dd\uac01\uc740 \uadf8 \ub9c8\uc2a4\ud06c\ub97c \uc2e4\uc81c \uc9c0\ud615\uc73c\ub85c \ubc14\uafb8\ub294 \uacfc\uc815\uc785\ub2c8\ub2e4.",
    ],
    structure: [
      "Before\uc5d0\ub294 \ucc3d\ub9cc \uc788\uc9c0\ub9cc, After\uc5d0\ub294 \uadf8 \ucc3d \uc544\ub798\ub85c trench\uac00 \ud30c\uc774 \uc2e4\uc81c \ub2e8\ucc28\uac00 \uc0dd\uae41\ub2c8\ub2e4.",
      "\uc5ec\uae30\uc11c\ub294 '\ubb34\uc5c7\uc774 \uc81c\uac70\ub418\uc5c8\ub294\uc9c0'\uac00 \uadf8\ub9bc \uc911\uc2ec\uc73c\ub85c \ubcf4\uc774\ub3c4\ub85d \uc124\uacc4\ub418\uc5c8\uc2b5\ub2c8\ub2e4.",
    ],
    equipment: ["Dry etcher, wet bench", "CF4, Cl2, BCl3 \uacc4\uc5f4 \uac00\uc2a4"],
    keypoints: [
      "\uc120\ud0dd\ube44(selectivity)\uc640 \uc774\ubc29\uc131(anisotropy)\uc744 \uad6c\ubd84\ud574 \ub9d0\ud560 \uc218 \uc788\uc5b4\uc57c \ud569\ub2c8\ub2e4.",
      "\uadf8\ub9bc\uc5d0\uc11c\ub294 \uc5f4\ub9b0 \ucc3d \uc544\ub798\ub9cc \uc81c\uac70\ub41c\ub2e4\ub294 \uc810\uc744 \ud55c\ub208\uc5d0 \ubcf4\uc5ec\uc8fc\ub294 \uac8c \ud575\uc2ec\uc785\ub2c8\ub2e4.",
    ],
    svg: `
      <svg class="wafer-svg-large" viewBox="0 0 760 480" role="img" aria-label="Etching before and after cross-section">
        <rect class="svg-board" x="16" y="16" width="728" height="448" rx="28" />
        <rect class="svg-label-box" x="42" y="34" width="154" height="38" rx="12" />
        <text class="svg-label" x="119" y="59" text-anchor="middle">Etching</text>
        <text class="svg-small-label" x="210" y="112" text-anchor="middle">Before</text>
        <text class="svg-small-label" x="554" y="112" text-anchor="middle">After</text>
        <line class="svg-outline-line" x1="380" y1="92" x2="380" y2="404" />
        <rect class="svg-substrate" x="66" y="286" width="254" height="100" rx="10" />
        <rect class="svg-oxide" x="66" y="248" width="254" height="28" rx="8" />
        <path class="svg-resist" d="M66 204 H126 V238 H166 V204 H220 V238 H258 V204 H320 V238 H66 Z" />
        <rect class="svg-substrate" x="440" y="286" width="254" height="100" rx="10" />
        <path class="svg-oxide" d="M440 248 H510 V286 H562 V248 H694 V276 H592 V386 H534 V276 H440 Z" />
        <path class="svg-resist" d="M440 204 H500 V238 H540 V204 H594 V238 H632 V204 H694 V238 H440 Z" />
        <line class="svg-trench-line" x1="562" y1="184" x2="562" y2="382" />
        <rect class="svg-label-box" x="488" y="154" width="146" height="30" rx="10" />
        <text class="svg-caption" x="561" y="174" text-anchor="middle">selected area removed</text>
      </svg>`,
  },
  "proc-deposition": {
    title: "Deposition",
    change: "\ubc15\ub9c9 \uc99d\ucc29",
    summary:
      "\uae30\uc874 \uad6c\uc870 \uc704\ub97c \ub530\ub77c \uc0c8\ub85c\uc6b4 \ubc15\ub9c9\uc774 \ub36e\uc774\uba74\uc11c, \ud45c\uba74\uacfc \ub2e8\ucc28 \ubd80\ubd84 \ubaa8\ub450\uc5d0 \uc7ac\ub8cc\uac00 \ucd94\uac00\ub429\ub2c8\ub2e4.",
    purpose: [
      "\uc808\uc5f0\ub9c9, \ub3c4\uc804\ub9c9, barrier\ub9c9 \uac19\uc740 \uc0c8 \uc7ac\ub8cc\uce35\uc744 \ud615\uc131\ud569\ub2c8\ub2e4.",
      "\uc774\ud6c4 \ubc30\uc120, \uc808\uc5f0, \uc804\uae30\uc801 \ud2b9\uc131 \uc81c\uc5b4\ub97c \uc704\ud55c \ubc14\ud0d5 \uce35\uc744 \ub9cc\ub4ed\ub2c8\ub2e4.",
    ],
    structure: [
      "\uc2dd\uac01\uc73c\ub85c \uc0dd\uae34 \ub2e8\ucc28 \uc704\ub97c \ud3ec\ud568\ud574 \uc804\uccb4 \ud45c\uba74\uc744 \ub530\ub77c \ub9c9\uc774 \ucd94\uac00\ub429\ub2c8\ub2e4.",
      "'\ube44\uc5b4 \uc788\ub358 \uad6c\uc870 \uc704\ub97c \ub2e4\uc2dc \ub36e\ub294\uc2e4'\ub294 \ubcc0\ud654\uac00 \ud55c\ub208\uc5d0 \ubcf4\uc774\ub3c4\ub85d \uad6c\uc131\ud588\uc2b5\ub2c8\ub2e4.",
    ],
    equipment: ["CVD, ALD, PVD", "SiH4, NH3, TEOS, TiN, W \ub4f1"],
    keypoints: [
      "\ub450\uaed8, \uade0\uc77c\ub3c4, \ub9c9\uc9c8, conformality\ub97c \ud568\uaed8 \uc124\uba85\ud558\uba74 \uc88b\uc2b5\ub2c8\ub2e4.",
      "\ub2e8\ucc28\uc5d0 \ub530\ub77c \ub9c9\uc774 \uc5bc\ub9c8\ub098 \uc798 \ub4a4\ub36e\ub294\uc9c0\uac00 \ud604\uc5c5\uc5d0\uc11c \uc911\uc694\ud569\ub2c8\ub2e4.",
    ],
    svg: `
      <svg class="wafer-svg-large" viewBox="0 0 760 480" role="img" aria-label="Deposition cross-section">
        <rect class="svg-board" x="16" y="16" width="728" height="448" rx="28" />
        <rect class="svg-label-box" x="42" y="34" width="184" height="38" rx="12" />
        <text class="svg-label" x="134" y="59" text-anchor="middle">Deposition</text>
        <rect class="svg-substrate" x="96" y="286" width="568" height="100" rx="12" />
        <path class="svg-outline-line" d="M96 248 H250 V286 H334 V248 H664" />
        <path class="svg-film" d="M96 222 H242 V264 H344 V222 H664 V252 H380 V386 H282 V252 H96 Z" />
        <rect class="svg-label-box" x="506" y="118" width="174" height="34" rx="12" />
        <text class="svg-caption" x="593" y="140" text-anchor="middle">new film covers whole topography</text>
        <path class="svg-arrow" d="M593 154 V210 M593 210 L583 196 M593 210 L603 196" />
        <rect class="svg-machine" x="126" y="128" width="216" height="42" rx="14" />
        <text class="svg-small-label" x="234" y="154" text-anchor="middle">gas / precursor in</text>
      </svg>`,
  },
  "proc-implantation": {
    title: "Ion Implantation",
    change: "\ub3c4\ud551 \uc8fc\uc785",
    summary:
      "\uc774\uc628 \ube54\uc774 \ud2b9\uc815 \uc601\uc5ed\uc73c\ub85c \ub4e4\uc5b4\uac00 wafer \ub0b4\ubd80 \ub18d\ub3c4\ub97c \ubc14\uafb8\uba70, \uc804\uae30\uc801 \ud2b9\uc131\uc774 \uc870\uc808\ub429\ub2c8\ub2e4.",
    purpose: [
      "\uc6d0\ud558\ub294 \uc601\uc5ed\uc5d0 \ub9cc \ub3c4\ud551 \ub18d\ub3c4\ub97c \uc815\ubc00\ud558\uac8c \ubd80\uc5ec\ud569\ub2c8\ub2e4.",
      "P-type / N-type \ud2b9\uc131\uacfc junction \ud615\uc131\uc5d0 \ud544\uc218\uc801\uc778 \uacf5\uc815\uc785\ub2c8\ub2e4.",
    ],
    structure: [
      "\ud45c\uba74 \uc704\uc5d0\uc11c \uc774\uc628\uc774 \uc544\ub798\ub85c \ub4e4\uc5b4\uac00 \ud2b9\uc815 \uae4a\uc774\uc5d0 \ubd84\ud3ec\ud569\ub2c8\ub2e4.",
      "\ud45c\uba74 \ub9c9 \ubaa8\uc591 \ubcc0\ud654\ubcf4\ub2e4 '\ub0b4\ubd80 \uc131\ubd84 \ubd84\ud3ec'\uac00 \ubc14\ub00c\ub294 \uacf5\uc815\uc774\ub77c\ub294 \uc810\uc744 \uac15\uc870\ud588\uc2b5\ub2c8\ub2e4.",
    ],
    equipment: ["Ion implanter", "Mass filter, beamline, end station"],
    keypoints: [
      "dose, energy, tilt, anneal\uc744 \ud568\uaed8 \uc5f0\uacb0\ud574 \ub9d0\ud560 \uc218 \uc788\uc5b4\uc57c \ud569\ub2c8\ub2e4.",
      "\uadf8\ub9bc\uc5d0\uc11c\ub294 '\uc5b4\ub514\uc5d0 \ub4e4\uc5b4\uac00\ub294\uc9c0'\uac00 \ubcf4\uc774\ub294 \uac83\uc774 \ud575\uc2ec\uc785\ub2c8\ub2e4.",
    ],
    svg: `
      <svg class="wafer-svg-large" viewBox="0 0 760 480" role="img" aria-label="Ion implantation cross-section">
        <rect class="svg-board" x="16" y="16" width="728" height="448" rx="28" />
        <rect class="svg-label-box" x="42" y="34" width="232" height="38" rx="12" />
        <text class="svg-label" x="158" y="59" text-anchor="middle">Ion Implantation</text>
        <rect class="svg-substrate" x="100" y="264" width="560" height="126" rx="12" />
        <rect class="svg-oxide" x="100" y="224" width="560" height="28" rx="8" />
        <rect class="svg-resist" x="226" y="178" width="308" height="26" rx="8" />
        <path class="svg-arrow" d="M280 98 V210 M280 210 L268 194 M280 210 L292 194" />
        <path class="svg-arrow" d="M380 98 V210 M380 210 L368 194 M380 210 L392 194" />
        <path class="svg-arrow" d="M480 98 V210 M480 210 L468 194 M480 210 L492 194" />
        <circle class="svg-ion" cx="262" cy="300" r="7" />
        <circle class="svg-ion" cx="292" cy="318" r="7" />
        <circle class="svg-ion" cx="334" cy="306" r="7" />
        <circle class="svg-ion" cx="380" cy="324" r="7" />
        <circle class="svg-ion" cx="424" cy="308" r="7" />
        <circle class="svg-ion" cx="468" cy="320" r="7" />
        <circle class="svg-ion" cx="506" cy="302" r="7" />
        <rect class="svg-label-box" x="512" y="104" width="132" height="32" rx="12" />
        <text class="svg-caption" x="578" y="124" text-anchor="middle">ion beam in</text>
      </svg>`,
  },
  "proc-cmp": {
    title: "CMP",
    change: "\ud45c\uba74 \ud3c9\ud0c4\ud654",
    summary:
      "\uc6b8\ud241\ubd88\ud241\ud55c \ud45c\uba74\uc744 \uc5f0\ub9c8\ud574 \ud3c9\ud0c4\ud558\uac8c \ub9cc\ub4e4\uba70, \ub2e4\uc74c \uacf5\uc815\uc5d0\uc11c \uc815\ub82c\uacfc \ub9c9 \ud615\uc131\uc774 \uc548\uc815\uc801\uc73c\ub85c \uc774\ub8e8\uc5b4\uc9c0\uac8c \ud569\ub2c8\ub2e4.",
    purpose: [
      "\ub2e8\ucc28\ub97c \uc904\uc5ec \ub2e4\uc74c \ub178\uad11, \uc99d\ucc29, \ubc30\uc120 \uacf5\uc815\uc758 \uc815\ubc00\ub3c4\ub97c \uc9c0\ud0b5\ub2c8\ub2e4.",
      "\uc801\uce35\uc774 \ub298\uc5b4\ub0a0\uc218\ub85d \ud45c\uba74 \ud3c9\ud0c4\ud654\uac00 \uc218\uc728\uacfc \uc9c1\uc811 \uc5f0\uacb0\ub429\ub2c8\ub2e4.",
    ],
    structure: [
      "Before\uc5d0\uc11c\ub294 \ud45c\uba74\uc774 \uc694\ucca0\ud558\uc9c0\ub9cc, After\uc5d0\uc11c\ub294 \ud3c9\ud3c9\ud55c \uba74\uc73c\ub85c \ub9de\ucdb0\uc9d1\ub2c8\ub2e4.",
      "\uc774 \uacf5\uc815\uc740 '\uc0c8 \uce35 \ucd94\uac00'\uac00 \uc544\ub2c8\ub77c '\ub192\ub0ae\uc774 \ucc28\uc774 \uc81c\uac70'\ub77c\ub294 \uc810\uc744 \ubd84\uba85\ud788 \ubcf4\uc5ec\uc90d\ub2c8\ub2e4.",
    ],
    equipment: ["CMP tool, pad conditioner", "Slurry, pad, DI water"],
    keypoints: [
      "removal rate, dishing, erosion, scratch \ud3ec\uc778\ud2b8\ub97c \ud568\uaed8 \ub9d0\ud558\uba74 \uc88b\uc2b5\ub2c8\ub2e4.",
      "why CMP? \uc9c8\ubb38\uc5d0 \ub300\ud574 '\ub2e4\uc74c \uacf5\uc815 \uc815\ubc00\ub3c4 \ud655\ubcf4'\ub97c \ubc18\ub4dc\uc2dc \uc5f0\uacb0\ud574\uc57c \ud569\ub2c8\ub2e4.",
    ],
    svg: `
      <svg class="wafer-svg-large" viewBox="0 0 760 480" role="img" aria-label="CMP before and after cross-section">
        <rect class="svg-board" x="16" y="16" width="728" height="448" rx="28" />
        <rect class="svg-label-box" x="42" y="34" width="108" height="38" rx="12" />
        <text class="svg-label" x="96" y="59" text-anchor="middle">CMP</text>
        <text class="svg-small-label" x="210" y="112" text-anchor="middle">Before</text>
        <text class="svg-small-label" x="554" y="112" text-anchor="middle">After</text>
        <line class="svg-outline-line" x1="380" y1="92" x2="380" y2="404" />
        <rect class="svg-substrate" x="66" y="296" width="254" height="90" rx="10" />
        <path class="svg-surface-before" d="M66 256 C106 228, 148 286, 190 254 S266 222, 320 248" />
        <rect class="svg-machine" x="78" y="168" width="230" height="28" rx="12" />
        <text class="svg-small-label" x="194" y="186" text-anchor="middle">CMP pad</text>
        <rect class="svg-substrate" x="440" y="296" width="254" height="90" rx="10" />
        <line class="svg-surface-after" x1="440" y1="244" x2="694" y2="244" />
        <rect class="svg-machine" x="454" y="168" width="226" height="28" rx="12" />
        <text class="svg-small-label" x="567" y="186" text-anchor="middle">pad + slurry</text>
        <rect class="svg-label-box" x="480" y="210" width="176" height="30" rx="10" />
        <text class="svg-caption" x="568" y="230" text-anchor="middle">surface becomes planar</text>
      </svg>`,
  },
  "proc-metallization": {
    title: "Metallization",
    change: "\uae08\uc18d \ubc30\uc120 \ud615\uc131",
    summary:
      "\uc808\uc5f0\uce35 \uc704\uc5d0 \uae08\uc18d \ubc30\uc120\uacfc via\uac00 \ud615\uc131\ub418\uba74\uc11c \uc18c\uc790\uc640 \uc18c\uc790 \uc0ac\uc774 \uc804\uae30\uc801 \uc5f0\uacb0\uc774 \uc644\uc131\ub429\ub2c8\ub2e4.",
    purpose: [
      "\uac1c\ubcc4 \uc18c\uc790\ub97c \uc11c\ub85c \uc5f0\uacb0\ud574 \ud68c\ub85c\ub85c \ub3d9\uc791\ud558\uac8c \ub9cc\ub4ed\ub2c8\ub2e4.",
      "\ub2e8\uc21c \ub9c9 \ud615\uc131\uc774 \uc544\ub2c8\ub77c '\uc2e0\ud638 \uacbd\ub85c \uc124\uacc4'\uac00 \ubcf4\uc774\uae30 \uc2dc\uc791\ud558\ub294 \ub2e8\uacc4\uc785\ub2c8\ub2e4.",
    ],
    structure: [
      "\uae08\uc18d line\uacfc vertical via\uac00 \uc5f0\uacb0\ub418\uc5b4 \uc704/\uc544\ub798 \uce35 \uc0ac\uc774\uc758 \uacbd\ub85c\uac00 \uc0dd\uae41\ub2c8\ub2e4.",
      "\uadf8\ub9bc\uc5d0\uc11c\ub294 '\ub9c9 \ucd94\uac00' \ubcf4\ub2e4 '\uc804\uae30 \uc5f0\uacb0 \uad6c\uc870 \ud615\uc131'\uc774 \ud575\uc2ec\uc73c\ub85c \ubcf4\uc774\ub3c4\ub85d \ud588\uc2b5\ub2c8\ub2e4.",
    ],
    equipment: ["PVD, electroplating, CVD", "Cu, Al, barrier metal"],
    keypoints: [
      "\uc800\ud56d, electromigration, contact integrity\uac00 \uba74\uc811 \ud0a4\uc6cc\ub4dc\uc785\ub2c8\ub2e4.",
      "\ubc30\uc120\uc774 \uc5ec\ub7ec \uce35\uc73c\ub85c \ub20c\uc5b4\uc9c0\ub294\ub370 via \uc5f0\uacb0\uc774 \uc911\uc694\ud558\ub2e4\ub294 \uc810\uc744 \ub9d0\ud560 \uc218 \uc788\uc5b4\uc57c \ud569\ub2c8\ub2e4.",
    ],
    svg: `
      <svg class="wafer-svg-large" viewBox="0 0 760 480" role="img" aria-label="Metallization cross-section">
        <rect class="svg-board" x="16" y="16" width="728" height="448" rx="28" />
        <rect class="svg-label-box" x="42" y="34" width="206" height="38" rx="12" />
        <text class="svg-label" x="145" y="59" text-anchor="middle">Metallization</text>
        <rect class="svg-substrate" x="92" y="316" width="576" height="76" rx="10" />
        <rect class="svg-film" x="92" y="270" width="576" height="34" rx="8" />
        <path class="svg-metal" d="M122 290 H250 V244 H312 V290 H650" />
        <path class="svg-metal" d="M144 352 H354 V314 H420 V352 H610" />
        <rect class="svg-via" x="302" y="290" width="18" height="32" rx="4" />
        <rect class="svg-via" x="410" y="290" width="18" height="32" rx="4" />
        <rect class="svg-label-box" x="472" y="150" width="174" height="32" rx="12" />
        <text class="svg-caption" x="559" y="170" text-anchor="middle">metal lines + vias connect</text>
        <path class="svg-arrow" d="M558 186 V236 M558 236 L548 222 M558 236 L568 222" />
      </svg>`,
  },
  "proc-packaging": {
    title: "Test & Packaging",
    change: "\ud328\ud0a4\uc9c0 \uc5f0\uacb0",
    summary:
      "\uce69\uc774 \ud328\ud0a4\uc9c0 \ubab8\uccb4, \ubc94\ud504, \uae30\ud310, \uc678\ubd80 \uc5f0\uacb0\uad6c\uc870\uc640 \uacb0\ud569\ub418\uba70 \uc2e4\uc81c \uc81c\ud488 \ud615\ud0dc\ub85c \ub098\uac00\uac8c \ub429\ub2c8\ub2e4.",
    purpose: [
      "\uce69\uc744 \ubcf4\ud638\ud558\uace0 \uc2dc\uc2a4\ud15c \ubcf4\ub4dc\uc640 \uc804\uae30\uc801\uc73c\ub85c \uc5f0\uacb0\ud569\ub2c8\ub2e4.",
      "\ud14c\uc2a4\ud2b8\ub97c \ud1b5\ud574 \uc591\ubd88 \ud310\uc815\uc744 \ud558\uace0 \ucd9c\ud558 \uac00\ub2a5\ud55c \ud615\ud0dc\ub85c \ub9c8\ubb34\ub9ac\ud569\ub2c8\ub2e4.",
    ],
    structure: [
      "\uc6e8\uc774\ud37c \ub2e8\uba74 \uad6c\uc870\uac00 \ud328\ud0a4\uc9c0 \ubab8\uccb4, bumps, substrate\uc640 \ud568\uaed8 \uc678\ubd80 \uc2dc\uc2a4\ud15c \uc5f0\uacb0 \uad6c\uc870\ub85c \ud655\uc7a5\ub429\ub2c8\ub2e4.",
      "\uc774 \ub2e8\uacc4\uc5d0\uc11c\ub294 '\ud68c\ub85c \uc81c\uc791' \ubaa8\uc2b5 \ubcf4\ub2e4 '\uc81c\ud488 \ud615\ud0dc\ub85c \ub098\uac10'\uc774 \ud575\uc2ec \ubcc0\ud654\uc785\ub2c8\ub2e4.",
    ],
    equipment: ["Probe station, tester, bonder, molding", "Substrate, solder bump, mold compound"],
    keypoints: [
      "\uc218\uc728, \uc5f4 \uad00\ub9ac, \uc2e0\ud638 \ubb34\uacb0\uc131\uc744 \ud328\ud0a4\uc9d5 \ud3ec\uc778\ud2b8\ub85c \uc5f0\uacb0\ud558\uba74 \uc88b\uc2b5\ub2c8\ub2e4.",
      "why package matters? \uc9c8\ubb38\uc5d0 \ub300\ud574 '\ubcf4\ud638 + \uc5f0\uacb0 + \uc5f4 \ubc29\ucd9c'\uc744 \ud568\uaed8 \ub9d0\ud560 \uc218 \uc788\uc5b4\uc57c \ud569\ub2c8\ub2e4.",
    ],
    svg: `
      <svg class="wafer-svg-large" viewBox="0 0 760 480" role="img" aria-label="Test and packaging cross-section">
        <rect class="svg-board" x="16" y="16" width="728" height="448" rx="28" />
        <rect class="svg-label-box" x="42" y="34" width="236" height="38" rx="12" />
        <text class="svg-label" x="160" y="59" text-anchor="middle">Test &amp; Packaging</text>
        <rect class="svg-pad" x="182" y="138" width="396" height="84" rx="16" />
        <rect class="svg-resist" x="308" y="168" width="144" height="28" rx="8" />
        <circle class="svg-bump" cx="266" cy="240" r="16" />
        <circle class="svg-bump" cx="330" cy="240" r="16" />
        <circle class="svg-bump" cx="394" cy="240" r="16" />
        <circle class="svg-bump" cx="458" cy="240" r="16" />
        <circle class="svg-bump" cx="522" cy="240" r="16" />
        <rect class="svg-substrate" x="154" y="274" width="452" height="68" rx="12" />
        <line class="svg-surface-after" x1="212" y1="342" x2="172" y2="396" />
        <line class="svg-surface-after" x1="548" y1="342" x2="588" y2="396" />
        <rect class="svg-label-box" x="512" y="102" width="154" height="30" rx="10" />
        <text class="svg-caption" x="589" y="122" text-anchor="middle">package body</text>
        <rect class="svg-label-box" x="550" y="286" width="118" height="30" rx="10" />
        <text class="svg-caption" x="609" y="306" text-anchor="middle">substrate</text>
      </svg>`,
  },
};

function renderProcessList(target, items) {
  if (!target) return;
  target.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    target.appendChild(li);
  });
}

function renderProcessVisualization(step) {
  const panelId = step?.dataset.targetPanel;
  const stepIndex = step?.dataset.stepIndex || "1";
  const content = panelId ? processVisualizationData[panelId] : null;
  if (!content) return;

  if (processVisualStep) processVisualStep.textContent = `Step ${stepIndex}`;
  if (processVisualTitle) processVisualTitle.textContent = content.title;
  if (processVisualChange) processVisualChange.textContent = content.change;
  if (processVisualSummary) processVisualSummary.textContent = content.summary;
  if (processVisualSvg) processVisualSvg.innerHTML = content.svg;

  renderProcessList(processPurposeList, content.purpose);
  renderProcessList(processChangeList, content.structure);
  renderProcessList(processEquipmentList, content.equipment);
  renderProcessList(processKeypointList, content.keypoints);
}

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
  renderProcessVisualization(step);
}

function highlightProcessDetail(panelId) {
  document.querySelectorAll(".process-grid .accordion-card").forEach((card) => {
    const trigger = card.querySelector(".accordion-trigger");
    const isLinked = trigger?.dataset.target === panelId;
    card.classList.toggle("is-linked", Boolean(isLinked));
  });
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
    if (panelId) highlightProcessDetail(panelId);

    if (panel && trigger) {
      openPanel(panel, trigger);
      trigger.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
});

document.querySelectorAll(".process-grid .accordion-trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const panelId = trigger.dataset.target;
    const matchingStep = document.querySelector(`.process-flow-step[data-target-panel="${panelId}"]`);
    if (matchingStep) setActiveProcessStep(matchingStep);
    if (panelId) highlightProcessDetail(panelId);
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
  const firstPanelId = processFlowSteps[0].dataset.targetPanel;
  if (firstPanelId) highlightProcessDetail(firstPanelId);
}

updateProgressUI();
applySearch();
