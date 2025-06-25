// Close menu on nav link click (small screens)
document.querySelectorAll("#nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    const nav = document.getElementById("nav-menu");
    const icon = document.querySelector(".menu-icon");

    if (nav.classList.contains("open")) {
      nav.classList.remove("open");

      // remove spin if it's in progress (optional)
      icon.classList.remove("spin");
    }
  });
});

function showVibe() {
  const selected = document.querySelector('input[name="vibe"]:checked');
  const result = document.getElementById("vibe-result");
  if (selected) {
    result.textContent = `You're a true "${selected.value}"!`;
  } else {
    result.textContent = "Please select an option!";
  }
}

function toggleMenu(icon) {
  const nav = document.getElementById("nav-menu");
  nav.classList.toggle("open");

  if (!icon.classList.contains("spin")) {
    icon.classList.add("spin");
    setTimeout(() => {
      icon.classList.remove("spin");
    }, 500);
  }
}

// Q&A Data
const qnaData = [
  {
    question: "What was your first impression of IITB?",
    answer: "It felt like a dream — green campus, new faces, new life!",
  },
  {
    question: "Most fun event attended?",
    answer: "Mood Indigo – especially the Pro Nites!",
  },
  {
    question: "Favorite hostel moment?",
    answer: "Late-night maggi and dumb charades in the common room.",
  },
  {
    question: "Toughest course so far?",
    answer: "Data Structures — tough but very rewarding!",
  },
];

function loadQnA() {
  const container = document.getElementById("interactive-box");

  qnaData.forEach((item) => {
    const card = document.createElement("div");
    card.className = "qna-card";

    const q = document.createElement("h3");
    q.textContent = item.question;

    const a = document.createElement("p");
    a.textContent = item.answer;
    a.style.display = "none";

    q.addEventListener("click", () => {
      a.style.display = a.style.display === "block" ? "none" : "block";
    });

    card.appendChild(q);
    card.appendChild(a);
    container.appendChild(card);
  });
}

window.addEventListener("DOMContentLoaded", loadQnA);
