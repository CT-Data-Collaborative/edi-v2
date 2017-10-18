import React, { Component } from 'react';
import MarkdownBlock from '../home/components/markdown_block';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: window.content,
            results: window.results,
            results_description: window.results_description
          };
    }

    resultsLink() {
      const results = this.state.results;
      const results_description = this.state.results_description;
      if (results != '') {
        return <span className="results-link"><a href={results}> <i className="fa fa-file-text"></i> {results_description}</a></span>
      } else {
        return <span/>
      }
    }
    render() {
        const results_description = this.state.results_description;
        return (
           <div className="ctdata-edi-app">
             <MarkdownBlock content={content}/>
             {this.resultsLink()}
           </div>
        )
      }

}

export default App;
