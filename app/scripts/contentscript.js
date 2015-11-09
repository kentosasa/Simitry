'use strict';

chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
  var body = $('body').html();
  $('body').html('<div id="simility-content"</div><div id="simility-footer" class="simility-footer">');
  $('#simility-content').html(body);
  console.log("受信はしてる");
  console.log(request.res);
  sendResponse({ message: "受信 background => contents" });
  var res = request.res;
  var contents = "";
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = res[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var val = _step.value;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  ;
  $('simility-footer').html(contents);
});

chrome.extension.sendRequest({ url: location.href }, function (res) {
  console.log("意味ありますか");
});
//# sourceMappingURL=contentscript.js.map
