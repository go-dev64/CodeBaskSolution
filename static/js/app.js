(self["webpackChunkpython_webpack_boilerplate"] =
  self["webpackChunkpython_webpack_boilerplate"] || []).push([
  ["app"],
  {
    /***/ "./src/application/app.js":
      /*!********************************!*\
  !*** ./src/application/app.js ***!
  \********************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__,
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../styles/index.scss */ "./src/styles/index.scss",
          );
        /* harmony import */ var bootstrap_dist_js_bootstrap_bundle__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! bootstrap/dist/js/bootstrap.bundle */ "./node_modules/bootstrap/dist/js/bootstrap.bundle.js",
          );
        /* harmony import */ var bootstrap_dist_js_bootstrap_bundle__WEBPACK_IMPORTED_MODULE_1___default =
          /*#__PURE__*/ __webpack_require__.n(
            bootstrap_dist_js_bootstrap_bundle__WEBPACK_IMPORTED_MODULE_1__,
          );
        /* harmony import */ var _components_terminal_effect_js__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ../components/terminal_effect.js */ "./src/components/terminal_effect.js",
          );
        /* harmony import */ var _components_terminal_effect_js__WEBPACK_IMPORTED_MODULE_2___default =
          /*#__PURE__*/ __webpack_require__.n(
            _components_terminal_effect_js__WEBPACK_IMPORTED_MODULE_2__,
          );
        /* harmony import */ var _vendors_js_htmx_js__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! ../../vendors/js/htmx.js */ "./vendors/js/htmx.js",
          );
        /* harmony import */ var _vendors_js_htmx_js__WEBPACK_IMPORTED_MODULE_3___default =
          /*#__PURE__*/ __webpack_require__.n(
            _vendors_js_htmx_js__WEBPACK_IMPORTED_MODULE_3__,
          );
        /* harmony import */ var _vendors_js_toast_js__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            /*! ../../vendors/js/toast.js */ "./vendors/js/toast.js",
          );
        /* harmony import */ var _hotwired_stimulus__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            /*! @hotwired/stimulus */ "./node_modules/@hotwired/stimulus/dist/stimulus.js",
          );
        /* harmony import */ var _hotwired_stimulus_webpack_helpers__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            /*! @hotwired/stimulus-webpack-helpers */ "./node_modules/@hotwired/stimulus-webpack-helpers/dist/stimulus-webpack-helpers.js",
          );

        const Stimulus = (window.Stimulus =
          _hotwired_stimulus__WEBPACK_IMPORTED_MODULE_5__.Application.start());
        const context = __webpack_require__(
          "./src/controllers sync recursive \\.js$",
        );
        Stimulus.load(
          (0,
          _hotwired_stimulus_webpack_helpers__WEBPACK_IMPORTED_MODULE_6__.definitionsFromContext)(
            context,
          ),
        );

        /***/
      },

    /***/ "./src/components/terminal_effect.js":
      /*!*******************************************!*\
  !*** ./src/components/terminal_effect.js ***!
  \*******************************************/
      /***/ () => {
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

        /***/
      },

    /***/ "./src/controllers/message_controller.js":
      /*!***********************************************!*\
  !*** ./src/controllers/message_controller.js ***!
  \***********************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__,
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        /* harmony import */ var _hotwired_stimulus__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! @hotwired/stimulus */ "./node_modules/@hotwired/stimulus/dist/stimulus.js",
          );
        /* harmony import */ var bootstrap_js_dist_alert__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! bootstrap/js/dist/alert */ "./node_modules/bootstrap/js/dist/alert.js",
          );
        /* harmony import */ var bootstrap_js_dist_alert__WEBPACK_IMPORTED_MODULE_1___default =
          /*#__PURE__*/ __webpack_require__.n(
            bootstrap_js_dist_alert__WEBPACK_IMPORTED_MODULE_1__,
          );

        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = class extends _hotwired_stimulus__WEBPACK_IMPORTED_MODULE_0__.Controller {
          connect() {
            const alert =
              new (bootstrap_js_dist_alert__WEBPACK_IMPORTED_MODULE_1___default())(
                this.element,
              );
            setTimeout(() => alert.close(), 2500);
          }
        };

        /***/
      },

    /***/ "./src/styles/index.scss":
      /*!*******************************!*\
  !*** ./src/styles/index.scss ***!
  \*******************************/
      /***/ (module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        // extracted by mini-css-extract-plugin

        if (true) {
          // 1716821351564
          var cssReload = __webpack_require__(
            /*! ../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js",
          )(module.id, { locals: false });
          module.hot.dispose(cssReload);
          module.hot.accept(undefined, cssReload);
        }

        /***/
      },

    /***/ "./src/controllers sync recursive \\.js$":
      /*!*************************************!*\
  !*** ./src/controllers/ sync \.js$ ***!
  \*************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        var map = {
          "./message_controller.js": "./src/controllers/message_controller.js",
        };

        function webpackContext(req) {
          var id = webpackContextResolve(req);
          return __webpack_require__(id);
        }
        function webpackContextResolve(req) {
          if (!__webpack_require__.o(map, req)) {
            var e = new Error("Cannot find module '" + req + "'");
            e.code = "MODULE_NOT_FOUND";
            throw e;
          }
          return map[req];
        }
        webpackContext.keys = function webpackContextKeys() {
          return Object.keys(map);
        };
        webpackContext.resolve = webpackContextResolve;
        module.exports = webpackContext;
        webpackContext.id = "./src/controllers sync recursive \\.js$";

        /***/
      },

    /***/ "./vendors/js/htmx.js":
      /*!****************************!*\
  !*** ./vendors/js/htmx.js ***!
  \****************************/
      /***/ (
        __unused_webpack_module,
        __unused_webpack_exports,
        __webpack_require__,
      ) => {
        // Code: htmx.js
        window.htmx = __webpack_require__(
          /*! htmx.org */ "./node_modules/htmx.org/dist/htmx.min.js",
        );

        /***/
      },

    /***/ "./vendors/js/toast.js":
      /*!*****************************!*\
  !*** ./vendors/js/toast.js ***!
  \*****************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__,
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.esm.js",
          );

        document.body.addEventListener("htmx:afterSwap", function () {
          const toastElList = document.querySelectorAll(".toast");
          const options = { animation: true, autohide: true, delay: 8000 };
          const toastList = [...toastElList].map(
            (toastEl) =>
              new bootstrap__WEBPACK_IMPORTED_MODULE_0__.Toast(
                toastEl,
                options,
              ),
          );

          if (toastList.length > 0) {
            toastList.forEach((toast) => {
              setTimeout(() => {
                toast.show();
              }, 500); // Delay 500ms to show toast
            });
          }
        });

        /***/
      },
  },
  /******/ (__webpack_require__) => {
    // webpackRuntimeModules
    /******/ var __webpack_exec__ = (moduleId) =>
      __webpack_require__((__webpack_require__.s = moduleId));
    /******/ __webpack_require__.O(
      0,
      [
        "vendors-node_modules_hotwired_stimulus-webpack-helpers_dist_stimulus-webpack-helpers_js-node_-7c38e9",
      ],
      () => (
        __webpack_exec__(
          "./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=9091&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true",
        ),
        __webpack_exec__("./node_modules/webpack/hot/dev-server.js"),
        __webpack_exec__("./src/application/app.js")
      ),
    );
    /******/ var __webpack_exports__ = __webpack_require__.O();
    /******/
  },
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQThCO0FBQ2M7QUFDRjtBQUNSO0FBQ0M7QUFFYztBQUMyQjtBQUM1RSxNQUFNRSxRQUFRLEdBQUlDLE1BQU0sQ0FBQ0QsUUFBUSxHQUFHRiwyREFBVyxDQUFDSSxLQUFLLENBQUMsQ0FBRTtBQUN4RCxNQUFNQyxPQUFPLEdBQUdDLDhEQUFnRDtBQUNoRUosUUFBUSxDQUFDSyxJQUFJLENBQUNOLDBGQUFzQixDQUFDSSxPQUFPLENBQUMsQ0FBQzs7Ozs7Ozs7OztBQ1Y5QyxNQUFNRyxJQUFJLEdBQUcsb0JBQW9CO0FBQ2pDLE1BQU1DLFdBQVcsR0FBR0MsUUFBUSxDQUFDQyxjQUFjLENBQUMsY0FBYyxDQUFDO0FBQzNELE1BQU1DLGFBQWEsR0FBR0YsUUFBUSxDQUFDQyxjQUFjLENBQUMsUUFBUSxDQUFDO0FBRXZELElBQUlFLEtBQUssR0FBRyxDQUFDO0FBQ2IsU0FBU0MsVUFBVUEsQ0FBQSxFQUFHO0VBQ3BCLElBQUlELEtBQUssR0FBR0wsSUFBSSxDQUFDTyxNQUFNLEVBQUU7SUFDdkJOLFdBQVcsQ0FBQ08sU0FBUyxHQUNuQlIsSUFBSSxDQUFDUyxTQUFTLENBQUMsQ0FBQyxFQUFFSixLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsNEJBQTRCO0lBQzdEQSxLQUFLLEVBQUU7SUFDUEssVUFBVSxDQUFDSixVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUMvQixDQUFDLE1BQU07SUFDTEwsV0FBVyxDQUFDVSxXQUFXLENBQUNQLGFBQWEsQ0FBQyxDQUFDLENBQUM7RUFDMUM7QUFDRjtBQUVBRSxVQUFVLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEJvQztBQUNKO0FBRTVDLGlFQUFlLGNBQWNNLDBEQUFVLENBQUM7RUFDdENFLE9BQU9BLENBQUEsRUFBRztJQUNSLE1BQU1DLEtBQUssR0FBRyxJQUFJRixnRUFBSyxDQUFDLElBQUksQ0FBQ0csT0FBTyxDQUFDO0lBQ3JDTixVQUFVLENBQUMsTUFBTUssS0FBSyxDQUFDRSxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQztFQUN2QztBQUNGOzs7Ozs7Ozs7Ozs7QUNSQTtBQUNVO0FBQ1YsT0FBTyxJQUFVO0FBQ2pCO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsNEpBQTZFLGNBQWMsZUFBZTtBQUN4SSxNQUFNLFVBQVU7QUFDaEIsTUFBTSxpQkFBaUI7QUFDdkI7QUFDQTs7Ozs7Ozs7OztBQ1JBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDdEJBO0FBQ0EsY0FBYyxtQkFBTyxDQUFDLDBEQUFVOzs7Ozs7Ozs7Ozs7OztBQ0RPOztBQUV2QztBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0EscUJBQXFCLDRDQUFlO0FBQ3BDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyxRQUFRO0FBQ2YsS0FBSztBQUNMO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3B5dGhvbi13ZWJwYWNrLWJvaWxlcnBsYXRlLy4vc3JjL2FwcGxpY2F0aW9uL2FwcC5qcyIsIndlYnBhY2s6Ly9weXRob24td2VicGFjay1ib2lsZXJwbGF0ZS8uL3NyYy9jb21wb25lbnRzL3Rlcm1pbmFsX2VmZmVjdC5qcyIsIndlYnBhY2s6Ly9weXRob24td2VicGFjay1ib2lsZXJwbGF0ZS8uL3NyYy9jb250cm9sbGVycy9tZXNzYWdlX2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vcHl0aG9uLXdlYnBhY2stYm9pbGVycGxhdGUvLi9zcmMvc3R5bGVzL2luZGV4LnNjc3M/MGI4OCIsIndlYnBhY2s6Ly9weXRob24td2VicGFjay1ib2lsZXJwbGF0ZS8uL3NyYy9jb250cm9sbGVycy8gc3luYyBcXC5qcyQiLCJ3ZWJwYWNrOi8vcHl0aG9uLXdlYnBhY2stYm9pbGVycGxhdGUvLi92ZW5kb3JzL2pzL2h0bXguanMiLCJ3ZWJwYWNrOi8vcHl0aG9uLXdlYnBhY2stYm9pbGVycGxhdGUvLi92ZW5kb3JzL2pzL3RvYXN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIi4uL3N0eWxlcy9pbmRleC5zY3NzXCI7XG5pbXBvcnQgXCJib290c3RyYXAvZGlzdC9qcy9ib290c3RyYXAuYnVuZGxlXCI7XG5pbXBvcnQgXCIuLi9jb21wb25lbnRzL3Rlcm1pbmFsX2VmZmVjdC5qc1wiO1xuaW1wb3J0IFwiLi4vLi4vdmVuZG9ycy9qcy9odG14LmpzXCI7XG5pbXBvcnQgXCIuLi8uLi92ZW5kb3JzL2pzL3RvYXN0LmpzXCI7XG5cbmltcG9ydCB7IEFwcGxpY2F0aW9uIH0gZnJvbSBcIkBob3R3aXJlZC9zdGltdWx1c1wiO1xuaW1wb3J0IHsgZGVmaW5pdGlvbnNGcm9tQ29udGV4dCB9IGZyb20gXCJAaG90d2lyZWQvc3RpbXVsdXMtd2VicGFjay1oZWxwZXJzXCI7XG5jb25zdCBTdGltdWx1cyA9ICh3aW5kb3cuU3RpbXVsdXMgPSBBcHBsaWNhdGlvbi5zdGFydCgpKTtcbmNvbnN0IGNvbnRleHQgPSByZXF1aXJlLmNvbnRleHQoXCIuLi9jb250cm9sbGVyc1wiLCB0cnVlLCAvXFwuanMkLyk7XG5TdGltdWx1cy5sb2FkKGRlZmluaXRpb25zRnJvbUNvbnRleHQoY29udGV4dCkpO1xuIiwiY29uc3QgdGV4dCA9IFwiQ29kZSBCYXNrIFNvbHV0aW9uXCI7XG5jb25zdCB0ZXh0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGVybWluYWxUZXh0XCIpO1xuY29uc3QgY3Vyc29yRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3Vyc29yXCIpO1xuXG5sZXQgaW5kZXggPSAwO1xuZnVuY3Rpb24gdHlwZUxldHRlcigpIHtcbiAgaWYgKGluZGV4IDwgdGV4dC5sZW5ndGgpIHtcbiAgICB0ZXh0RWxlbWVudC5pbm5lckhUTUwgPVxuICAgICAgdGV4dC5zdWJzdHJpbmcoMCwgaW5kZXggKyAxKSArICc8c3BhbiBpZD1cImN1cnNvclwiPl88L3NwYW4+JztcbiAgICBpbmRleCsrO1xuICAgIHNldFRpbWVvdXQodHlwZUxldHRlciwgMTUwKTsgLy8gQWp1c3RlIGxhIHZpdGVzc2UgZCfDqWNyaXR1cmUgaWNpXG4gIH0gZWxzZSB7XG4gICAgdGV4dEVsZW1lbnQuYXBwZW5kQ2hpbGQoY3Vyc29yRWxlbWVudCk7IC8vIFJlbWV0IGxlIGN1cnNldXIgw6AgbGEgZmluIHVuZSBmb2lzIGxlIHRleHRlIGNvbXBsZXRcbiAgfVxufVxuXG50eXBlTGV0dGVyKCk7XG4iLCJpbXBvcnQgeyBDb250cm9sbGVyIH0gZnJvbSBcIkBob3R3aXJlZC9zdGltdWx1c1wiO1xuaW1wb3J0IEFsZXJ0IGZyb20gXCJib290c3RyYXAvanMvZGlzdC9hbGVydFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIENvbnRyb2xsZXIge1xuICBjb25uZWN0KCkge1xuICAgIGNvbnN0IGFsZXJ0ID0gbmV3IEFsZXJ0KHRoaXMuZWxlbWVudCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBhbGVydC5jbG9zZSgpLCAyNTAwKTtcbiAgfVxufVxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTcxNjgyMTM1MTU2NFxuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiLCJ2YXIgbWFwID0ge1xuXHRcIi4vbWVzc2FnZV9jb250cm9sbGVyLmpzXCI6IFwiLi9zcmMvY29udHJvbGxlcnMvbWVzc2FnZV9jb250cm9sbGVyLmpzXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8obWFwLCByZXEpKSB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdHJldHVybiBtYXBbcmVxXTtcbn1cbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSBcIi4vc3JjL2NvbnRyb2xsZXJzIHN5bmMgcmVjdXJzaXZlIFxcXFwuanMkXCI7IiwiLy8gQ29kZTogaHRteC5qc1xud2luZG93Lmh0bXggPSByZXF1aXJlKFwiaHRteC5vcmdcIik7XG4iLCJpbXBvcnQgKiBhcyBib290c3RyYXAgZnJvbSBcImJvb3RzdHJhcFwiO1xuXG5kb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJodG14OmFmdGVyU3dhcFwiLCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHRvYXN0RWxMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50b2FzdFwiKTtcbiAgY29uc3Qgb3B0aW9ucyA9IHsgYW5pbWF0aW9uOiB0cnVlLCBhdXRvaGlkZTogdHJ1ZSwgZGVsYXk6IDgwMDAgfTtcbiAgY29uc3QgdG9hc3RMaXN0ID0gWy4uLnRvYXN0RWxMaXN0XS5tYXAoXG4gICAgKHRvYXN0RWwpID0+IG5ldyBib290c3RyYXAuVG9hc3QodG9hc3RFbCwgb3B0aW9ucyksXG4gICk7XG5cbiAgaWYgKHRvYXN0TGlzdC5sZW5ndGggPiAwKSB7XG4gICAgdG9hc3RMaXN0LmZvckVhY2goKHRvYXN0KSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdG9hc3Quc2hvdygpO1xuICAgICAgfSwgNTAwKTsgLy8gRGVsYXkgNTAwbXMgdG8gc2hvdyB0b2FzdFxuICAgIH0pO1xuICB9XG59KTtcbiJdLCJuYW1lcyI6WyJBcHBsaWNhdGlvbiIsImRlZmluaXRpb25zRnJvbUNvbnRleHQiLCJTdGltdWx1cyIsIndpbmRvdyIsInN0YXJ0IiwiY29udGV4dCIsInJlcXVpcmUiLCJsb2FkIiwidGV4dCIsInRleHRFbGVtZW50IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImN1cnNvckVsZW1lbnQiLCJpbmRleCIsInR5cGVMZXR0ZXIiLCJsZW5ndGgiLCJpbm5lckhUTUwiLCJzdWJzdHJpbmciLCJzZXRUaW1lb3V0IiwiYXBwZW5kQ2hpbGQiLCJDb250cm9sbGVyIiwiQWxlcnQiLCJjb25uZWN0IiwiYWxlcnQiLCJlbGVtZW50IiwiY2xvc2UiXSwic291cmNlUm9vdCI6IiJ9
