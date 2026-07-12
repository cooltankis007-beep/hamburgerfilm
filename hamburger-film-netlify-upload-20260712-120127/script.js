const translations = {
  ko: {
    navAbout: "회사소개",
    navService: "서비스",
    navWork: "해왔던 일",
    navShowreel: "쇼릴",
    navContact: "문의",
    heroKicker: "Since 2000 / Production Service & Support",
    heroTitle: "CONQUER THE WORLD<br />ANYWHERE WISH TO SHOT",
    heroCopy: "전 세계 어디서든 영화, 드라마, 광고, OTT 콘텐츠를 위한 글로벌 프로덕션 서비스와 현장 운영을 지원합니다.",
    watchShowreel: "쇼릴 보기",
    downloadPdf: "PDF 자료 다운로드",
    promiseTitle: "korea to world / world to korea",
    promiseCopy: "한국에서 세계로, 세계에서 한국으로 연결되는 글로벌 프로덕션 서비스.",
    aboutEyebrow: "About",
    aboutTitle: "63개국 현장 경험을 가진 글로벌 프로덕션 파트너",
    aboutCopy1: "Hamburger Pictures는 지난 30년간 전 세계 63개국에서 프로덕션 서비스를 제공해 온 글로벌 프로덕션 컴퍼니입니다. 영화, 광고, OTT 콘텐츠, TV 드라마, 뮤직비디오, 스틸 촬영까지 프로젝트의 규모와 목적에 맞춘 맞춤형 솔루션을 제공합니다.",
    aboutCopy2: "기획, 프리프로덕션, 촬영, 포스트프로덕션까지 제작 전 과정을 통합적으로 지원하며, 숙련된 크루와 장비, 로케이션 네트워크를 기반으로 효율적이고 비용 경쟁력 있는 제작 환경을 구축합니다.",
    statYears: "제작 경험",
    statCountries: "진행 국가",
    statSupport: "글로벌 지원",
    serviceEyebrow: "Where & What",
    serviceTitle: "프로젝트가 향하는 곳 어디든 연결하는 글로벌 프로덕션 서비스",
    locationsTitle: "Locations",
    locationsCopy: "아시아, 미주, 유럽, 오세아니아, 아프리카 등 프로젝트가 향하는 전 세계 지역의 로케이션, 현지 네트워크, 촬영 허가를 연결합니다.",
    crewTitle: "Crew & Equipment",
    crewCopy: "카메라, 조명, 그립, 미술팀을 포함한 현지 제작팀과 장비, 합리적인 인근 국가의 제작 리소스, 포스트프로덕션 인력을 지원합니다.",
    talentTitle: "Models & Talent",
    talentCopy: "엑스트라, 배우, 모델, 탤런트 등 프로젝트 톤과 예산에 맞춘 캐스팅을 준비합니다.",
    logisticsTitle: "Logistics",
    logisticsCopy: "프로덕션 호텔, 차량, 이동, 현장 식사와 케이터링까지 촬영이 굴러가는 모든 운영을 세밀하게 지원합니다.",
    workEyebrow: "Selected Work",
    workTitle: "해왔던 일",
    showreelEyebrow: "Showreel",
    showreelTitle: "Hamburger Pictures Reel",
    contactEyebrow: "Contact",
    contactTitle: "문의",
    footerCopy: "Production Service & Support Company"
  },
  en: {
    navAbout: "About",
    navService: "Service",
    navWork: "Work",
    navShowreel: "Showreel",
    navContact: "Contact",
    heroKicker: "Since 2000 / Production Service & Support",
    heroTitle: "CONQUER THE WORLD<br />ANYWHERE WISH TO SHOT",
    heroCopy: "We support global production services and on-site operations for films, dramas, commercials, and OTT content anywhere in the world.",
    watchShowreel: "Watch Showreel",
    downloadPdf: "Download PDF",
    promiseTitle: "korea to world / world to korea",
    promiseCopy: "Global Production Service & Support, connecting Korea and the world.",
    aboutEyebrow: "About",
    aboutTitle: "A global production partner with field experience across 63 countries",
    aboutCopy1: "Hamburger Pictures is a global production company with over 30 years of experience providing production services in 63 countries worldwide. We deliver tailored solutions for feature films, commercials, OTT content, TV dramas, music videos, and still photography.",
    aboutCopy2: "From planning and pre-production to filming and post-production, we provide integrated support backed by experienced crews, equipment, location networks, and cost-efficient production management.",
    statYears: "Years Experience",
    statCountries: "Countries",
    statSupport: "Global Support",
    serviceEyebrow: "Where & What",
    serviceTitle: "Global production service, anywhere your project takes you",
    locationsTitle: "Locations",
    locationsCopy: "We connect locations, local networks, and filming permissions across Asia, the Americas, Europe, Oceania, Africa, and wherever your project needs to go.",
    crewTitle: "Crew & Equipment",
    crewCopy: "We arrange local production teams and equipment including camera, lighting, grip, and art departments, plus cost-effective regional resources and post-production staff.",
    talentTitle: "Models & Talent",
    talentCopy: "We prepare casting for extras, actors, models, talents, and featured performers matched to the tone and budget of each project.",
    logisticsTitle: "Logistics",
    logisticsCopy: "We support production hotels, vehicles, transportation, on-set meals, catering, and the detailed operations that keep a shoot moving.",
    workEyebrow: "Selected Work",
    workTitle: "Selected Work",
    showreelEyebrow: "Showreel",
    showreelTitle: "Hamburger Pictures Reel",
    contactEyebrow: "Contact",
    contactTitle: "Who to contact",
    footerCopy: "Production Service & Support Company"
  }
};

