import React from 'react';
import './App.css';
import 'fontsource-roboto'
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './theme'
import RssFeeds from './views/RssFeeds'
import HomeTimeline from './views/HomeTimeline'

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ScopedCssBaseline>
          <HomeTimeline/>
          <RssFeeds/>
        </ScopedCssBaseline>
      </ThemeProvider>
    </div>
  );
}

export default App;
