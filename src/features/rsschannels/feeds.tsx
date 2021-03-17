import React from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { useSelector } from 'react-redux'
import { selectRssChannelFeeds } from './rssChannelsSlice'
import dayjs from 'dayjs'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    refreshIcon: {
      marginLeft: theme.spacing(1),
    },
    channelTitle: {
      wordBreak: 'break-all',
    },
    date: {
      margin: theme.spacing(1),
      textTransform: "none",
      fontSize: "0.65rem",
    },
    item: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      wordBreak: 'break-word',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      margin: theme.spacing(1),
    },
    itemDescription: {
      fontSize: "0.75rem",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      height: "5.32em",
      lineHeight: 2.66,
      letterSpacing: "0.1em",
      textTransform: "none",
      wordBreak: 'break-word',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  }),
);

const Feeds: React.FC<{}> = () => {
  const classes = useStyles()
  const feeds = useSelector(selectRssChannelFeeds)

  if (feeds === null) {
    return <div></div>
  }

  const calcElapsedTime = (d: string) => {
    const now = dayjs(new Date())
    const pubDate = dayjs(d)
    const elapsedDays = now.diff(pubDate, 'days')
    return `${String(elapsedDays)}d`
  }

  const generate = () => {
    if (feeds === null) {
      return
    }

    return feeds.items.map((v) => {
      return (
        <ListItem button className={classes.item} key={v.link} component="a" href={v.link} target="_blank" rel="noopener noreferrer">
          <ListItemAvatar>
            <Avatar
              src="https://images.unsplash.com/photo-1568307970720-a8c50b644a7c?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1500&q=80"
            />
          </ListItemAvatar>
          <ListItemText
            primary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body1"
                  color="textPrimary"
                >
                  {v.title}
                </Typography>
                <Typography
                  className={classes.date}
                  component="span"
                  variant="overline"
                  color="textSecondary"
                >
                  {calcElapsedTime(v.published)}
                </Typography>
              </React.Fragment>
            }
            secondary={
              <>
                <Typography
                  className={classes.itemDescription}
                  component="span"
                  variant="overline"
                  display="block"
                  color="textSecondary"
                >
                  {v.description}
                </Typography>
              </>
            }
          />
        </ListItem>
      )
    })
  }

  return (
    <React.Fragment>
      <Box className={classes.channelTitle}>
        <Typography
          align='left'
          variant="h3"
          gutterBottom
        >
          {feeds.channel.title}
        </Typography>
        <Typography
          align='left'
          variant="subtitle2"
          gutterBottom
        >
          {feeds.channel.description}
        </Typography>
      </Box>
      <Box>
        <List>
          {generate()}
        </List>
      </Box>
    </React.Fragment>
  );
}

export default Feeds
