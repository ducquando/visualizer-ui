"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.ShapeImage = void 0;
var React = require("react");
var react_dnd_1 = require("react-dnd");
var react_dnd_html5_backend_1 = require("react-dnd-html5-backend");
var ShapeRenderer_1 = require("@app/wireframes/shapes/ShapeRenderer");
var DESIRED_WIDTH = 120;
var DESIRED_HEIGHT = 72;
exports.ShapeImage = React.memo(function (props) {
    var shape = props.shape;
    var _a = (0, react_dnd_1.useDrag)({
        item: shape,
        previewOptions: {
            anchorX: 0,
            anchorY: 0
        },
        type: 'DND_ASSET'
    }), drag = _a[1], connectDragPreview = _a[2];
    React.useEffect(function () {
        connectDragPreview((0, react_dnd_html5_backend_1.getEmptyImage)(), {
            anchorX: 0,
            anchorY: 0,
            captureDraggingState: true
        });
    }, [connectDragPreview]);
    return (<div className='asset-shape-image'>
            <ShapeRenderer_1.ShapeRenderer ref={drag} desiredHeight={DESIRED_HEIGHT} desiredWidth={DESIRED_WIDTH} plugin={shape.plugin} usePreviewOffset usePreviewSize/>
        </div>);
});
