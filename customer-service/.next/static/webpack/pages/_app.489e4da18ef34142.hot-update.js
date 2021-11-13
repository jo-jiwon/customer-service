"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/_app",{

/***/ "./api/review.ts":
/*!***********************!*\
  !*** ./api/review.ts ***!
  \***********************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n/* module decorator */ module = __webpack_require__.hmd(module);\n\n// process.env.변수명\nvar reviewApi = {\n    get: function(id) {\n        return axios__WEBPACK_IMPORTED_MODULE_0___default().get(\"\".concat(\"http://localhost:8080\", \"/reviews/\").concat(id));\n    },\n    // axios.get<응답데이터타입>(요청URL);\n    // GET 요청URL HTTP/1.1\n    fetch: function() {\n        return axios__WEBPACK_IMPORTED_MODULE_0___default().get(\"\".concat(\"http://localhost:8080\", \"/reviews\"));\n    },\n    // 페이징으로 GET\n    fetchPaging: function(page, size) {\n        return axios__WEBPACK_IMPORTED_MODULE_0___default().get(\"\".concat(\"http://localhost:8080\", \"/reviews/paging?page=\").concat(page, \"$size=\").concat(size));\n    },\n    // POST\n    add: function(reviewItem) {\n        return axios__WEBPACK_IMPORTED_MODULE_0___default().post(\"\".concat(\"http://localhost:8080\", \"/reviews\"), reviewItem);\n    },\n    // DELETE\n    remove: function(id) {\n        return axios__WEBPACK_IMPORTED_MODULE_0___default()[\"delete\"](\"\".concat(\"http://localhost:8080\", \"/reviews/\").concat(id));\n    },\n    // // PUT\n    modify: function(id, reviewItem) {\n        return axios__WEBPACK_IMPORTED_MODULE_0___default().put(\"\".concat(\"http://localhost:8080\", \"/reviews/\").concat(id), reviewItem);\n    }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (reviewApi);\n\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9hcGkvcmV2aWV3LnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBeUI7QUFxQ3pCLEVBQWtCO0FBQ1osR0FBRCxDQUFDQyxTQUFTLEdBQUcsQ0FBQztJQUNqQkMsR0FBRyxFQUFFLFFBQVEsQ0FBUEMsRUFBVTtRQUNkSCxNQUFNRSxDQUFORixnREFBUyxDQUNOLEdBQThDRyxNQUFFLENBQTlDQyx1QkFBZ0MsRUFBQyxDQUFTLFlBQUssT0FBSEQsRUFBRTs7SUFFckQsRUFBNkI7SUFDWCxFQUFHO0lBQ2pCSSxLQUFDLEVBQUUsUUFDUjtRQUFHUCxNQUFNRSxDQUFORixnREFBUyxDQUNOLEdBQW1DLE1BQVEsQ0FBekNJLHVCQUFnQyxFQUFDLENBQVE7O0lBR2hELEVBQVk7SUFDWkksV0FBVyxFQUFFLFFBQVEsQ0FBUEMsSUFBWSxFQUFFQyxJQUFZO1FBQ3RDVixNQUFNRSxDQUFORixnREFBUyxDQUNOLEdBQTBEUyxNQUFJLENBQTVETCx1QkFBZ0MsRUFBQyxDQUFxQix3QkFBZU0sTUFBSSxDQUFqQkQsSUFBSSxFQUFDLENBQU0sU0FBTyxPQUFMQyxJQUFJOztJQUdoRixFQUFPO0lBQ1BDLEdBQUcsRUFBRSxRQUFRLENBQVBDLFVBQTZCO1FBQ2pDWixNQUFNYSxDQUFOYixpREFBVSxDQUNQLEdBQW1DLE1BQVEsQ0FBekNJLHVCQUFnQyxFQUFDLENBQVEsWUFDNUNRLFVBQVU7O0lBR2QsRUFBUztJQUNURSxNQUFNLEVBQUUsUUFBUSxDQUFQWCxFQUFVO1FBQ2pCSCxNQUFNZSxDQUFOZixzREFBWSxDQUFXLEdBQThDRyxNQUFFLENBQTlDQyx1QkFBZ0MsRUFBQyxDQUFTLFlBQUssT0FBSEQsRUFBRTs7SUFFekUsRUFBUztJQUNUYSxNQUFNLEVBQUUsUUFBUSxDQUFQYixFQUFVLEVBQUVTLFVBQTZCO1FBQ2hEWixNQUFNaUIsQ0FBTmpCLGdEQUFTLENBQ04sR0FBOENHLE1BQUUsQ0FBOUNDLHVCQUFnQyxFQUFDLENBQVMsWUFBSyxPQUFIRCxFQUFFLEdBQ2pEUyxVQUFVOztBQUVoQixDQUFDO0FBRUQsK0RBQWVYLFNBQVMsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9hcGkvcmV2aWV3LnRzPzk3MzUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXZpZXdQYWdpbmdSZXNwb25zZSB7XHJcbiAgY29udGVudDogUmV2aWV3SXRlbVJlc3BvbnNlW107XHJcbiAgbGFzdDogYm9vbGVhbjtcclxuICB0b3RhbEVsZW1lbnRzOiBudW1iZXI7XHJcbiAgdG90YWxQYWdlczogbnVtYmVyO1xyXG4gIHNpemU6IG51bWJlcjtcclxuICBudW1iZXI6IG51bWJlcjtcclxufVxyXG5cclxuLy8g7ISc67KE66GcIOu2gO2EsCDrsJvslYTsmKTripQg642w7J207YSwIDHqsbTsl5Ag64yA7ZWcIO2DgOyehVxyXG5leHBvcnQgaW50ZXJmYWNlIFJldmlld0l0ZW1SZXNwb25zZSB7XHJcbiAgaWQ6IG51bWJlcjtcclxuICB0aXRsZTogc3RyaW5nO1xyXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgcmV2aWV3UGhvdG9Vcmw6IHN0cmluZztcclxuICBmaWxlVHlwZTogc3RyaW5nO1xyXG4gIGZpbGVOYW1lOiBzdHJpbmc7XHJcbiAgY2xpbmljOiBzdHJpbmc7XHJcbiAgcHJpY2U6IHN0cmluZztcclxuICBrZXl3b3JkOiBzdHJpbmc7XHJcbiAgY3JlYXRlZFRpbWU6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXZpZXdJdGVtUmVxdWVzdCB7XHJcbiAgdGl0bGU6IHN0cmluZztcclxuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIHJldmlld1Bob3RvVXJsOiBzdHJpbmc7XHJcbiAgZmlsZVR5cGU6IHN0cmluZztcclxuICBmaWxlTmFtZTogc3RyaW5nO1xyXG4gIGNsaW5pYzogc3RyaW5nO1xyXG4gIHByaWNlOiBzdHJpbmc7XHJcbiAga2V5d29yZDogc3RyaW5nO1xyXG4gIGNyZWF0ZWRUaW1lOiBudW1iZXI7XHJcbn1cclxuXHJcbi8vIHByb2Nlc3MuZW52LuuzgOyImOuqhVxyXG5jb25zdCByZXZpZXdBcGkgPSB7XHJcbiAgZ2V0OiAoaWQ6IG51bWJlcikgPT5cclxuICAgIGF4aW9zLmdldDxSZXZpZXdJdGVtUmVzcG9uc2U+KFxyXG4gICAgICBgJHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19BUElfQkFTRX0vcmV2aWV3cy8ke2lkfWBcclxuICAgICksXHJcbiAgLy8gYXhpb3MuZ2V0POydkeuLteuNsOydtO2EsO2DgOyehT4o7JqU7LKtVVJMKTtcclxuICAvLyBHRVQg7JqU7LKtVVJMIEhUVFAvMS4xXHJcbiAgZmV0Y2g6ICgpID0+XHJcbiAgICBheGlvcy5nZXQ8UmV2aWV3SXRlbVJlc3BvbnNlW10+KFxyXG4gICAgICBgJHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19BUElfQkFTRX0vcmV2aWV3c2BcclxuICAgICksXHJcblxyXG4gIC8vIO2OmOydtOynleycvOuhnCBHRVRcclxuICBmZXRjaFBhZ2luZzogKHBhZ2U6IG51bWJlciwgc2l6ZTogbnVtYmVyKSA9PlxyXG4gICAgYXhpb3MuZ2V0PFJldmlld1BhZ2luZ1Jlc3BvbnNlPihcclxuICAgICAgYCR7cHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQVBJX0JBU0V9L3Jldmlld3MvcGFnaW5nP3BhZ2U9JHtwYWdlfSRzaXplPSR7c2l6ZX1gXHJcbiAgICApLFxyXG5cclxuICAvLyBQT1NUXHJcbiAgYWRkOiAocmV2aWV3SXRlbTogUmV2aWV3SXRlbVJlcXVlc3QpID0+XHJcbiAgICBheGlvcy5wb3N0PFJldmlld0l0ZW1SZXNwb25zZT4oXHJcbiAgICAgIGAke3Byb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0FQSV9CQVNFfS9yZXZpZXdzYCxcclxuICAgICAgcmV2aWV3SXRlbVxyXG4gICAgKSxcclxuXHJcbiAgLy8gREVMRVRFXHJcbiAgcmVtb3ZlOiAoaWQ6IG51bWJlcikgPT5cclxuICAgIGF4aW9zLmRlbGV0ZTxib29sZWFuPihgJHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19BUElfQkFTRX0vcmV2aWV3cy8ke2lkfWApLFxyXG5cclxuICAvLyAvLyBQVVRcclxuICBtb2RpZnk6IChpZDogbnVtYmVyLCByZXZpZXdJdGVtOiBSZXZpZXdJdGVtUmVxdWVzdCkgPT5cclxuICAgIGF4aW9zLnB1dDxSZXZpZXdJdGVtUmVzcG9uc2U+KFxyXG4gICAgICBgJHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19BUElfQkFTRX0vcmV2aWV3cy8ke2lkfWAsXHJcbiAgICAgIHJldmlld0l0ZW1cclxuICAgICksXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCByZXZpZXdBcGk7XHJcbiJdLCJuYW1lcyI6WyJheGlvcyIsInJldmlld0FwaSIsImdldCIsImlkIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX0FQSV9CQVNFIiwiZmV0Y2giLCJmZXRjaFBhZ2luZyIsInBhZ2UiLCJzaXplIiwiYWRkIiwicmV2aWV3SXRlbSIsInBvc3QiLCJyZW1vdmUiLCJkZWxldGUiLCJtb2RpZnkiLCJwdXQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./api/review.ts\n");

/***/ })

});