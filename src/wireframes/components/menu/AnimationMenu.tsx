import * as React from "react";
import { useEventCallback } from '@app/core';
import { Diagram, changeScript, getDiagram, useStore } from "@app/wireframes/model";
import { useDispatch } from "react-redux";

export const AnimationMenu = ({ diagram }: { diagram: Diagram }) => {
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

    const changeTextbox = (event: any) => {
        const newCode = event.target.value;

        addLineNumber(newCode);
        dispatch(doChangeScript(newCode));
    };

    return (
        // <div className='code-container'>
            <div className="code-editor">
                <div className="line-numbers">
                    <span></span>
                </div>
                <textarea value={selectedScript} onChange={changeTextbox} />
            </div>
        // </div>
    );
};