function setLanguage(lang) {
  const selected = translations[lang] ? lang : "ko";
  document.documentElement.lang = selected;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (translations[selected][key]) {
      node.innerHTML = translations[selected][key];
    }
  });
  document.querySelectorAll("[data-lang]").forEach((button) => {
    const isActive = button.dataset.lang === selected;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  localStorage.setItem("hamburgerPicturesLang", selected);
}

function normalizeYouTubeUrl(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  if (raw.includes("/embed/")) return raw;
  const shortMatch = raw.match(/youtu\.be\/([A-Za-z0-9_-]+)/);
  const watchMatch = raw.match(/[?&]v=([A-Za-z0-9_-]+)/);
  const id = shortMatch?.[1] || watchMatch?.[1] || raw.match(/^[A-Za-z0-9_-]{8,}$/)?.[0];
  return id ? `https://www.youtube.com/embed/${id}` : raw;
}

function renderContent(content) {
  const data = content || window.HP_DEFAULT_CONTENT;
  const gallery = document.querySelector("#work-gallery");
  const showreel = document.querySelector("#showreel-frame");

  if (showreel && data.showreelUrl) {
    showreel.src = normalizeYouTubeUrl(data.showreelUrl);
  }

  if (gallery && Array.isArray(data.works)) {
    gallery.innerHTML = data.works.map((item) => `
      <figure class="${item.wide ? "wide" : ""}">
        <img src="${item.image}" alt="${item.alt || item.caption || "Selected work"}" />
        <figcaption>${item.caption || ""}</figcaption>
      </figure>
    `).join("");
  }
}

async function loadDynamicContent() {
  try {
    const response = await fetch("/api/content", { cache: "no-store" });
    if (!response.ok) throw new Error("No dynamic content");
    const saved = await response.json();
    renderContent(saved || window.HP_DEFAULT_CONTENT);
  } catch {
    renderContent(window.HP_DEFAULT_CONTENT);
  }
}

function setupContactForm() {
  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#contact-status");
  if (!form || !status) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.textContent = "Sending...";
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed");
      form.reset();
      status.textContent = "Inquiry sent.";
    } catch {
      const subject = encodeURIComponent("[Hamburger Pictures] Inquiry");
      const body = encodeURIComponent(
        `Name: ${payload.name}\nEmail: ${payload.email}\nPhone: ${payload.phone || ""}\nProject: ${payload.projectType || ""}\n\n${payload.message}`
      );
      window.location.href = `mailto:cooltankis007@gmail.com,chowonjang@gmail.com?subject=${subject}&body=${body}`;
      status.textContent = "Opening email app.";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("hamburgerPicturesLang") || "ko";
  setLanguage(savedLang);
  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.lang));
  });

  const hero = document.querySelector(".hero");
  const video = document.querySelector(".hero-video");
  if (hero && video) {
    const markReady = () => {
      hero.classList.add("video-ready");
      hero.classList.remove("video-unavailable");
    };
    const markUnavailable = () => {
      if (!hero.classList.contains("video-ready")) {
        hero.classList.add("video-unavailable");
      }
    };
    video.addEventListener("canplay", markReady);
    video.addEventListener("loadeddata", markReady);
    video.addEventListener("error", markUnavailable);
    video.load();
    video.play?.().then(markReady).catch(() => {});
    window.setTimeout(() => {
      if (video.readyState >= 2) {
        markReady();
      } else if (video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE || video.error) {
        markUnavailable();
      }
    }, 4200);
  }

  loadDynamicContent();
  setupContactForm();
});
