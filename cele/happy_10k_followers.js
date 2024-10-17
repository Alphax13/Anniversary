import confetti from "https://cdn.skypack.dev/canvas-confetti";

// Get necessary elements
const counter = document.querySelector(".counter");
const words = document.querySelectorAll(".text");
const restartTrigger = document.querySelector(".btn-restart");
const colors = [
  getComputedStyle(document.body).getPropertyValue("--c1"),
  getComputedStyle(document.body).getPropertyValue("--c2"),
];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Set the start date
const startDate = new Date("2022-04-17");

// Function to calculate and display the time difference
function updateTime() {
  const now = new Date();
  const timeDiff = now - startDate;

  const months = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30.44)); // approximate month length
  const days = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  // Display the time in months, days, and hours
  counter.innerText = `${months} months, ${days} days, ${hours} hours`;
}

// Celebration and confetti animation
function celebrate() {
  const audio = document.getElementById("celebrateAudio");
  audio.play().catch((error) => {
    console.log("Audio playback failed:", error);
  });

  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 },
    colors,
    disableForReducedMotion: true,
  });
}

// Restart the animation and reset the counter
restartTrigger.addEventListener("click", () => {
  updateTime(); // Ensure counter is updated on restart
  celebrate();
});

// Initial display of the counter when the page loads
updateTime(); // Call once at load time
setInterval(updateTime, 3600000); // Update every hour
