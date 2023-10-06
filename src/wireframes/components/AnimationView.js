"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.AnimationView = void 0;
var React = require("react");
var antd_1 = require("antd");
require("./AnimationView.scss");
// Default code
var code = '\\begin{document}\nHello world\n\\end{document}';
var addLineNumber = function (event) {
    var numberOfLines = event.target.value.split('\n').length;
    var lineNumbers = document.querySelector('.line-numbers');
    lineNumbers.innerHTML = Array(numberOfLines)
        .fill('<span></span>')
        .join('');
};
var compileLatex = function () {
    var html = document.querySelector('.editor-diagram');
    if (html != null) {
        var tex = html.innerHTML;
        navigator.clipboard.writeText(tex).then(function () {
            alert('Success! Latex code copied to clipboard.');
        }, function () {
            alert('Error! Failed to copy');
        });
    }
    else {
        alert('Error! Cannot perform action.');
    }
};
var AnimationView = /** @class */ (function (_super) {
    __extends(AnimationView, _super);
    function AnimationView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { code: code };
        _this.onCodeChange = function (_a) {
            var value = _a.target.value;
            _this.setState({ code: value });
        };
        return _this;
    }
    AnimationView.prototype.render = function () {
        var code = this.state.code;
        return (<div className="animation-view">
        <div className="title-editor">
          <h4>Animation panel</h4>
          <antd_1.Button onClick={compileLatex}>Compile LaTeX</antd_1.Button>
        </div>
        <div className="code-editor">
          <div className="line-numbers">
              <span></span>
              <span></span>
              <span></span>
          </div>
          <textarea value={code} onChange={this.onCodeChange} onKeyUp={addLineNumber}/>
        </div>
      </div>);
    };
    return AnimationView;
}(React.Component));
exports.AnimationView = AnimationView;
