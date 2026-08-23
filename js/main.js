const tubeItems = Array.from(document.querySelectorAll(".tube-item"));
const lamp = document.querySelector(".tube-lamp");
let activeItem = tubeItems.find((item) => item.classList.contains("active")) || tubeItems[0];

function moveLamp() {
  if (lamp && activeItem) {
    lamp.style.left = activeItem.offsetLeft + "px";
    lamp.style.width = activeItem.offsetWidth + "px";
  }
}

function setActive(item) {
  activeItem = item;
  tubeItems.forEach((i) => i.classList.toggle("active", i === item));
  moveLamp();
}

tubeItems.forEach((item) =>
  item.addEventListener("click", () => setActive(item))
);

window.addEventListener("resize", moveLamp);
window.addEventListener("load", moveLamp);
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(moveLamp);
}
moveLamp();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

const sections = document.querySelectorAll("section[id]");

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const match = tubeItems.find(
          (item) => item.getAttribute("href") === "#" + entry.target.id
        );
        if (match) setActive(match);
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);

sections.forEach((section) => activeObserver.observe(section));

const annee = document.getElementById("annee");
if (annee) annee.textContent = new Date().getFullYear();

const form = document.getElementById("form-contact");
if (form) {
  const status = form.querySelector(".form-status");
  const btn = form.querySelector('button[type="submit"]');
  const btnLabel = btn.innerHTML;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (form.querySelector('[name="_honey"]').value) return;

    btn.disabled = true;
    btn.textContent = "…";
    status.textContent = "";

    try {
      const res = await fetch("https://formsubmit.co/ajax/h.boirard@orange.fr", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!res.ok) throw new Error(res.status);
      form.reset();
      status.textContent = form.dataset.ok;
      status.className = "form-status ok";
    } catch {
      status.textContent = form.dataset.error;
      status.className = "form-status ko";
    } finally {
      btn.disabled = false;
      btn.innerHTML = btnLabel;
    }
  });
}

const mascot = document.querySelector(".mascot");
const themedImgs = document.querySelectorAll("img[data-fraise]");
themedImgs.forEach((im) => (im.dataset.gray = im.getAttribute("src")));
function applyThemeImages() {
  const fraise = document.documentElement.dataset.theme === "fraise";
  themedImgs.forEach((im) => {
    im.src = fraise ? im.dataset.fraise : im.dataset.gray;
  });
}

if (localStorage.getItem("theme") === "fraise") {
  document.documentElement.dataset.theme = "fraise";
}
applyThemeImages();
if (mascot) {
  mascot.addEventListener("click", () => {
    if (mascot.classList.contains("shiver")) return;
    mascot.classList.add("shiver");
    const root = document.documentElement;
    const next = root.dataset.theme === "fraise" ? "" : "fraise";
    if (next) root.dataset.theme = next;
    else delete root.dataset.theme;
    localStorage.setItem("theme", next);
    applyThemeImages();
    setTimeout(() => mascot.classList.remove("shiver"), 600);
  });
}
if (mascot && window.matchMedia("(pointer: fine)").matches) {
  const pupils = mascot.querySelectorAll(".bloub-pupil");
  const lean = mascot.querySelector(".bloub-lean");
  let lastMove = null;
  let framePending = false;

  document.addEventListener("mousemove", (e) => {
    lastMove = e;
    if (framePending) return;
    framePending = true;
    requestAnimationFrame(() => {
      const r = mascot.getBoundingClientRect();
      const dx = lastMove.clientX - (r.left + r.width / 2);
      const dy = lastMove.clientY - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy) || 1;
      const reach = Math.min(d / 160, 1) * 4.4;
      const tx = (dx / d) * reach;
      const ty = (dy / d) * reach;
      pupils.forEach((p) => p.style.transform = `translate(${tx}px, ${ty}px)`);

      const nx = Math.max(-1, Math.min(1, dx / 420));
      const ny = Math.max(-1, Math.min(1, dy / 420));
      lean.style.transform =
        `rotate(${(nx * 13).toFixed(2)}deg) translate(${(nx * 4).toFixed(1)}px, ${(ny * 5).toFixed(1)}px)`;
      framePending = false;
    });
  });
}
