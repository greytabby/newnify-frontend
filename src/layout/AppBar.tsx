import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexGrow: 1,
    },
    title: {
      marginRight: theme.spacing(2),
    },
  }),
)

const MyAppBar: React.FC = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography component="h1" variant="h6" className={classes.title}>
            Newnify
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default MyAppBar
