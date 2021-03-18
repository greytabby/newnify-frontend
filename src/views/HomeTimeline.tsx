import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import BaseLayout from '../layout/BaseLayout'
import Typography from '@material-ui/core/Typography'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { selectTweets, fetchTimelenAsync } from '../features/tweet/tweetSlice'
import {
  Avatar,
  Box,
  List,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Divider,
} from '@material-ui/core'
import { Entities, FullUser } from 'twitter-d'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
  }),
)

const HomeTimeline: React.FC<{}> = () => {
  const classes = useStyles()
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
      const generateMedia = (m: Entities) => {
        if (m.media) {
          return m.media.map((e) => {
            return (
              <CardMedia
                className={classes.media}
                image={e.media_url_https}
                title="media"
              />
            )
          })
        }
      }

      return (
        <>
          <Card>
            <CardHeader
              avatar={
                <Avatar src={user.profile_image_url_https}>
                </Avatar>
              }
              title={user.name}
              titleTypographyProps={{align: "left"}}
              subheader={v.created_at}
              subheaderTypographyProps={{align: "left"}}
            />
            <CardContent>
              <Typography align="left" variant="body2" color="textPrimary" component="p">
                {v.text}
              </Typography>
            </CardContent>
            {generateMedia(v.entities)}
          </Card>
          <Divider/>
        </>
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
