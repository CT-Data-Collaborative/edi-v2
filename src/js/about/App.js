import React, { Component } from 'react';
import MarkdownBlock from '../home/components/markdown_block';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: window.content
          };
    }

    render() {
        const content = this.state.content;
        return (
           <div className="ctdata-edi-app">
             <MarkdownBlock content={content}/>
           </div>
        )
      }

}

export default App;
