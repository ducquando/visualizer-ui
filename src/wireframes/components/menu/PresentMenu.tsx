import { ExportOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React = require("react");
import * as svg from '@svgdotjs/svg.js';
import { getDiagrams, getEditor, useStore } from "@app/wireframes/model";
import { Image, Raster, Shape, Table, Textbox } from '@app/wireframes/shapes/dependencies';
import { AbstractControl } from "@app/wireframes/shapes/utils/abstract-control";

function getPlugin(renderer: string) {
    switch (renderer) {
        case new Image().identifier():
            return new Image();
        case new Shape().identifier():
            return new Shape();
        case new Table().identifier():
            return new Table();
        case new Textbox().identifier():
            return new Textbox();
        default:
            return new Raster();
    }
}

export const PresentMenu = React.memo(() => {
    const html = document.querySelector('.editor-diagram')?.innerHTML;
    // const outputView = document.querySelector('#error-view') || null;

    const fileName = new Date().getTime();
    const diagrams = useStore(getDiagrams);
    const editor = useStore(getEditor);
    
    const retrieveObjects = () => {
        let allDiagrams = new Array();
        let allObjects = {};

        diagrams.values.forEach((diagram, i) => {
            const diagramID = diagram.id;
            const diagramScript = diagram.script;

            diagram.items.values.forEach((item) => {
                let object = {};
                const id = (item.name != undefined) ? `${item.name}` : `${item.id}`;
                const content = item.text;
                const bound = item.bounds(diagram);

                // Get svg
                const svgControl = new AbstractControl(getPlugin(item.renderer));
                const svgElement: svg.Element = svgControl.render(item, undefined);
                const svgCode = svgElement.node.outerHTML;

                switch (item.renderer) {
                    case 'Textbox':
                    case 'Equation':
                        object['content'] = content;
                        object['diagram'] = diagramID;
                        object['id'] = id;
                        object['svg'] = svgCode;
                        object['style'] = {
                            alignment: item.textAlignment,
                            colorBackground: item.backgroundColor,
                            colorForeground: item.foregroundColor,
                            fontSize: item.fontSize,
                            position: `${bound.left} ${bound.top}`,
                            size: `${bound.size.getX()} ${bound.size.getY()}`,
                        }
                        break;
                    case 'Image':
                        object['content'] = content;
                        object['diagram'] = diagramID;
                        object['id'] = id;
                        object['svg'] = svgCode;
                        object['style'] = {
                            alignment: item.textAlignment,
                            keepAspectRatio: item.getAppearance('ASPECT_RATIO'),
                            position: `${bound.left} ${bound.top}`,
                            size: `${bound.size.getX()} ${bound.size.getY()}`,
                        }
                        break;
                    default:
                        break;
                }

                allObjects[item.renderer] = (item.renderer in allObjects) ? allObjects[item.renderer] : new Array() ;
                allObjects[item.renderer].push(object);
            });
    
            allDiagrams.push({
                id: diagramID,
                index: i,
                script: diagramScript,
                style: {
                    colorBackground: editor.color.toNumber(),
                    size: `${editor.size.x} ${editor.size.y}`
                }
            });
        });

        return {
            diagram: allDiagrams, 
            object: allObjects
        }
    }
    

    const fetchAPI = () => {
        const allObjects = retrieveObjects();

        if ((html != undefined)) {
            fetch('http://localhost:5001', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({
                    fileName: fileName,
                    diagram: allObjects.diagram,
                    image: allObjects.object['Image'],
                    katex: allObjects.object['Equation'],
                    shape: null,
                    table: null,
                    text: allObjects.object['Textbox']
                })
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((err) => {
                    console.log(err);
                });

            // Open new tab
            window.open(`http://localhost:8001/${fileName}.html`);
        } else {
            console.log(`${fileName}:\t Error! Cannot perform action.\n`);
        }
    }

    return (
        <>
            <Button icon={<ExportOutlined />} onClick={ fetchAPI } className="header-right" type="primary">
                Present
            </Button>
        </>
    )
});
