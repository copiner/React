import React from 'react';

import { ThemeContext } from './theme-context';

class ThemedButton extends React.Component {
  render() {
    let props = this.props;
    let theme = this.context;
    console.log(theme)
    return (
      <button
        {...props}
        style={{backgroundColor: theme.background}}
      >DYN</button>
    );
  }
}
ThemedButton.contextType = ThemeContext;

export default ThemedButton;
