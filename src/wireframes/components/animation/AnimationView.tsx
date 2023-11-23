import * as React from "react";
import './AnimationView.scss';
import { useEventCallback } from '@app/core';
import { Diagram, changeItemsAppearance, changeScript, getDiagram, selectItems, useStore } from "@app/wireframes/model";
import { useDispatch } from "react-redux";

interface AnimationViewProps {
}

export const AnimationView = ({ diagram }: AnimationViewProps & { diagram: Diagram }) => {
    const dispatch = useDispatch();
    const selectedDiagram = useStore(getDiagram);
    const selectedScript = selectedDiagram?.script ?? '';
    const doChangeScript = useEventCallback((script: string) => {
        dispatch(changeScript(diagram.id, script));
    });

    const addLineNumber = (code: string) => {
        const numberOfLines = code.split('\n').length;
        const lineNumbers = document.querySelector('.line-numbers') as HTMLDivElement
    
        lineNumbers.innerHTML = Array(numberOfLines)
            .fill('<span></span>')
            .join('')
    }

    const selectShape = (code: string, selectionStart: number, selectionEnd: number) => {
        if (selectedDiagram) {
            const upToSelection = code.substring((selectionStart == selectionEnd) ? 0 : selectionStart, selectionEnd)
            const selection = upToSelection.split("\n").at(-1) ?? "";
            const id = (/([^)]+)\[/.exec(selection) ?? [])[1] ?? "";
            const selectedIndex = (/\[([^)]+)\]/.exec(selection) ?? [])[1].split(",");
            const selectedRow = parseInt(selectedIndex[0]) - 1;
            const selectedCol = parseInt(selectedIndex[1]) - 1;

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

    const changeTextbox = (event: any) => {
        const newCode = event.target.value;
        const selectionStart = event.target.selectionStart;
        const selectionEnd = event.target.selectionEnd;

        addLineNumber(newCode);
        dispatch(doChangeScript(newCode));
        selectShape(newCode, selectionStart, selectionEnd);
    };

    const revertShape = () => {
        if (selectedDiagram) {
            selectedScript.split("\n").forEach((item) => {
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
            <textarea value={selectedScript} onChange={changeTextbox} onMouseLeave={revertShape}/>
        </div>
    );
};