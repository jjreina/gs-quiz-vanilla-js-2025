import "./style.css";

const TEXT_TITLE = "Quiz Question";
const TEXT_QUESTION = "What is the capital of France?";
const OPTIONS_ARRAY = ["London", "Berlin", "Paris", "Madrid"];
const BUTTONS_TEXT_ARRAY = ["Previous", "Next"];

const body = document.querySelector("body");

const h2Title = document.createElement("h2");
h2Title.textContent = TEXT_TITLE;
const pQuestion = document.createElement("p");
pQuestion.textContent = TEXT_QUESTION;

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

const createFooter = (textButtons) => {
  textButtons.forEach((textButton) => {
    divFooter.appendChild(createButton(textButton, "footer-btn"));
  });
  return divFooter;
};

divContainer.appendChild(h2Title);
divContainer.appendChild(pQuestion);
divContainer.appendChild(createUl(OPTIONS_ARRAY));
divContainer.appendChild(createFooter(BUTTONS_TEXT_ARRAY));
body.appendChild(divContainer);

