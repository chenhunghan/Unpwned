import React, { Component, Fragment } from 'react';
import { Unpwned } from './Unpwned';

class Example extends Component {
  render() {
    return (
      <Unpwned render={({ pwned, checkHaveIBeenPwned }) => 
        <Fragment>
          <input
            type="password"
            onChange={(e) => checkHaveIBeenPwned(e.target.value)} />
          {pwned && <label >'password has been hacked!'</label>}
        </Fragment>
      } />
    );
  }
}

export default Example;
