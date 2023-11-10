import { ExportOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React = require("react");
import { getDiagrams, useStore } from "@app/wireframes/model";

export const PresentView = React.memo(() => {
    const html = document.querySelector('.editor-diagram')?.innerHTML;
    const code = document.querySelector('.code-editor textarea')?.innerHTML;
    const outputView = document.querySelector('#error-view') || null;

    const fileName = new Date().getTime();
    const diagrams = useStore(getDiagrams);
    
    const retrieveObjects = () => {
        let diagramID = new Array();
        let objectImage = {};
        let objectText = {};

        diagrams.values.forEach((diagram) => {
            let images = new Array();
            let texts = new Array(); 
    
            diagram.items.values.forEach((item) => {
                const id = (item.name != undefined) ? `${item.name}` : `${item.id}`;
                const content = item.text;
                const bound = item.bounds(diagram);
                const position = `${bound.left} ${bound.top} ${bound.size.getX()} ${bound.size.getY()}` // left top width height

                if (item.renderer == 'Textbox') {
                    texts.push({
                        id: id,
                        position: position,
                        text: content
                    });
                } else if (item.renderer == 'Image') {
                    images.push({
                        id: id,
                        position: position,
                        url: content
                    });
                }
            });
    
            diagramID.push(diagram.id);
            objectImage[diagram.id] = images;
            objectText[diagram.id] = texts;
        });

        return {
            diagramID: diagramID, 
            image: objectImage,
            text: objectText
        }
    }
    

    const fetchAPI = () => {
        const allObjects = retrieveObjects();

        if (outputView == null) {
            console.log('Cannot find output panel');
        } else if ((html != undefined) && (code != undefined)) {
            fetch('http://localhost:5001', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({
                    animationScript: code,
                    fileName: fileName,
                    diagramID: allObjects.diagramID,
                    objectImage: allObjects.image,
                    objectText: allObjects.text
                })
            })
                .then((response) => response.json())
                .then((data) => {
                    outputView.innerHTML += `${fileName}:\t ${data}.\n`;
                })
                .catch((err) => {
                    outputView.innerHTML += `${fileName}:\t ${err.message}.\n`;
                });

            // Open new tab
            // window.open(`http://localhost:8001/${fileName}.html`);
        } else {
            outputView.innerHTML += `${fileName}:\t Error! Cannot perform action.\n`;
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
