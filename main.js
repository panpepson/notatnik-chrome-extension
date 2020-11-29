window.onload = e => {
  let getTextFromTextArea = document.getElementById("Text");
  getTextFromTextArea.value = localStorage.getItem("pepNota");
  getTextFromTextArea.onkeyup = () => {
    localStorage.setItem("pepNota", getTextFromTextArea.value);
  };
};

// function myAlert() {
//   alert(
//     "Uwaga..! Nie trzymaj tu nic ważnego! Poniewż notatki zapiswywane są w pamięci podręcznej przegladarki - pepson"
//   );
// }
