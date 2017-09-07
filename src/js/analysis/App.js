import React, {Component} from 'react';
import PDF from 'react-pdf-js';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: window.pdfFilePath
    };
    this.onDocumentComplete = this.onDocumentComplete.bind(this);
    this.onPageComplete = this.onPageComplete.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.renderPagination = this.renderPagination.bind(this);
  }

  onDocumentComplete(pages) {
    this.setState({page: 1, pages});
  }

  onPageComplete(page) {
    this.setState({page});
  }

  handlePrevious() {
    this.setState({page: this.state.page - 1});
  }

  handleNext() {
    this.setState({page: this.state.page + 1});
  }

  renderPagination(page, pages) {
    let previousButton = <li className="previous" onClick={this.handlePrevious}><a href="#"><i
      className="fa fa-arrow-left"></i> Previous</a></li>;
    if (page === 1) {
      previousButton =
        <li className="previous disabled"><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;
    }
    let nextButton = <li className="next" onClick={this.handleNext}><a href="#">Next <i
      className="fa fa-arrow-right"></i></a></li>;
    if (page === pages) {
      nextButton = <li className="next disabled"><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
    }
    return (
      <div className="ctdata-edi-pdf-navigation">
        <ul className="pager">
          {previousButton}
          {nextButton}
        </ul>
      </div>
    );
  }

  render() {
    let pagination = null;
    if (this.state.pages) {
      pagination = this.renderPagination(this.state.page, this.state.pages);
    }
    return (
      <div className="ctdata-edi-app">
        <object data={ this.state.file } type="application/pdf" width="750px" height="750px">
          <PDF className="ctdata-edi-pdf-window" width="100%" file={this.state.file} onDocumentComplete={this.onDocumentComplete} onPageComplete={this.onPageComplete}
               page={this.state.page}/>
          {pagination}
        </object>
      </div>
    )
  }
}

export default App;
