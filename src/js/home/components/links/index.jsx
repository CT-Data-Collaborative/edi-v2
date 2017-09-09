import React, { Component } from 'react';
import Markdown from 'react-markdown';

class Links extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }


  render() {
    const baseLinks = this.props.links;
    if (this.props.selectedTown == '') {
      return <div/>
    } else {
      return (
        <div className="row links-row">{baseLinks.map((l) => {
          let link = l.link.replace('__placeholder__', this.props.selectedTown);
          return (
            <div className="col-sm-4">
            <div className="card text-center">
              <div className="card-block">
                <h4 className="card-title">{l.text}</h4>
                <p className="card-text">{l.explainer}</p>
                <a href={link} className="btn btn-primary">Explore</a>
              </div>
            </div>
            </div>
          )})}</div>);
    }
  }
}

export default Links;
