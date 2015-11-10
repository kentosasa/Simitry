var articles;
var entries;
var result = [];
var hoge;

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.tabs.onUpdated.addListener(tabId => {
  chrome.pageAction.show(tabId);
});

chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    sendResponse({message: "url送れた"});
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/api/entries", true);
    xhr.onload = function (e) {
      chrome.tabs.getSelected(null, function(tab) {
        entries = JSON.parse(xhr.responseText);
        chrome.tabs.sendRequest(tab.id, {res: entries}, function(response) {
        });
      });
    };
    xhr.onerror = function (e) {
      debugger;
      console.error(xhr.statusText);
  };
  xhr.send(null);
});