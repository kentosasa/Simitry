'use strict';

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.tabs.onUpdated.addListener(tabId => {
  chrome.pageAction.show(tabId);
});

console.log('\'Allo \'Allo! Event Page for Page Action');

// chrome.tabs.getSelected(null, function(tab) {
//   chrome.tabs.sendRequest(tab.id, {greeting: "hello"}, function(response) {
//     console.log(response.farewell);
//   });
// });

chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    console.log("Backgroud Get Url: " + request.url);
    sendResponse({message: "url送れた"});

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://b.hatena.ne.jp/entry/json/?url="+request.url, true);
    xhr.onload = function (e) {
      console.log(xhr.responseText);
    };
    xhr.onerror = function (e) {
      console.error(xhr.statusText);
    };
    xhr.send(null);
});