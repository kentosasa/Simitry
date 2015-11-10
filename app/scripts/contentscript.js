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

chrome.extension.sendRequest({ url: location.href }, function (res) {
  console.log("リクエスト");
});

var EntryBox = React.createClass({
  displayName: 'EntryBox',

  getInitialState: function getInitialState() {
    return {
      position: 15,
      data: this.props.res
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
    var max = this.state.data.length - 1;
    var data = this.state.data;
    var style = {};
    console.log("data/" + data.length + " position/" + this.state.position);
    style.color = '#0f0f0f';
    for (var i = this.state.position - 2; i <= this.state.position + 2; i++) {
      var val = data[i];
      // footer.push(<div key={i} className={(i < 0 || i > max) ? 'block1 hide' : 'block1'}>{i}</div>);
      if (i < 0 || i > max) {
        footer.push(React.createElement('a', { key: i, href: '#', className: 'entry-box hide' }));
      } else {
        var entryStyle = {
          background: 'url(' + val.screenshot + ')'
        };
        var d = new Date(val.created_at);
        footer.push(React.createElement(
          'a',
          { key: i, href: val.link, className: this.state.position === i ? 'entry-box select' : 'entry-box', style: entryStyle },
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
                val.description
              )
            ),
            React.createElement(
              'div',
              { className: 'entry-meta' },
              React.createElement(
                'span',
                { className: 'entry-count' },
                'Count: ',
                val.count + ""
              ),
              React.createElement(
                'span',
                { className: 'created_at' },
                d.getFullYear() + '/' + d.getMonth() + '/' + d.getDate()
              )
            )
          )
        ));
      }
    };
    return React.createElement(
      'div',
      { className: 'simility-footer-contents' },
      footer
    );
  },
  handleKeydown: function handleKeydown(e) {
    console.log(e.keyCode);
    if (e.keyCode == 37) {
      if (this.state.position > 0) this.setState({ position: this.state.position - 1 });
    } else if (e.keyCode == 39) {
      if (this.state.position < this.state.data.length - 1) this.setState({ position: this.state.position + 1 });
    } else if (e.keyCode == 13) {
      location.href = this.state.data[this.state.position].link;
    };
  }
});
//# sourceMappingURL=contentscript.js.map
