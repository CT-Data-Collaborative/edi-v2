import React, {Component} from 'react';
import PDFViewer from './components/pdfviewer';

class App extends Component {
  constructor(props) {
    super(props)
    const mainElement = document.getElementById('main');
    console.log(mainElement);
    this.state = {
      file: window.pdfFilePath,
      height: mainElement.clientHeight*.75,
    };
  }

  render() {
    const height = this.state.height + 'px';
    return (
      <div ref="appContainer" className="ctdata-edi-app">
        <PDFViewer height={height} width="100%"  filePath={this.state.file}/>
      </div>
    )
  }
}

export default App;
