'use strict';

console.log('\'Allo \'Allo!hogehoge');

chrome.extension.sendRequest({url: location.href}, function(res){
  console.log(res.message);
});
