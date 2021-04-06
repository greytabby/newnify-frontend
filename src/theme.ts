import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#80a1c1',
    },
    secondary: {
      main: '#eee3ab',
    },
    error: {
      main: '#ba3f1d',
    },
    background: {
      default: '#fff',
    },
  },
})

export default theme
