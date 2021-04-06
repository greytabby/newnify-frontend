import React from 'react'
import MyAppBar from './AppBar'
import AppDrawer from './Drawer'
import Content from './Content'
import ChannelList from '../features/rsschannels/channels'
import TwitterLists from '../views/TwitterLists'
import {
  Divider,
  Container,
} from '@material-ui/core'

const BaseLayout: React.FC = (props) => {
  return (
    <>
      <Container maxWidth="md">
        <AppDrawer>
          <ChannelList />
          <Divider variant="middle" light/>
          <TwitterLists/>
        </AppDrawer>
        <Content>
          {props.children}
        </Content>
        <MyAppBar/>
      </Container>
    </>
  )
}

export default BaseLayout
