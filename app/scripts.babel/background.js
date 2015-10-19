var articles;
var entry;
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
    xhr.open("GET", "http://b.hatena.ne.jp/entry/json/?url="+request.url, true);
    xhr.onload = function (e) {
      chrome.tabs.getSelected(null, function(tab) {
        entry = JSON.parse(xhr.responseText);
        var tags = parseResponce(entry);
        var max = 0;
        var tag;
        for(var key in tags){
          if (max < tags[key]) { tag = key };
        }
        var FEED_URL = "http://b.hatena.ne.jp/search/text?q=" + tag + "&mode=rss&threshold=30threshold=30sort=recent";

        $.get(FEED_URL, function (data) {
          $(data).find("item").each(function () {
            var el = $(this);
            hoge = el;
            var img = getImg(el.text());
            var item = {
              "title": el.find("title").text()
              ,"description": el.find("description").text()
              ,"link": el.find("link").text()
              ,"img": img[0]
            }
            result.push(item);
          });
          chrome.tabs.sendRequest(tab.id, {res: result}, function(response) {
          });
        });
      });
    };
    xhr.onerror = function (e) {
      console.error(xhr.statusText);
  };
  xhr.send(null);
});

function parseResponce(data) {
  var tags = {};
  for (var i = 0; i < data.bookmarks.length; i++) {
    var tagArray = data.bookmarks[i].tags;
    for (var j = 0; j < tagArray.length; j++) {
      var tag = tagArray[j];
      if (tag in tags) {
        tags[tag] += 1;
      } else {
        tags[tag] = 1;
      }
    }
  }
  console.log(tags);
  return tags
};

function getImg(text) {
  var images = text.match(/<img(.|\s)*?>/gi);
  var imagesURL = [];
  for (var i = 0, l = images.length; i < l; i++) {
    // imagesURL.push(images[i].match(/src=["|'](.*?)["|']/)[1]);
    var image = new Image();
    var width;
    var height;
    image.src = images[i].match(/src=["|'](.*?)["|']/)[1];
    image.onload = function(){
      width = image.width;
      height = image.height;
      if (width > 100 && height > 100) {
        imagesURL.push(image.src);
      };
    };
  }
  if (imagesURL.length == 0) {imagesURL.push("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBhISBxAUFBUWGBQZFxIWFBwcHRcYIB0WGhwVHxwhHyogHRslJxQUITEnJSkrLi4uGCQzODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIALgAuAMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAgMEBQEH/8QALhABAAIBAgQDCAEFAAAAAAAAAAECAwQRBRIhMUFRcRMzNGGBkbHBIhQyNWJy/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APuIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8vbkpMz4M+j1uPV7+z3jbwkGkU6nUV09Ym8TO8xHRcAAAIZb+zxzO0zt4R3ZcPEa5svLWl++09O3r5A2gAAAAAAAAAAAAAAAhn9xb0n8OTirODS48uPw6Wjzjd1s/uLek/hm4bWL8OrFu0xIIcUtF9PSa9ptVdrNTOnrEUje1p2iHMzTbBEYr+F6zWf9W3XzGLV4r37RMxM+W4PL24hhpzX5LRHesNuDLXNii1O0o6jLTHgmbTG233U8LrNNDXm9Qa2Dh/xmf1j9t7Bw/4zP6x+we6rU5setrXFG+9d9vn167+SvNqNZpJi2o5ZrM7TEeCeX/MU/4n9nGfgvrAGS/EJpNqxWsR15e8tGmzzqNLFqx1mO3zW3/sn0lzdNlth4NzU7xv+QXcvEu/NT02W6PU+3wzOSNprMxb6M1NFhyYItqck23jeZm3RXoKRbR5ow9t7bem3QF1M2s1f8tPy1r4c3eUtLnz31lqZ9o2iJ2hPhmSl9FXlntHX5KtNet+K5JpO8csdY+gJXz6jPmmukiIivSbT5+UGLUajDqYpq9p5u1o/DPosWOct6ZbWi0WnpFpjePNq/pdPTNXntO+/wDGJvM9fQGwAAAAAHlqxasxPijhxVw44rj7QmAoz6XFqLROSOsdluTHTJTbJG8eSQDHThmkpfeK/eWwAQy465cc1v2lmx8N02LJE0id47dWwBVOCls8XnvEbGowU1GPbJ2WgPJjeOqvFgx4sPLWOnlK0Bjpw3SVvvFfvK/Dgx4d/Z+M7z6rQHHzX4bbNM5a2id+209Wnh+OZzWvFeWJiIrHy828BRqNJg1Hva7/ADRwaDTYLb469fOWkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//2Q==")};
  return imagesURL;
}