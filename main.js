window.onload = e => {
  let getTextFromTextArea = document.getElementById("Text");
  getTextFromTextArea.value = localStorage.getItem("pepNota");

  getTextFromTextArea.oninput = () => {
    localStorage.setItem("pepNota", getTextFromTextArea.value);
  };
};
