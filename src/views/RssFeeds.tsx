import React from 'react'
import BaseLayout from '../layout/BaseLayout'
import Feeds from '../features/rsschannels/feeds'

const RssFeeds: React.FC<{}> = () => {
  return (
    <>
      <BaseLayout>
        <Feeds/>
      </BaseLayout>
    </>
  )
}

export default RssFeeds
