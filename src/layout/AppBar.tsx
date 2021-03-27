import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton'
import { Menu, Twitter } from '@material-ui/icons'
import CssBaseline from '@material-ui/core/CssBaseline'
import { useDispatch } from 'react-redux'
import { setOpen } from '../features/Drawer/drawerSlice'
import { fetchTimelenAsync } from '../features/tweet/tweetSlice'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      top: 'auto',
      bottom: 0,
      padding: theme.spacing(1),
    },
    grow: {
      flexGrow: 1,
    },
    title: {
      marginRight: theme.spacing(2),
    },
  }),
)

const MyAppBar: React.FC = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const handleDrawerOpen = () => {
    dispatch(setOpen(true))
  }

  const handleFetchTimeline = () => {
    dispatch(fetchTimelenAsync())
  }

  return (
    <>
      <CssBaseline />
        <AppBar position="fixed" color="primary" className={classes.appBar}>
          <Toolbar variant="dense">
            <IconButton onClick={handleDrawerOpen}>
              <Menu/>
            </IconButton>
            <Typography component="h1" variant="h6" className={classes.title}>
              Newnify
            </Typography>
            <div className={classes.grow}></div>
            <IconButton onClick={handleFetchTimeline}>
              <Twitter/>
            </IconButton>
          </Toolbar>
        </AppBar>
    </>
  )
}

export default MyAppBar
