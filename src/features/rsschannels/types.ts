export interface RssChannel {
  id: string
  title: string
  link: string
  rssLink: string
  description: string
}

export interface RssItem {
  title: string
  description: string
  link: string
  published: string
  guid: string
  read: boolean
}

export interface RssChannelFeeds {
  channel: RssChannel
  items: RssItem[]
}

export interface GetChannelsResponse {
  data: RssChannel[]
}

export interface GetChannelFeedsResponse {
  data: RssChannelFeeds
}
