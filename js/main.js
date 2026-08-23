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
