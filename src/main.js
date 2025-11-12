import "./style.css";

const mockData = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    optionCorrect: "Paris",
  },
  {
    question: "What is the longest river in the world?",
    options: ["Amazonas", "Nilo", "Yangtsé", "Miño"],
    optionCorrect: "Amazonas",
  },
  {
    question: "Who wrote Romeo and Juliet?",
    options: [
      "Jane Austen",
      "Cervantes",
      "William Shakerpeare",
      "Charles Dickens",
    ],
    optionCorrect: "William Shakerpeare",
  },
  {
    question: "How many planets are there in our solar system?",
    options: ["7", "8", "9", "10"],
    optionCorrect: "8",
  },
];

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

const createButton = (text, className) => {
  const button = document.createElement("button");
  button.textContent = text;
  button.classList.add(className);
  return button;
};

let optionButtons = [];
const createLi = (textButton) => {
  const li = document.createElement("li");
  let button = createButton(textButton, "answer-btn");
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
    let button = createButton(textButton, "footer-btn");
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

const createModal = () => {
  const divModal = document.createElement("div");
  divModal.className = "modal";
  const divModalContent = document.createElement("div");
  divModalContent.className = "modal-content";
  const h2Modal = document.createElement("h2");
  h2Modal.textContent = "Results";
  const spanModal = document.createElement("span");
  spanModal.className = "modal-close";
  spanModal.textContent = "X";
  const hrModal = document.createElement("hr");
  const pModal = document.createElement("p");

  divModalContent.appendChild(h2Modal);
  divModalContent.appendChild(hrModal);
  divModalContent.appendChild(pModal);
  divModalContent.appendChild(spanModal);
  divModal.appendChild(divModalContent);

  return divModal;
};

let modal = createModal();
body.appendChild(modal);

/********* Funcionality ***************/

// Set answers in the ulContainer list element
const setAnswers = (ulContainer, mockData) => {
  Array.from(ulContainer.children).forEach((liAnswer, index) => {
    liAnswer.firstChild.textContent =
      mockData[currentQuestionIndex].options[index];
  });
};

const resetOptions = () => {
  optionButtons.forEach((button) => {
    button.textContent === storageAnswerSelected[currentQuestionIndex]
      ? (button.style.background = OPTION_SELECTED)
      : button.removeAttribute("style");
  });
};

const enableCheckButton = () => {
  buttonsFooter[2].disabled = !(
    // filter(Boolean) removes all falsy(null, undefined, "", empty) values from an array
    (storageAnswerSelected.filter(Boolean).length === mockData.length)
  );
};

// Previous button
buttonsFooter[0].addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    buttonsFooter[1].disabled = false; // Enable Next button
    currentQuestionIndex--;
    pQuestion.textContent = mockData[currentQuestionIndex].question;
    buttonsFooter[0].disabled = currentQuestionIndex === 0;
    setAnswers(ulContainer, mockData);
    resetOptions();
  }
});

// Next button
buttonsFooter[1].addEventListener("click", () => {
  if (currentQuestionIndex < mockData.length - 1) {
    buttonsFooter[0].disabled = false; // Enable Previous button
    currentQuestionIndex++;
    pQuestion.textContent = mockData[currentQuestionIndex].question;
    buttonsFooter[1].disabled = currentQuestionIndex === mockData.length - 1;
    setAnswers(ulContainer, mockData);
    resetOptions();
  }
});

// Devolvemos el id del mockData que contiene la pregunta que se le pasa como argumento
let findQuestionId = (stringQuestion) => {
  return mockData.findIndex(
    (questionObject) => questionObject.question === stringQuestion
  );
};

optionButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    button.style.background = OPTION_SELECTED;
    storageAnswerSelected[findQuestionId(pQuestion.textContent)] =
      e.target.textContent;
    resetOptions();
    enableCheckButton();
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
