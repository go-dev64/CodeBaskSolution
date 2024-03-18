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
}
typeLetter();

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmQ3NDEzYTg0OTBmNGRmMjhlOGU2LmhvdC11cGRhdGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxNQUFNQSxJQUFJLEdBQUcsb0JBQW9CO0FBQ2pDLE1BQU1DLFdBQVcsR0FBR0MsUUFBUSxDQUFDQyxjQUFjLENBQUMsY0FBYyxDQUFDO0FBQzNELE1BQU1DLGFBQWEsR0FBR0YsUUFBUSxDQUFDQyxjQUFjLENBQUMsUUFBUSxDQUFDO0FBRXZELElBQUlFLEtBQUssR0FBRyxDQUFDO0FBQ2IsU0FBU0MsVUFBVUEsQ0FBQSxFQUFHO0VBQ3BCLElBQUlELEtBQUssR0FBR0wsSUFBSSxDQUFDTyxNQUFNLEVBQUU7SUFDdkJOLFdBQVcsQ0FBQ08sU0FBUyxHQUFHUixJQUFJLENBQUNTLFNBQVMsQ0FBQyxDQUFDLEVBQUVKLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyw0QkFBNEI7SUFDbkZBLEtBQUssRUFBRTtJQUNQSyxVQUFVLENBQUNKLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQy9CO0FBQ0Y7QUFFQUEsVUFBVSxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9weXRob24td2VicGFjay1ib2lsZXJwbGF0ZS8uL3NyYy9jb21wb25lbnRzL3Rlcm1pbmFsX2VmZmVjdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB0ZXh0ID0gXCJDb2RlIEJhc2sgU29sdXRpb25cIjtcbmNvbnN0IHRleHRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rlcm1pbmFsVGV4dCcpO1xuY29uc3QgY3Vyc29yRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXJzb3InKTtcblxubGV0IGluZGV4ID0gMDtcbmZ1bmN0aW9uIHR5cGVMZXR0ZXIoKSB7XG4gIGlmIChpbmRleCA8IHRleHQubGVuZ3RoKSB7XG4gICAgdGV4dEVsZW1lbnQuaW5uZXJIVE1MID0gdGV4dC5zdWJzdHJpbmcoMCwgaW5kZXggKyAxKSArICc8c3BhbiBpZD1cImN1cnNvclwiPl88L3NwYW4+JztcbiAgICBpbmRleCsrO1xuICAgIHNldFRpbWVvdXQodHlwZUxldHRlciwgMTUwKTsgLy8gQWp1c3RlIGxhIHZpdGVzc2UgZCfDqWNyaXR1cmUgaWNpXG4gIH1cbn1cblxudHlwZUxldHRlcigpO1xuIl0sIm5hbWVzIjpbInRleHQiLCJ0ZXh0RWxlbWVudCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjdXJzb3JFbGVtZW50IiwiaW5kZXgiLCJ0eXBlTGV0dGVyIiwibGVuZ3RoIiwiaW5uZXJIVE1MIiwic3Vic3RyaW5nIiwic2V0VGltZW91dCJdLCJzb3VyY2VSb290IjoiIn0=