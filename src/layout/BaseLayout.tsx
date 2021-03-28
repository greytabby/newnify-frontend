import React from 'react'
import MyAppBar from './AppBar'
import AppDrawer from './Drawer'
import Content from './Content'
import ChannelList from '../features/rsschannels/channels'
import { makeStyles, Theme, createStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      width: "100%",
      height: "100%",
      overflow: "hidden",
    },
  }),
)

const BaseLayout: React.FC = (props) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <AppDrawer>
        <ChannelList />
      </AppDrawer>
      <Content>
        {props.children}
      </Content>
      <MyAppBar/>
    </div>
  )
}

export default BaseLayout
