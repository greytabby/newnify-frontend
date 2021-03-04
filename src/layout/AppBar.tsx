import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import clsx from 'clsx'
import Drawer from '@material-ui/core/Drawer'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Slide from '@material-ui/core/Slide'
import CssBaseline from '@material-ui/core/CssBaseline'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      width: "100%",
      flexGrow: 1,
    },
    title: {
      marginRight: theme.spacing(2),
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: "auto",
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-start',
    },
  }),
)

const MyAppBar: React.FC = (props) => {
  const classes = useStyles()

  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  }

  const handleDrawerClose = () => {
    setOpen(false);
  }

  const scrollTrigger = useScrollTrigger({})

  return (
    <React.Fragment>
      <CssBaseline />
      <Slide appear={false} direction="down" in={!scrollTrigger}>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={handleDrawerOpen}>
              <ChevronRightIcon/>
            </IconButton>
            <Typography component="h1" variant="h6" className={classes.title}>
              Newnify
            </Typography>
          </Toolbar>
        </AppBar>
      </Slide>
      <Toolbar />
      <Drawer
        variant='temporary'
        anchor='left'
        open={open}
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        onClose={handleDrawerClose}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon/>
          </IconButton>
        </div>
        {props.children}
      </Drawer>
    </React.Fragment>
  )
}

export default MyAppBar
