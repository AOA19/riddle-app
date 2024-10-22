import riddleApiKey from "./apiKey.js";

const apiKey = riddleApiKey.API_KEY;

document.querySelector("#riddleBtn").addEventListener("click", getRiddle);

let answerVisible = false;

function getRiddle() {
  const riddleQuestion = document.querySelector("#riddleQuestion");
  const riddleAnswer = document.querySelector("#riddleAnswer");
  const getAnswer = document.querySelector("#showAnswer");

  // Clear the previous riddle answer and hide it
  riddleAnswer.innerText = "";
  riddleAnswer.classList.add("hidden");
  answerVisible = false;

  const url = `https://api.api-ninjas.com/v1/riddles`;
  fetch(url, {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      //   console.log(data);
      riddleQuestion.innerText = data[0].question;

      // Remove/Add eventListener to showRiddle answer
      getAnswer.removeEventListener("click", showRiddleAnswer);
      getAnswer.addEventListener("click", showRiddleAnswer);

      function showRiddleAnswer() {
        if (!answerVisible) {
          riddleAnswer.innerText = data[0].answer;
          riddleAnswer.classList.remove("hidden");
          answerVisible = true;
        }
      }
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}
