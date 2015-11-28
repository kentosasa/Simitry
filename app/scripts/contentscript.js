'use strict';

chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
  $('body').append('<div id="simility-footer" class="simility-footer">');
  console.log("受信");
  console.log(request.res);
  sendResponse({ message: "受信 background => contents" });
  var res = request.res;
  ReactDOM.render(React.createElement(EntryBox, { res: res }), document.getElementById('simility-footer'));
  // for(var val of res){
  //   };
});
chrome.extension.sendRequest({ url: location.href, text: $('h1').text() + $('h2').text() + $('h3').text(), title: $(document).find("title").text() }, function (res) {
  console.log("リクエスト");
});
var EntryBox = React.createClass({
  displayName: 'EntryBox',

  getInitialState: function getInitialState() {
    return {
      position: 0,
      data: this.props.res,
      visible: true
    };
  },
  componentDidMount: function componentDidMount() {
    window.addEventListener("keydown", this.handleKeydown, false);
  },
  componentWillUnmount: function componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown, false);
  },
  render: function render() {
    var footer = [];
    var max = this.state.data.length;
    var data = this.state.data;
    var style = {};
    console.log("data/" + data.length + " position/" + this.state.position);
    style.color = '#0f0f0f';
    for (var i = this.state.position - 2; i <= this.state.position + 2; i++) {
      var position = i;
      if (i < 0) position = i + max;
      if (i >= max) position = i - max;
      var val = data[position];
      var entryStyle = {
        backgroundColor: '#000000',
        background: 'url(' + val.image_url + ')'
      };
      var d = new Date(val.original_posted_at);
      if (this.state.visible) {
        footer.push(React.createElement(
          'a',
          { key: position, href: val.url, className: this.state.position === position ? 'entry-box entry-select' : 'entry-box', style: entryStyle },
          React.createElement(
            'div',
            { className: 'entry-info' },
            React.createElement(
              'div',
              { className: 'entry-contents' },
              React.createElement(
                'div',
                { className: 'title' },
                val.title
              ),
              React.createElement(
                'div',
                { className: 'description' },
                val.desc
              )
            ),
            React.createElement(
              'div',
              { className: 'entry-meta' },
              React.createElement(
                'span',
                { className: 'created_at' },
                val.keyword
              ),
              React.createElement(
                'span',
                { className: 'created_at' },
                d.getFullYear() + '/' + d.getMonth() + '/' + d.getDate()
              )
            )
          )
        ));
      } else {
        footer.push(React.createElement('a', { key: position, className: 'hide entry-box' }));
      };
    };
    return React.createElement(
      'div',
      { className: 'simility-footer-contents' },
      footer
    );
  },
  handleKeydown: function handleKeydown(e) {
    if (e.keyCode == 40) {
      this.setState({ visible: false });
    } else if (e.keyCode == 37 || e.shiftKey || e.keyCode == 39) {
      this.setState({ visible: true });
    }
    if (e.keyCode == 37) {
      if (this.state.position == 0) {
        this.setState({ position: this.state.position + (this.state.data.length - 1) });
      } else if (this.state.position > 0) this.setState({ position: this.state.position - 1 });
    } else if (e.keyCode == 39) {
      if (this.state.position == this.state.data.length - 1) {
        this.setState({ position: this.state.position - (this.state.data.length - 1) });
      } else if (this.state.position < this.state.data.length) this.setState({ position: this.state.position + 1 });
    } else if (e.keyCode == 13 && this.state.visible) {
      location.href = this.state.data[this.state.position].url;
    };
  }
});
//# sourceMappingURL=contentscript.js.map
