const locationChoices = {
  none: {
    receipt: "No location data is shared.",
    detail: "You can still browse general events.",
    feedback: "<strong>Strong privacy default.</strong> No location is collected. The trade-off is less precise recommendations, but users retain control."
  },
  approximate: {
    receipt: "A broad neighborhood, while using the app.",
    detail: "Enough for nearby events; no exact route or background trail.",
    feedback: "<strong>A data-minimizing option.</strong> An approximate area and on-use access may support recommendations without creating a precise, continuous location history."
  },
  precise: {
    receipt: "Your exact, continuous location.",
    detail: "A location trail can reveal routines and sensitive places.",
    feedback: "<strong>Pause and justify the extra access.</strong> Precise background tracking creates greater privacy and safety risks. Ask whether it is truly necessary, explain it clearly, and make a less intrusive choice available."
  }
};

const locationButtons = document.querySelectorAll("[data-location]");
const locationResult = document.querySelector("#location-result");
const locationDetail = document.querySelector("#location-detail");
const locationFeedback = document.querySelector("#location-feedback p");

locationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choice = locationChoices[button.dataset.location];
    locationButtons.forEach((option) => option.setAttribute("aria-pressed", String(option === button)));
    locationResult.textContent = choice.receipt;
    locationDetail.textContent = choice.detail;
    locationFeedback.innerHTML = choice.feedback;
  });
});

const answerButtons = document.querySelectorAll("[data-answer]");
const checkAnswer = document.querySelector("#check-answer");
const quizFeedback = document.querySelector("#quiz-feedback");
let selectedAnswer = "";

answerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedAnswer = button.dataset.answer;
    answerButtons.forEach((option) => option.setAttribute("aria-pressed", String(option === button)));
    checkAnswer.disabled = false;
    quizFeedback.hidden = true;
  });
});

checkAnswer.addEventListener("click", () => {
  const isCorrect = selectedAnswer === "verify";
  quizFeedback.dataset.correct = String(isCorrect);
  quizFeedback.textContent = isCorrect
    ? "Good call. Use a phone number or website you already know—not details in the suspicious message—to contact school IT. Report the message, and never share a password or one-time code. The FTC and FBI recommend independently verifying unexpected requests."
    : "Pause before replying or forwarding: that can confirm your address is active or expose classmates too. Don't use the message's link or contact details. Verify through a known school IT channel, report the message, and never share a password or one-time code.";
  quizFeedback.hidden = false;
});

const reflectionForm = document.querySelector("#reflection-form");
const reflectionStatus = document.querySelector("#reflection-status");

reflectionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const fields = [...reflectionForm.querySelectorAll("textarea")];
  const missingField = fields.find((field) => !field.value.trim());

  if (missingField) {
    reflectionStatus.textContent = "Please complete all four prompts. For the peer-test prompts, first ask a classmate to try the site; don't invent feedback.";
    missingField.focus();
    return;
  }

  const labels = [...reflectionForm.querySelectorAll("label")];
  const content = labels.map((label, index) => {
    const title = label.querySelector("span").textContent;
    return `${title}\n${fields[index].value.trim()}`;
  }).join("\n\n");
  const file = new Blob([`Pause Before You Trust — Reflection\n\n${content}\n`], { type: "text/plain;charset=utf-8" });
  const downloadUrl = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = "safety-law-ethics-reflection.txt";
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
  reflectionStatus.textContent = "Your reflection download was requested. The file is created in this browser and is not sent to a server.";
});
