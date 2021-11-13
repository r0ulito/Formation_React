/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { genUser, validate } = __webpack_require__(/*! ./utils */ \"./utils.js\");\n\nconst users = [\n    { name: 'Alan', age: 48 },\n    { name: 'Albert', age: 48 },\n    { name: 'Alice', age: 47 }\n];\n\nconst createElement = (text, element, className) => {\n    const newElement = document.createElement(element);\n    newElement.classList.add(className);\n    newElement.textContent = text;\n\n    return newElement;\n};\n\nconst init = () => {\n    const newUserButton = document.querySelector('#add');\n    newUserButton.addEventListener('click', addUser);\n\n    const userList = document.querySelector('.users');\n\n    userList.textContent = '';\n\n    users.map(user => {\n\n        content = genUser(\n            user.name,\n            user.age\n        );\n\n        el = createElement(content, 'li', 'item');\n        userList.appendChild(el);\n    });\n};\n\nconst addUser = () => {\n\n    // remove  message \n\n    let message = document.querySelector('.message');\n    message.textContent = \"\";\n\n    const name = document.querySelector('input#name').value;\n    const age = document.querySelector('input#age').value;\n\n    if (validate(name) && validate(age, true)) {\n\n        let validUser = users.filter(user => user.name === name);\n\n        if (validUser.length > 0) {\n            const el = createElement(`Attention l'utilisateur ${name} existe déjà`, 'div', 'error');\n            message.appendChild(el);\n\n            return;\n        }\n\n        users.push({ name: name, age: age });\n\n        const userList = document.querySelector('.users');\n        const lastUser = document.querySelector('.last-user');\n\n        lastUser.textContent = '';\n        document.querySelector('input#name').value = '';\n        document.querySelector('input#age').value = '';\n\n        content = genUser(\n            name,\n            age\n        );\n        el = createElement(content, 'li', 'item');\n        userList.appendChild(el);\n\n        lastUser.textContent = content;\n\n    } else {\n        const el = createElement(\"La saisie comporte une erreur\", 'div', 'error');\n        message.appendChild(el);\n    }\n\n};\n\n\ninit();\n\n//# sourceURL=webpack:///./app.js?");

/***/ }),

/***/ "./utils.js":
/*!******************!*\
  !*** ./utils.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nconst genUser = (name, age) => `${name} age : ${age}`;\n\nconst validate = (text, numeric = false) => {\n\n    if (!text) return false;\n\n    if (numeric && text && parseInt(text) === NaN) {\n\n        return false;\n    }\n\n    if (text && text.trim().length === 0) return false;\n\n    return true;\n}\n\nmodule.exports = {\n    genUser : genUser,\n    validate : validate\n} ;\n\n//# sourceURL=webpack:///./utils.js?");

/***/ })

/******/ });