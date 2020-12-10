window.onload = e => {
  let getTextFromTextArea = document.getElementById("Text");
  getTextFromTextArea.value = localStorage.getItem("pepNota");

  // getTextFromTextArea.onkeyup = () => {
  //   localStorage.setItem("pepNota", getTextFromTextArea.value);
  // };

  getTextFromTextArea.oninput = () => {
    console.log("1");
    localStorage.setItem("pepNota", getTextFromTextArea.value);
  };
};
