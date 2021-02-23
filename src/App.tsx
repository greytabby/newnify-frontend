import React from 'react';
import './App.css';
import 'fontsource-roboto'
import MyAppBar from './layout/AppBar'
import MyDrawer from './layout/Drawer'

// import { createMuiTheme } from '@material-ui/core/styles';

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
      <MyAppBar/>
      <MyDrawer/>
    </div>
  );
}

export default App;
