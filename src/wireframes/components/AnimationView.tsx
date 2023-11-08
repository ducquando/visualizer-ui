import * as React from "react";
import { Button } from 'antd';
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

const presentSlideshow = () => {
  const html = document.querySelector('.editor-diagram')?.innerHTML;
  const code = document.querySelector('.code-editor textarea')?.innerHTML;
  const fileName = new Date().getTime();

  if ((html != undefined) && (code != undefined)) {
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
        console.log(data);
        // Handle data
    })
    .catch((err) => {
        alert(err.message);
    });

    // Open new tab
    window.open(`http://localhost:8001/${fileName}.html`);
  } else {
    alert('Error! Cannot perform action.');
  }
};

export class AnimationView extends React.Component {
  state = { code };

  onCodeChange = ({ target: { value }}: any) => {
    this.setState({ code: value });
  };

  render() {
    const { code } = this.state;
    return (
      <div className="animation-view">
        <div className="title-editor">
          <h4>Animation panel</h4>
          <Button onClick={ presentSlideshow }>Present</Button>
        </div>
        <div className="code-editor">
          <div className="line-numbers">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
          </div>
          <textarea value={ code } onChange={ this.onCodeChange } onKeyUp={ addLineNumber } />
        </div>
      </div>
    );
  }
}

