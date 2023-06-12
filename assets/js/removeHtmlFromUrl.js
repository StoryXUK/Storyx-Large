// removeHtmlFromUrl.js
const url = window.location.href;
const cleanUrl = url.replace(/\.html$/, "");
console.log(cleanUrl);
