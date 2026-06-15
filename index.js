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
        animateEmailElastic();
      }, 500);
    }, 200);
  }
}, interval);

// Elastic snap animation for email
function animateEmailElastic() {
  const emailEl = document.getElementById("emailElastic");
  if (!emailEl) return;

  const emailText = emailEl.querySelector(".email-text");
  const text = "contacto@offermarketing.com.ar";
  emailText.textContent = "";

  text.split("").forEach((char, index) => {
    const span = document.createElement("span");
    span.className = "char";
    span.textContent = char;
    emailText.appendChild(span);

    // Calculate delay: start at 0.3s and add 40ms per character
    const delay = 0.3 + index * 0.04;
    span.style.animationDelay = `${delay}s`;
  });

  // Animate copy icon with last char delay
  const copyIcon = emailEl.querySelector(".copy-icon");
  const lastCharDelay = 0.3 + (text.length) * 0.04;
  copyIcon.style.animationDelay = `${lastCharDelay + 0.1}s`;

  // Add click handler
  emailEl.addEventListener("click", copyEmailToClipboard);
  emailEl.addEventListener("keypress", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      copyEmailToClipboard();
    }
  });
}

// Copy email to clipboard
function copyEmailToClipboard() {
  const email = "contacto@offermarketing.com.ar";
  const emailEl = document.getElementById("emailElastic");

  navigator.clipboard.writeText(email).then(() => {
    // Add copied state
    emailEl.classList.add("copied");

    // Remove copied state after 2 seconds
    setTimeout(() => {
      emailEl.classList.remove("copied");
    }, 2000);
  }).catch(err => {
    console.error("Error al copiar:", err);
  });
}
