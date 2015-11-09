"use strict";

var articles;
var entry;
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
  xhr.open("GET", "http://b.hatena.ne.jp/entry/json/?url=" + request.url, true);
  xhr.onload = function (e) {
    chrome.tabs.getSelected(null, function (tab) {
      entries = JSON.parse(xhr.responseText);
      chrome.tabs.sendRequest(tab.id, { res: entries }, function (response) {});
    });
  };
  xhr.onerror = function (e) {
    console.error(xhr.statusText);
  };
  xhr.send(null);
});
//# sourceMappingURL=background.js.map
