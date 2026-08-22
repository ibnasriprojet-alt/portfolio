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
