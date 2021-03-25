import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import BaseLayout from '../layout/BaseLayout'
import Typography from '@material-ui/core/Typography'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { selectFetching, selectTweets, fetchTimelenAsync } from '../features/tweet/tweetSlice'
import {
  Avatar,
  Box,
  List,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Divider,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import Carousel from 'react-material-ui-carousel'
import { Status, Entities, FullUser } from 'twitter-d'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
)

const HomeTimeline: React.FC<{}> = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchTimelenAsync())
  }, [dispatch])

  const fetching = useSelector(selectFetching)
  const tweets = useSelector(selectTweets)

  const generate = () => {
    if (tweets === null) {
      return
    }

    const generateMedia = (m: Entities) => {
      if (m.media) {
        const elements: React.ReactElement[] = []
        m.media.forEach((e) => {
          const element = <CardMedia className={classes.media} image={e.media_url_https} title="media" />
          elements.push(element)
        })
        return (
          <Carousel>
            {elements}
          </Carousel>
        )
      }
    }

    const generateTweet = (s: Status) => {
      const user = s.user as FullUser
      if (s.retweeted_status) {
        const origStatus = s.retweeted_status
        const origUser = s.retweeted_status.user as FullUser
        return (
          <>
            <Card>
              <CardHeader
                avatar={
                  <Avatar src={origUser.profile_image_url_https}>
                  </Avatar>
                }
                title={origUser.name}
                titleTypographyProps={{align: "left"}}
                subheader={origStatus.created_at + ' Retweete by ' + user.name}
                subheaderTypographyProps={{align: "left"}}
              />
              <CardContent>
                <Typography align="left" variant="body2" color="textPrimary" component="p">
                  {origStatus.text}
                </Typography>
              </CardContent>
              {generateMedia(origStatus.entities)}
            </Card>
            <Divider/>
          </>
        )
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
              subheader={user.created_at}
              subheaderTypographyProps={{align: "left"}}
            />
            <CardContent>
              <Typography align="left" variant="body2" color="textPrimary" component="p">
                {s.text}
              </Typography>
            </CardContent>
            {generateMedia(s.entities)}
          </Card>
          <Divider/>
        </>
      )
    }

    return tweets.map((v) => {
      return generateTweet(v)
    })
  }
  return (
    <>
      <BaseLayout>
        <Box>
          <Typography
            align='left'
            variant="h3"
            color="textPrimary"
            gutterBottom
          >
            Twitter
          </Typography>
        </Box>
        <List>
          {generate()}
        </List>
        <Backdrop className={classes.backdrop} open={fetching}>
          <CircularProgress color="inherit"/>
        </Backdrop>
      </BaseLayout>
    </>
  )
}

export default HomeTimeline
