'use strict';

chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
  var body = $('body').html();
  $('body').empty();
  $('body').append('<div id="simility-content"</div>');
  $('body').append('<div id="simility-footer" class="simility-footer">');
  $('#simility-content').html(body);
  console.log("受信はしてる");
  console.log(request.res);
  sendResponse({ message: "受信 background => contents" });
  var res = request.res;
  var contents = "<div>hoge</div>";
  // for(var val of res){
  //   };
  $('#simility-footer').append(contents);
});

chrome.extension.sendRequest({ url: location.href }, function (res) {
  console.log("意味ありますか");
});
//# sourceMappingURL=contentscript.js.map
