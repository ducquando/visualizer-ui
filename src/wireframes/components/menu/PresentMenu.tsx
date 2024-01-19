import { FundProjectionScreenOutlined, MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import type { MenuProps } from "antd";
import React = require("react");
import { getDiagrams, getEditor, selectTab, useStore } from "@app/wireframes/model";
import { AnimationIcon, DesignIcon, FullscreenIcon, IconOutline } from "@app/icons/icon";
import { useDispatch } from "react-redux";

export const PresentMenu = React.memo(() => {
    const html = document.querySelector('.editor-diagram')?.innerHTML;

    const fileName = new Date().getTime();
    const dispatch = useDispatch();
    const diagrams = useStore(getDiagrams);
    const editor = useStore(getEditor);
    const mode = useStore(s => s.ui.selectedTab);

    const retrieveObjects = () => {
        let allDiagrams = new Array();
        let allObjects: {[id: string]: any} = {};

        diagrams.values.forEach((diagram, i) => {
            const diagramID = diagram.id;
            const diagramScript = diagram.script;

            diagram.items.values.forEach((item) => {
                let object: {[id: string]: any} = {};
                const id = `${item.id}`;
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

    const flipMode = () => {
        if (mode == 'design') {
            dispatch(selectTab('animation'));
        } else if (mode == 'animation') {
            dispatch(selectTab('fullscreen'));
        } else {
            dispatch(selectTab('design'));
        }
    }

    const modeMenu: MenuProps['items'] = [
        { key: 'design', label: 'Design mode', icon: <IconOutline icon={DesignIcon} /> },
        { key: 'animation', label: 'Animation mode', icon: <IconOutline icon={AnimationIcon} /> },
        { key: 'fullscreen', label: 'Fullscreen mode', icon: <IconOutline icon={FullscreenIcon} /> },
    ];

    return (
        <>
            <Button
                className='header-mode'
                style={{ borderRadius: '50% 0 0 50%', borderRight: '0' }}
                shape='circle'
                onClick={flipMode} >
                    {
                        (mode == 'animation') ? <IconOutline icon={AnimationIcon} /> :
                        (mode == 'design') ? <IconOutline icon={DesignIcon} /> :
                        <IconOutline icon={FullscreenIcon} />
                    }
            </Button>
            <Dropdown 
                menu={{ items: modeMenu, selectable: true, selectedKeys: [mode] }} 
                trigger={['click']}>
                    <Button 
                        className='header-mode'
                        icon={<MoreOutlined />}
                        style={{ borderRadius: '0 16px 16px 0', borderLeft: 0, width: 24, minWidth: 24 }} 
                        shape='circle' />
            </Dropdown>
            <span className='menu-separator' />
            <Button icon={<FundProjectionScreenOutlined />} onClick={fetchAPI} className="header-cta-right" type="text" shape='round'>
                <h4>Present</h4>
            </Button>
        </>
    )
});
