import React from 'react';
import {ThemeContext, themes} from './theme-context';
import ThemeTogglerButton from './theme-toggler-button';

function Content() {
  return (
    <div>
      <ThemeTogglerButton />
    </div>
  );
}

class Nst extends React.Component {
  constructor(props) {
    super(props);

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };

    //State也包含了更新函数，因此它会被传递进 context provider。
    this.state = {
      theme: themes.light,
      toggleTheme: this.toggleTheme,
    };
  }

  render() {
    // 整个 state 都被传递进 provider
    return (
      <ThemeContext.Provider value={this.state}>
        <Content />
      </ThemeContext.Provider>
    );
  }
}

export default Nst;
