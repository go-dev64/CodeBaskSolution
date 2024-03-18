self["webpackHotUpdatepython_webpack_boilerplate"]("app",{

/***/ "./src/components/terminal_effect.js":
/*!*******************************************!*\
  !*** ./src/components/terminal_effect.js ***!
  \*******************************************/
/***/ (() => {

const text = "Code Bask Solution";
const textElement = document.getElementById('terminalText');
const cursorElement = document.getElementById('cursor');
let index = 0;
function typeLetter() {
  if (index < text.length) {
    textElement.innerHTML = text.substring(0, index + 1) + '<span id="cursor">_</span>';
    index++;
    setTimeout(typeLetter, 150); // Ajuste la vitesse d'écriture ici
  }
  ;
}
;
typeLetter();

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLjkxNGRmYTQ5MzJmOWE5ZDdmMzRmLmhvdC11cGRhdGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxNQUFNQSxJQUFJLEdBQUcsb0JBQW9CO0FBQ2pDLE1BQU1DLFdBQVcsR0FBR0MsUUFBUSxDQUFDQyxjQUFjLENBQUMsY0FBYyxDQUFDO0FBQzNELE1BQU1DLGFBQWEsR0FBR0YsUUFBUSxDQUFDQyxjQUFjLENBQUMsUUFBUSxDQUFDO0FBRXZELElBQUlFLEtBQUssR0FBRyxDQUFDO0FBQ2IsU0FBU0MsVUFBVUEsQ0FBQSxFQUFHO0VBQ3BCLElBQUlELEtBQUssR0FBR0wsSUFBSSxDQUFDTyxNQUFNLEVBQUU7SUFDdkJOLFdBQVcsQ0FBQ08sU0FBUyxHQUFHUixJQUFJLENBQUNTLFNBQVMsQ0FBQyxDQUFDLEVBQUVKLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyw0QkFBNEI7SUFDbkZBLEtBQUssRUFBRTtJQUNQSyxVQUFVLENBQUNKLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQy9CO0VBQUM7QUFDSDtBQUFDO0FBRURBLFVBQVUsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHl0aG9uLXdlYnBhY2stYm9pbGVycGxhdGUvLi9zcmMvY29tcG9uZW50cy90ZXJtaW5hbF9lZmZlY3QuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgdGV4dCA9IFwiQ29kZSBCYXNrIFNvbHV0aW9uXCI7XG5jb25zdCB0ZXh0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZXJtaW5hbFRleHQnKTtcbmNvbnN0IGN1cnNvckVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3Vyc29yJyk7XG5cbmxldCBpbmRleCA9IDA7XG5mdW5jdGlvbiB0eXBlTGV0dGVyKCkge1xuICBpZiAoaW5kZXggPCB0ZXh0Lmxlbmd0aCkge1xuICAgIHRleHRFbGVtZW50LmlubmVySFRNTCA9IHRleHQuc3Vic3RyaW5nKDAsIGluZGV4ICsgMSkgKyAnPHNwYW4gaWQ9XCJjdXJzb3JcIj5fPC9zcGFuPic7XG4gICAgaW5kZXgrKztcbiAgICBzZXRUaW1lb3V0KHR5cGVMZXR0ZXIsIDE1MCk7IC8vIEFqdXN0ZSBsYSB2aXRlc3NlIGQnw6ljcml0dXJlIGljaVxuICB9O1xufTtcblxudHlwZUxldHRlcigpO1xuIl0sIm5hbWVzIjpbInRleHQiLCJ0ZXh0RWxlbWVudCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjdXJzb3JFbGVtZW50IiwiaW5kZXgiLCJ0eXBlTGV0dGVyIiwibGVuZ3RoIiwiaW5uZXJIVE1MIiwic3Vic3RyaW5nIiwic2V0VGltZW91dCJdLCJzb3VyY2VSb290IjoiIn0=