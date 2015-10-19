chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    console.log("受信はしてる");
    console.log(request.res);
    sendResponse({message: "受信 background => contents"});
    var res = request.res;
    var contents = "";
    for(var i = 0; res.length > i; i++){
      var val = res[i]
      console.log("繰り返し");
      contents += '<div class="entry">'
            +'<a href=' + val.link + '>'
              +'<div class="users">'
                +'<span>' + 188 + '</span>users'
            +'</div>'
            +'<div clas="entry-contents">'
              +'<div class="entry-title">' + val.title + '</div>'
              +'<div class="thumbnail" style="background-image: url(' + val.img +')">'
              +'</div>'
              +'<div class="entry-footer">'
                +'<div class="meta-data">'
                  +'<div class="category">' + "アニメとゲーム" + '</div>'
                  +'<div class="date">' + "2015/10/15 11:45" + '</div>'
                  +'<ul class="tags">'
                    +'<li class="tag">' + "タグ" + '</li>'
                  +'</ul>'
                +'</div>'
                +'<div class="domain"><a href="r.gnavi.co.jp">' + "『ぐるなび』の新着エントリー" + '</a></div>'
              +'</div>'
            +'</div>'
          +'</a>'
        +'</div>';
      };
    document.getElementById("similar-extension-contents").innerHTML = contents;
  }
);

chrome.extension.sendRequest({url: location.href}, function(res){
  console.log("意味ありますか");
  var body = document.body.innerHTML;
  document.body.innerHTML = '<div id="similar-extension-main"></div>'
  + '<div id="similar-extension-contents"></div>';
  document.getElementById("similar-extension-main").innerHTML = body;
});
