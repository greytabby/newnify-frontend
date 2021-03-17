import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import BaseLayout from '../layout/BaseLayout'
import Typography from '@material-ui/core/Typography'
import { selectTweets, fetchTimelenAsync } from '../features/tweet/tweetSlice'
import {
  Avatar,
  Box,
  ListItemAvatar,
  ListItem,
  ListItemText,
  List,
} from '@material-ui/core'
import { FullUser } from 'twitter-d'

const HomeTimeline: React.FC<{}> = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchTimelenAsync())
  }, [dispatch])

  const tweets = useSelector(selectTweets)

  const generate = () => {
    if (tweets === null) {
      return
    }

    return tweets.map((v) => {
      const user = v.user as FullUser
      return (
        <ListItem key={v.id_str}>
          <ListItemAvatar>
            <Avatar
              src={user.profile_image_url_https}
            />
          </ListItemAvatar>
          <ListItemText
            primary={user.name + ' ' + v.created_at}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  display="inline"
                  color="textPrimary"
                >
                  {v.text}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      )
    })
  }
  return (
    <>
      <BaseLayout>
        <Box>
          <Typography
            align='left'
            variant="h3"
            gutterBottom
          >
            Twitter
          </Typography>
        </Box>
        <List>
          {generate()}
        </List>
      </BaseLayout>
    </>
  )
}

export default HomeTimeline
