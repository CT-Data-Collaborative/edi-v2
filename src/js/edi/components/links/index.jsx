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
        <ul>{baseLinks.map((l) => {
            let link = l.link.replace('__placeholder__', this.props.selectedTown);
            return <li><a href={link}>{l.text}</a></li>
        })}</ul>
      )
    }
  }
}

export default Links;
