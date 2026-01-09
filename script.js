const toggleBtn = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-nav");

if (toggleBtn && nav) {
  toggleBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("nav-open");
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      nav.classList.remove("nav-open");
      toggleBtn.setAttribute("aria-expanded", "false");
    });
  });
}

const calcForm = document.getElementById("calc-form");
const caloriesOut = document.getElementById("calories-out");
const calcNote = document.getElementById("calc-note");
const calcReset = document.getElementById("calc-reset");

const MET = { light: 4, moderate: 7, intense: 10 };

function round1(n) {
  return Math.round(n * 10) / 10;
}

if (calcForm) {
  calcForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const weight = Number(document.getElementById("weight").value);
    const durationMin = Number(document.getElementById("duration").value);
    const intensity = document.getElementById("intensity").value;

    if (!weight || weight < 20 || weight > 250) {
      caloriesOut.textContent = "—";
      calcNote.textContent = "Please enter a valid weight (20–250 kg).";
      return;
    }
    if (!durationMin || durationMin < 5 || durationMin > 300) {
      caloriesOut.textContent = "—";
      calcNote.textContent = "Please enter a valid duration (5–300 minutes).";
      return;
    }

    const hours = durationMin / 60;
    const met = MET[intensity] ?? MET.moderate;
    const calories = met * weight * hours;

    caloriesOut.textContent = `${round1(calories)} kcal`;
    calcNote.textContent = `Based on MET ${met}, weight ${weight} kg, duration ${durationMin} min.`;
  });
}

if (calcReset) {
  calcReset.addEventListener("click", () => {
    calcForm?.reset();
    caloriesOut.textContent = "—";
    calcNote.textContent = "";
  });
}

const enquiryForm = document.getElementById("enquiry-form");
const enquiryStatus = document.getElementById("enquiry-status");

const DEST_EMAIL = "YOUR_EMAIL_HERE";

function encodeMail(str) {
  return encodeURIComponent(str).replace(/%20/g, "+");
}

if (enquiryForm) {
  enquiryForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const goal = document.getElementById("goal").value;
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !goal || !message) {
      enquiryStatus.textContent = "Please fill in all fields before sending.";
      return;
    }

    const subject = `SISTC Fitness Membership Enquiry — ${name}`;
    const body =
`Name: ${name}
Email: ${email}
Goal: ${goal}

Message:
${message}

(Submitted from SISTC Fitness Center website demo)`;

    const mailto = `mailto:${DEST_EMAIL}?subject=${encodeMail(subject)}&body=${encodeMail(body)}`;

    enquiryStatus.textContent = "Opening your email app to send the enquiry...";
    window.location.href = mailto;
  });
}
