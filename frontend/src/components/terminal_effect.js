const text = "Code Bask Solution";
const textElement = document.getElementById("terminalText");
const cursorElement = document.getElementById("cursor");

let index = 0;
function typeLetter() {
  if (index < text.length) {
    textElement.innerHTML =
      text.substring(0, index + 1) + '<span id="cursor">_</span>';
    index++;
    setTimeout(typeLetter, 150); // Ajuste la vitesse d'écriture ici
  } else {
    textElement.appendChild(cursorElement); // Remet le curseur à la fin une fois le texte complet
  }
}

typeLetter();
