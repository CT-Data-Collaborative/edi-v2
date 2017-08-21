import React, { Component } from 'react';
import Select from 'react-select';

import MarkdownBlock from './components/markdown_block';
import Links from './components/links';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: window.content,
      links: window.links
    };
    this.updateSelectedTown = this.updateSelectedTown.bind(this);
  }

  componentWillMount() {
    if (window.choices != 'undefined') {
      this.setState({'choices': window.choices});
    };
  }

  updateSelectedTown(val) {
    this.setState({ selectedTown: val.value })
  }

  render() {
    const content = this.state.content;
    const selectedTown = this.state.selectedTown ? this.state.selectedTown : '';
    let choices = this.state.choices ? this.state.choices : '';

    choices = this.state.choices.map((c) => {
      return { value: c.slug, label: c.name }
    });

    return (
       <div className="ctdata-edi-app">
         <MarkdownBlock content={content}/>
         <h4>Learn about results in your community!</h4>
         <h5>To get started, select your town from the list below.</h5>
         <Select
           name="city-select"
           value={selectedTown}
           options={choices}
           onChange={this.updateSelectedTown}
         />
         <Links links={this.state.links} selectedTown={selectedTown}/>
       </div>
    )
  }
}

export default App;
