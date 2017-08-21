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
        <ul className="link-list">{baseLinks.map((l) => {
            let link = l.link.replace('__placeholder__', this.props.selectedTown);
            return <li className="link-list__item link-list__item--button"><a className="link-list__link light-grey--text" href={link}>{l.text}</a></li>
        })}</ul>
      )
    }
  }
}

export default Links;
