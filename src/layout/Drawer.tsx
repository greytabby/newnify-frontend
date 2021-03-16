import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectDrawerOpen, setOpen } from '../features/Drawer/drawerSlice'
import { makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton'
import { Menu } from '@material-ui/icons'
import clsx from 'clsx'
import {
  Drawer,
  Box,
} from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerPaper: {
      position: 'fixed',
      whiteSpace: 'nowrap',
      height: "50%",
      backgroundColor: theme.palette.background.default,
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
  }),
)

const AppDrawer: React.FC = (props) => {
  const classes = useStyles()
  const theme = useTheme()
  const open = useSelector(selectDrawerOpen)
  const dispatch = useDispatch()

  const handleDrawerClose = () => {
    dispatch(setOpen(false))
  }

  return (
    <>
      <Drawer
        variant='temporary'
        anchor='bottom'
        open={open}
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        onClose={handleDrawerClose}
      >
        <Box display='flex' alignItems='center' padding={theme.spacing(0, 1)} justifyContent='flex-start'>
          <IconButton onClick={handleDrawerClose}>
            <Menu/>
          </IconButton>
        </Box>
        {props.children}
      </Drawer>
    </>
  )
}

export default AppDrawer
