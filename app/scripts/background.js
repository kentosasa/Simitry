"use strict";

var articles;
var entries;
var result = [];
var hoge;

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.tabs.onUpdated.addListener(function (tabId) {
  chrome.pageAction.show(tabId);
});

chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
  sendResponse({ message: "url送れた" });
  var xhr = new XMLHttpRequest();
  var url = "http://localhost:3000/home/index?";
  var params = "url=" + encodeURIComponent(request.url) + "&text=" + encodeURIComponent(request.text) + "&title=" + encodeURIComponent(request.title);
  // var url = "http://localhost:3000/api/entries/links?" + "url=" + encodeURIComponent(request.url) + "&text=" + encodeURIComponent(request.text).substring(0, 1000) + "&title=" + encodeURIComponent(request.title).substring(0, 300);

  xhr.open("POST", url, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(params);
  xhr.onload = function (e) {
    chrome.tabs.getSelected(null, function (tab) {
      entries = JSON.parse(xhr.responseText);
      chrome.tabs.sendRequest(tab.id, { res: entries }, function (response) {});
    });
  };
  xhr.onerror = function (e) {
    debugger;
    console.error(xhr.statusText);
  };
  xhr.send(null);
});

function fixedEncodeURIComponent(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16);
  });
}
//# sourceMappingURL=background.js.map
