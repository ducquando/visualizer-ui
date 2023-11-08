import { ExportOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React = require("react");

const presentSlideshow = () => {
    const html = document.querySelector('.editor-diagram')?.innerHTML;
    const code = document.querySelector('.code-editor textarea')?.innerHTML;
    const outputView = document.querySelector('#error-view') || null;
    const fileName = new Date().getTime();

    if (outputView == null) {
        console.log('Cannot find output panel');
    } else if ((html != undefined) && (code != undefined)) {
        fetch('http://localhost:5001', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                fileName: fileName,
                graphicalObject: html,
                animationScript: code
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
        window.open(`http://localhost:8001/${fileName}.html`);
    } else {
        outputView.innerHTML += `${fileName}:\t Error! Cannot perform action.\n`;
    }
};

export class PresentView extends React.Component {
    render() {
        return (
            <Button icon={<ExportOutlined />} onClick={presentSlideshow} className="header-right" type="primary">
                Present
            </Button>
        );
    }
}

