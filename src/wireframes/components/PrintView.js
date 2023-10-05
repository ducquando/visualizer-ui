"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.PrintView = void 0;
var React = require("react");
var core_1 = require("@app/core");
var model_1 = require("@app/wireframes/model");
var PrintDiagram_1 = require("./PrintDiagram");
var PrintView = function (props) {
    var onRender = props.onRender;
    var renderedDiagrams = React.useRef([]);
    var color = (0, model_1.useStore)(function (x) { return x.editor.present.color; });
    var diagrams = (0, model_1.useStore)(function (x) { return x.editor.present.diagrams; });
    var diagramsOrdered = (0, model_1.useStore)(function (x) { return x.editor.present.orderedDiagrams; });
    var rendered = React.useRef({});
    var size = (0, model_1.useStore)(function (x) { return x.editor.present.size; });
    React.useEffect(function () {
        renderedDiagrams.current = diagramsOrdered;
    }, [diagramsOrdered]);
    var doRender = (0, core_1.useEventCallback)(function (diagram) {
        if (rendered.current[diagram.id]) {
            return;
        }
        rendered.current[diagram.id] = true;
        if (Object.keys(rendered.current).length === renderedDiagrams.current.length && onRender) {
            onRender();
        }
    });
    return (<>
            {diagramsOrdered.map(function (d, i) {
            return <div className='print-diagram' key={i}>
                    <PrintDiagram_1.PrintDiagram color={color} diagram={d} diagrams={diagrams} onRender={doRender} size={size}/>
                </div>;
        })}
        </>);
};
exports.PrintView = PrintView;
