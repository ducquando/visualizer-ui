import Icon, { ExportOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import React = require("react");
import { getDiagrams, getEditor, useStore } from "@app/wireframes/model";
import { AnimationIcon, DesignIcon } from "@app/icons/icon";
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import './PresentMenu.scss'
import { useState } from "react";
import type { MenuProps } from 'antd';

export const PresentMenu = React.memo(() => {
    const html = document.querySelector('.editor-diagram')?.innerHTML;
    // const outputView = document.querySelector('#error-view') || null;

    const fileName = new Date().getTime();
    const diagrams = useStore(getDiagrams);
    const editor = useStore(getEditor);
    const [mode, setMode] = useState('design');

    const retrieveObjects = () => {
        let allDiagrams = new Array();
        let allObjects: {[id: string]: any} = {};

        diagrams.values.forEach((diagram, i) => {
            const diagramID = diagram.id;
            const diagramScript = diagram.script;

            diagram.items.values.forEach((item) => {
                let object: {[id: string]: any} = {};
                const id = (item.name != undefined) ? `${item.name}` : `${item.id}`;
                const content = item.text;
                const bound = item.bounds(diagram);

                switch (item.renderer) {
                    case 'Textbox':
                    case 'Equation':
                        object['content'] = content;
                        object['diagram'] = diagramID;
                        object['id'] = id;
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

                allObjects[item.renderer] = (item.renderer in allObjects) ? allObjects[item.renderer] : new Array();
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

    const DesignIconOutline = (props: Partial<CustomIconComponentProps>) => (
        <Icon component={DesignIcon} {...props} />
    );

    const AnimationIconOutline = (props: Partial<CustomIconComponentProps>) => (
        <Icon component={AnimationIcon} {...props} />
    );

    const modeMenu: MenuProps['items'] = [
        { key: 'design', label: 'Design', icon: <DesignIconOutline />, className: 'present-action-item'},
        { key: 'animation', label: 'Animation', icon: <AnimationIconOutline />, className: 'present-action-item'},
    ];

    const modeEvt: MenuProps['onClick'] = ({key}) => {
        setMode(key);
    };

    return (
        <>
            <Dropdown className='header-mode' menu={{ items: modeMenu, onClick: modeEvt}} trigger={['click']}>
                <Button
                    icon={(mode == 'animation') ? <AnimationIconOutline /> : <DesignIconOutline />}
                    shape='circle' />
            </Dropdown>
            <span className='menu-separator' />
            <Button icon={<ExportOutlined style={{ marginTop: '2px' }} />} onClick={fetchAPI} className="header-right" type="text" shape='round'>
                <h4>Present</h4>
            </Button>
        </>
    )
});
