import React, { Component } from 'react';
import ComplexTabTable from './components/ComplexTabTable';
import UserForm from './components/UserForm';

export default class Page3 extends Component {
  static displayName = 'Page3';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="page3-page">
        <ComplexTabTable />
        <UserForm />
      </div>
    );
  }
}
