import "./style.css";

const TEXT_TITLE = "Quiz Question";
const TEXT_QUESTION_ARRAY = [
  "What is the capital of France?",
  "What is the longest river in the world?",
  "Who wrote Romeo and Juliet?",
  "How many planets are there in our solar system?",
];
const ANSWERS_ARRAY = [
  ["London", "Berlin", "Paris", "Madrid"],
  ["Amazonas", "Nilo", "Yangtsé", "Miño"],
  ["Jane Austen", "Cervantes", "William Shakerpeare", "Charles Dickens"],
  ["7", "8", "9", "10"],
];
const TEXT_BUTTONS_ARRAY = ["Previous", "Next"];

let currentQuestionIndex = 0;

/********* Design *******/
const body = document.querySelector("body");

const h2Title = document.createElement("h2");
h2Title.textContent = TEXT_TITLE;
const pQuestion = document.createElement("p");
pQuestion.textContent = TEXT_QUESTION_ARRAY[0];

const divContainer = document.createElement("div");
divContainer.className = "container";

const divFooter = document.createElement("div");
divFooter.className = "container-footer";

const createButton = (text, className) => {
  const button = document.createElement("button");
  button.textContent = text;
  button.classList.add(className);
  return button;
};

const createLi = (textButton) => {
  const li = document.createElement("li");
  li.appendChild(createButton(textButton, "answer-btn"));
  return li;
};

const createUl = (textButtons) => {
  const ul = document.createElement("ul");
  textButtons.forEach((textButton) => {
    ul.appendChild(createLi(textButton));
  });
  ul.classList.add("container-answers");
  return ul;
};

let buttonsFooter;
const createFooter = (textButtons) => {
  buttonsFooter = textButtons.map((textButton) => {
    let button = createButton(textButton, "footer-btn");
    if (textButton === "Previous") button.disabled = true;
    divFooter.appendChild(button);
    return button;
  });
  return divFooter;
};

divContainer.appendChild(h2Title);
divContainer.appendChild(pQuestion);
let ulContainer = createUl(ANSWERS_ARRAY[currentQuestionIndex]);
divContainer.appendChild(ulContainer);
divContainer.appendChild(createFooter(TEXT_BUTTONS_ARRAY));
body.appendChild(divContainer);

/********* Funcionality ***************/

// Set answers in the ulContainer list element
const setAnswers = (ulContainer, ANSWERS_ARRAY) => {
  Array.from(ulContainer.children).forEach((liAnswer, index) => {
    liAnswer.firstChild.textContent =
      ANSWERS_ARRAY[currentQuestionIndex][index];
  });
};

// Previous button
buttonsFooter[0].addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    buttonsFooter[1].disabled = false; // Enable Next button
    currentQuestionIndex--;
    pQuestion.textContent = TEXT_QUESTION_ARRAY[currentQuestionIndex];
    buttonsFooter[0].disabled = currentQuestionIndex === 0;
    setAnswers(ulContainer, ANSWERS_ARRAY);
  }
});

// Next button
buttonsFooter[1].addEventListener("click", () => {
  if (currentQuestionIndex < TEXT_QUESTION_ARRAY.length - 1) {
    buttonsFooter[0].disabled = false; // Enable Previous button
    currentQuestionIndex++;
    pQuestion.textContent = TEXT_QUESTION_ARRAY[currentQuestionIndex];
    buttonsFooter[1].disabled =
      currentQuestionIndex === TEXT_QUESTION_ARRAY.length - 1;
    setAnswers(ulContainer, ANSWERS_ARRAY);
  }
});
