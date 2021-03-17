import React from 'react';
import './App.css';
import 'fontsource-roboto'
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline'
import RssFeeds from './views/RssFeeds'
import HomeTimeline from './views/HomeTimeline'

// import { createMuiTheme } from '@material-ui/core/styles'

/*
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00897b',
    },
    secondary: {
      main: '#fdd835',
    },
  },
})
*/

function App() {
  return (
    <div className="App">
      <ScopedCssBaseline>
        <RssFeeds/>
        <HomeTimeline/>
      </ScopedCssBaseline>
    </div>
  );
}

export default App;
