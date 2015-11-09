chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    var body = $('body').html();
    $('body').html('<div id="simility-content"</div><div id="simility-footer" class="simility-footer">');
    $('#simility-content').html(body);
    console.log("受信はしてる");
    console.log(request.res);
    sendResponse({message: "受信 background => contents"});
    var res = request.res;
    var contents = "";
    for(var val of res){
      };
    $('simility-footer').html(contents);
  }
);

chrome.extension.sendRequest({url: location.href}, function(res){
  console.log("意味ありますか");
});
