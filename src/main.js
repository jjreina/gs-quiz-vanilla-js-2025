import "./style.css";
import { mockData } from "./mockData";
import * as domHelper from "./domHelper.js";

let storageAnswerSelected = [];

const TEXT_TITLE = "Quiz Question";

const TEXT_BUTTONS_ARRAY = ["Previous", "Next", "Check"];

const OPTION_SELECTED = "#3CB371";

let currentQuestionIndex = 0;

/********* Design *******/
const body = document.querySelector("body");

const h2Title = document.createElement("h2");
h2Title.textContent = TEXT_TITLE;
const pQuestion = document.createElement("p");
pQuestion.textContent = mockData[0].question;

const divContainer = document.createElement("div");
divContainer.className = "container";

const divFooter = document.createElement("div");
divFooter.className = "container-footer";

let optionButtons = [];
const createLi = (textButton) => {
  const li = document.createElement("li");
  let button = domHelper.createButton(textButton, "answer-btn");
  li.appendChild(button);
  optionButtons.push(button);
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
    let button = domHelper.createButton(textButton, "footer-btn");
    if (textButton === "Previous") button.disabled = true;
    if (textButton === "Check") button.disabled = true;
    divFooter.appendChild(button);
    return button;
  });
  return divFooter;
};

divContainer.appendChild(h2Title);
divContainer.appendChild(pQuestion);
let ulContainer = createUl(mockData[currentQuestionIndex].options);
divContainer.appendChild(ulContainer);
divContainer.appendChild(createFooter(TEXT_BUTTONS_ARRAY));
body.appendChild(divContainer);

let modal = domHelper.createModal();
body.appendChild(modal);

/********* Funcionality ***************/

// Previous button
buttonsFooter[0].addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    buttonsFooter[1].disabled = false; // Enable Next button
    currentQuestionIndex--;
    pQuestion.textContent = mockData[currentQuestionIndex].question;
    buttonsFooter[0].disabled = currentQuestionIndex === 0;
    domHelper.setAnswers(ulContainer, mockData, currentQuestionIndex);
    domHelper.resetOptions(optionButtons, storageAnswerSelected, currentQuestionIndex, OPTION_SELECTED);
  }
});

// Next button
buttonsFooter[1].addEventListener("click", () => {
  if (currentQuestionIndex < mockData.length - 1) {
    buttonsFooter[0].disabled = false; // Enable Previous button
    currentQuestionIndex++;
    pQuestion.textContent = mockData[currentQuestionIndex].question;
    buttonsFooter[1].disabled = currentQuestionIndex === mockData.length - 1;
    domHelper.setAnswers(ulContainer, mockData, currentQuestionIndex);
    domHelper.resetOptions(optionButtons, storageAnswerSelected, currentQuestionIndex, OPTION_SELECTED);
  }
});

optionButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    button.style.background = OPTION_SELECTED;
    storageAnswerSelected[currentQuestionIndex] = e.target.textContent;
    domHelper.resetOptions(optionButtons, storageAnswerSelected, currentQuestionIndex, OPTION_SELECTED);
    domHelper.enableCheckButton(buttonsFooter, storageAnswerSelected, mockData);
  });
});

// Check button
buttonsFooter[2].addEventListener("click", () => {
  let correctAnswers = 0;
  storageAnswerSelected.forEach((answer, index) => {
    if (answer === mockData[index].optionCorrect) correctAnswers++;
  });
  let pModal = document.querySelector(".modal-content p");
  pModal.textContent = `You have ${correctAnswers} correct answers out of ${mockData.length}`;

  modal.style.opacity = "1";
  modal.style.visibility = "visible";
});

const closeModal = () => {
  modal.style.opacity = "0";
  modal.style.visibility = "hidden";
};

// Close modal
document.querySelector(".modal-close").addEventListener("click", () => {
  closeModal();
});

// Close modal when click outside
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});
