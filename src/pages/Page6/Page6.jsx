import React, { Component } from 'react';
import ComplexDialog from './components/ComplexDialog';
import PictureTextList from './components/PictureTextList';
import FilterList from './components/FilterList';

export default class Page6 extends Component {
  static displayName = 'Page6';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="page6-page">
        <ComplexDialog />
        <PictureTextList />
        <FilterList />
      </div>
    );
  }
}
