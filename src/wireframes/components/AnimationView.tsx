import * as React from "react";
import { Button } from 'antd';
import './AnimationView.scss';

// Default code
const code = '\\begin{document}\nHello world\n\\end{document}';

const addLineNumber = (event: any) => {
  const numberOfLines = event.target.value.split('\n').length;
  const lineNumbers = document.querySelector('.line-numbers') as HTMLDivElement

  lineNumbers.innerHTML = Array(numberOfLines)
    .fill('<span></span>')
    .join('')
}

const presentSlideshow = async () => {
  const html = document.querySelector('.editor-diagram') as HTMLElement | null;

  if (html != null) {
    const newHTML = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="description"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" href="dist/reset.css"><link rel="stylesheet" href="dist/reveal.css"><link rel="stylesheet" href="dist/theme/white.css" id="theme"></head><body><div class="reveal"><div class="slides"><section>${html.innerHTML}</section></div></div><script src="dist/reveal.js"></script><script src="plugin/zoom/zoom.js"></script><script src="plugin/notes/notes.js"></script><script src="plugin/search/search.js"></script><script src="plugin/markdown/markdown.js"></script><script src="plugin/highlight/highlight.js"></script><script>Reveal.initialize({controls: true, progress: true, center: true, hash: true, plugins: [RevealZoom, RevealNotes, RevealSearch, RevealMarkdown, RevealHighlight]});</script></body>
    </html>`;

    // var newWindow = window.open(`http://localhost:8001/preview.html`);
    // newWindow.fileContent = newHTML;
    // console.log(`http://localhost:8001/preview.html?content=${newHTML}`);

    navigator.clipboard.writeText(newHTML).then(() => {
      alert('Success! HTML copied to clipboard.');
    },() => {
      alert('Error! Failed to copy');
    });
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
          </div>
          <textarea value={ code } onChange={ this.onCodeChange } onKeyUp={ addLineNumber } />
        </div>
      </div>
    );
  }
}

