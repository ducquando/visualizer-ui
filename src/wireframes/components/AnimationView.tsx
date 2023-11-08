import * as React from "react";
import './AnimationView.scss';

// Default code
const code = '<1> Textbox001 \n<2> Table001[0,:] \n<2> Textbox002 \n<3> Table001[1,:]';

const addLineNumber = (event: any) => {
    const numberOfLines = event.target.value.split('\n').length;
    const lineNumbers = document.querySelector('.line-numbers') as HTMLDivElement

    lineNumbers.innerHTML = Array(numberOfLines)
        .fill('<span></span>')
        .join('')
}

export class AnimationView extends React.Component {
    state = { code };

    onCodeChange = ({ target: { value } }: any) => {
        this.setState({ code: value });
    };

    render() {
        const { code } = this.state;
        return (
            <div className="code-editor">
                <div className="line-numbers">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <textarea value={code} onChange={this.onCodeChange} onKeyUp={addLineNumber} />
            </div>
        );
    }
}

