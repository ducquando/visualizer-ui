import * as React from "react";
import './AnimationView.scss';
import { changeItemsAppearance, getDiagram, selectItems, useStore } from "@app/wireframes/model";
import { useDispatch } from "react-redux";
import { useState } from "react";

export const AnimationView = () => {
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
}

