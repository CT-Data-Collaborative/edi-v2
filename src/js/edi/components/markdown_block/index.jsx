import React, { Component } from 'react';
import Markdown from 'react-markdown';

class MarkdownBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: props.content
    }
  }

  render() {
    const content = this.state.content;
    return (
      <div>
        {content.map((c) => <Markdown key={c.order} source={c.content}/>)}
      </div>
    );
  }
}

export default MarkdownBlock;
