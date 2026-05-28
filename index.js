const pct = document.getElementById("pct");
const fill = document.getElementById("logoFill");
const loader = document.getElementById("preloader");
const page = document.getElementById("page");

let count = 0;
const duration = 2400; // ms total
const interval = 28;
const steps = duration / interval;
let step = 0;

// ease-out curve
const ease = (t) => 1 - Math.pow(1 - t, 3);

const timer = setInterval(() => {
  step++;
  const progress = ease(step / steps);
  count = Math.min(100, Math.round(progress * 100));
  pct.textContent = count;

  // fill logo as percent grows
  const fromTop = 100 - count;
  fill.style.clipPath = `inset(${fromTop}% 0 0 0)`;

  if (count >= 100) {
    clearInterval(timer);
    // small pause, then reveal
    setTimeout(() => {
      fill.classList.add("reveal");
      setTimeout(() => {
        loader.classList.add("hide");
        document.body.classList.add("ready");
        page.classList.add("visible");
      }, 500);
    }, 200);
  }
}, interval);
