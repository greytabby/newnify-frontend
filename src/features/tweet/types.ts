import {Status as Tweet, FullUser} from 'twitter-d'

export interface TwitterList {
  slug: string
  name: string
  description: string
  created_at: string
  uri: string
  subscriber_count: number
  mode: string
  id: number
  id_str: string
  full_name: string
  member_count: number
  user: FullUser
}

export interface GetHomeTimelineResponse {
  data: Tweet[]
}

export interface GetTwitterListsReponse {
  data: TwitterList[]
}

export interface GetTwitterListTimelineResponse {
  data: Tweet[]
}
