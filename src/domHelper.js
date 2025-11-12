export const createButton = (text, className) => {
  const button = document.createElement("button");
  button.textContent = text;
  button.classList.add(className);
  return button;
};

export const createModal = () => {
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

// Set answers in the ulContainer list element
export const setAnswers = (ulContainer, mockData, currentQuestionIndex) => {
  Array.from(ulContainer.children).forEach((liAnswer, index) => {
    liAnswer.firstChild.textContent =
      mockData[currentQuestionIndex].options[index];
  });
};

export const enableCheckButton = (buttonsFooter, storageAnswerSelected, mockData) => {
  buttonsFooter[2].disabled = !(
    // filter(Boolean) removes all falsy(null, undefined, "", empty) values from an array
    (storageAnswerSelected.filter(Boolean).length === mockData.length)
  );
};

export const resetOptions = (optionButtons, storageAnswerSelected, currentQuestionIndex, optionSelected) => {
  optionButtons.forEach((button) => {
    button.textContent === storageAnswerSelected[currentQuestionIndex]
      ? (button.style.background = optionSelected)
      : button.removeAttribute("style");
  });
};