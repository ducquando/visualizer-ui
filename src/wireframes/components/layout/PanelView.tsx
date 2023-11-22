import { Button, Tabs } from "antd";
import * as React from "react";
import './PanelView.scss';
import { useEventCallback } from '@app/core';
import { Diagram, changeItemsAppearance, getDiagram, selectItems, selectPanel, togglePanel, useStore } from "@app/wireframes/model";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { texts } from "@app/texts";

export interface PanelViewProps {
}

export const PanelView = (props: PanelViewProps) => {
    const diagram = useStore(getDiagram);

    if (!diagram) {
        return null;
    }

    return (
        <PanelViewInner {...props} diagram={diagram} />
    );
};

export const PanelViewInner = ({ diagram }: PanelViewProps & { diagram: Diagram }) => {
    const dispatch = useDispatch();
    const selectedPanel = useStore(s => s.ui.selectedPanel);
    const showPanel = useStore(s => s.ui.showPanel);
    
    const doSelectPanel = useEventCallback((key: string) => {
        dispatch(selectPanel(key));
        if (!showPanel) {
            doTogglePanel();
        }
    });
    const doTogglePanel = useEventCallback(() => {
        dispatch(togglePanel());
    });
    
    const closePanel = <Button onClick={doTogglePanel}
        icon={showPanel ? <CloseOutlined /> : <></>}
        type='text'
        size='small'
        shape='circle' />


    return (
        <Tabs tabBarExtraContent={closePanel} className="animation-view" type='card' onTabClick={doSelectPanel} activeKey={selectedPanel}>
            <Tabs.TabPane key='animation' tab={texts.common.animation}>
                { showPanel ? <AnimationView /> : <></> }
            </Tabs.TabPane>
            <Tabs.TabPane key='error' tab={texts.common.error}>
                { showPanel ? <ErrorView /> : <></> }
            </Tabs.TabPane>
        </Tabs>
    );
};

const ErrorView = () => {
    return (
        <div id="error-view" style={{ height: 200, whiteSpace: 'pre-wrap', padding: '0 20px' }}></div>
    );
};

const AnimationView = () => {
    const dispatch = useDispatch();
    const [code, setCode] = useState('');
    const selectedDiagram = useStore(getDiagram);

    const addLineNumber = (event: any) => {
        const numberOfLines = event.target.value.split('\n').length;
        const lineNumbers = document.querySelector('.line-numbers') as HTMLDivElement
    
        lineNumbers.innerHTML = Array(numberOfLines)
            .fill('<span></span>')
            .join('')
    }

    const selectShape = (event: any) => {
        setCode(event.target.value);
        if (selectedDiagram) {
            const selectionStart = (event.target.selectionStart == event.target.selectionEnd) ? 0 : event.target.selectionStart;
            const selection = code.substring(selectionStart, event.target.selectionEnd).split("\n").at(-1) ?? "";
            const id = (/([^)]+)\[/.exec(selection) ?? [])[1] ?? "";
            const selectedIndex = (/\[([^)]+)\]/.exec(selection) ?? [])[1].split(",");
            const selectedRow = parseInt(selectedIndex[0]) - 1;
            const selectedCol = parseInt(selectedIndex[1]) - 1;
            console.log(selectedCol);

            // Select shape
            dispatch(selectItems(selectedDiagram, [id]));

            // Highlight text
            const newText = () => {
                let texts = selectedDiagram.items.get(id)?.text.split('\n') ?? [];
                if (!Number.isNaN(selectedCol)) {
                    texts[selectedRow] = (texts[selectedRow].includes('<tspan>')) ? texts[selectedRow] : `${texts[selectedRow].substring(0, selectedCol)}<tspan>${texts[selectedRow].substring(selectedCol, selectedCol + 1)}</tspan>${texts[selectedRow].substring(selectedCol + 1)}`;
                } else {
                    texts[selectedRow] = (texts[selectedRow].includes('<tspan>')) ? texts[selectedRow] : `<tspan>${texts[selectedRow]}</tspan>`;
                }
                
                return texts.join('\n');
            }
            dispatch(changeItemsAppearance(selectedDiagram, [id], 'TEXT', newText()));
        }
    }

    const revertShape = () => {
        if (selectedDiagram) {
            code.split("\n").forEach((item) => {
                const id = (/([^)]+)\[/.exec(item) ?? [])[1] ?? "";
                const originalText = selectedDiagram.items.get(id)?.text.replace('<tspan>','').replace('</tspan>','');

                dispatch(changeItemsAppearance(selectedDiagram, [id], 'TEXT', originalText));
            })
        }
    }

    return (
        <div className="code-editor">
            <div className="line-numbers">
                <span></span>
            </div>
            <textarea value={code} onChange={selectShape} onKeyUp={addLineNumber} onMouseLeave={revertShape}/>
        </div>
    );
};