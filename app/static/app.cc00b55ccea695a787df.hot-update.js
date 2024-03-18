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
typeLetter();

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNjMDBiNTVjY2VhNjk1YTc4N2RmLmhvdC11cGRhdGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxNQUFNQSxJQUFJLEdBQUcsb0JBQW9CO0FBQ2pDLE1BQU1DLFdBQVcsR0FBR0MsUUFBUSxDQUFDQyxjQUFjLENBQUMsY0FBYyxDQUFDO0FBQzNELE1BQU1DLGFBQWEsR0FBR0YsUUFBUSxDQUFDQyxjQUFjLENBQUMsUUFBUSxDQUFDO0FBRXZELElBQUlFLEtBQUssR0FBRyxDQUFDO0FBQ2IsU0FBU0MsVUFBVUEsQ0FBQSxFQUFHO0VBQ3BCLElBQUlELEtBQUssR0FBR0wsSUFBSSxDQUFDTyxNQUFNLEVBQUU7SUFDdkJOLFdBQVcsQ0FBQ08sU0FBUyxHQUFHUixJQUFJLENBQUNTLFNBQVMsQ0FBQyxDQUFDLEVBQUVKLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyw0QkFBNEI7SUFDbkZBLEtBQUssRUFBRTtJQUNQSyxVQUFVLENBQUNKLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQy9CO0VBQUM7QUFDSDtBQUVBQSxVQUFVLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3B5dGhvbi13ZWJwYWNrLWJvaWxlcnBsYXRlLy4vc3JjL2NvbXBvbmVudHMvdGVybWluYWxfZWZmZWN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHRleHQgPSBcIkNvZGUgQmFzayBTb2x1dGlvblwiO1xuY29uc3QgdGV4dEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGVybWluYWxUZXh0Jyk7XG5jb25zdCBjdXJzb3JFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1cnNvcicpO1xuXG5sZXQgaW5kZXggPSAwO1xuZnVuY3Rpb24gdHlwZUxldHRlcigpIHtcbiAgaWYgKGluZGV4IDwgdGV4dC5sZW5ndGgpIHtcbiAgICB0ZXh0RWxlbWVudC5pbm5lckhUTUwgPSB0ZXh0LnN1YnN0cmluZygwLCBpbmRleCArIDEpICsgJzxzcGFuIGlkPVwiY3Vyc29yXCI+Xzwvc3Bhbj4nO1xuICAgIGluZGV4Kys7XG4gICAgc2V0VGltZW91dCh0eXBlTGV0dGVyLCAxNTApOyAvLyBBanVzdGUgbGEgdml0ZXNzZSBkJ8OpY3JpdHVyZSBpY2lcbiAgfTtcbn1cblxudHlwZUxldHRlcigpO1xuIl0sIm5hbWVzIjpbInRleHQiLCJ0ZXh0RWxlbWVudCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjdXJzb3JFbGVtZW50IiwiaW5kZXgiLCJ0eXBlTGV0dGVyIiwibGVuZ3RoIiwiaW5uZXJIVE1MIiwic3Vic3RyaW5nIiwic2V0VGltZW91dCJdLCJzb3VyY2VSb290IjoiIn0=