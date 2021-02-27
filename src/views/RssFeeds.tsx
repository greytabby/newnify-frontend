import React from 'react'
import MyAppBar from '../layout/AppBar'
import Content from '../layout/Content'
import ChannelList from '../features/rsschannels/channels'
import Feeds from '../features/rsschannels/feeds'

const RssFeeds: React.FC<{}> = () => {
  return (
    <div>
      <MyAppBar>
        <ChannelList/>
      </MyAppBar>
      <Content>
        <Feeds/>
      </Content>
    </div>
  )
}

export default RssFeeds
