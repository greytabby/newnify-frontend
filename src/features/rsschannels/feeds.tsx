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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      overflow: 'hidden',
    },
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
      wordBreak: 'break-all',
      margin: theme.spacing(1),
    },
    itemDescription: {
      fontSize: "0.75rem",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      height: "5.32em",
      lineHeight: 2.66,
      letterSpacing: "0.08333em",
      textTransform: "none",
      wordBreak: 'break-all',
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
              <React.Fragment>
                <Typography
                  className={classes.itemDescription}
                  component="p"
                  variant="overline"
                  color="textSecondary"
                >
                  {v.description}
                </Typography>
              </React.Fragment>
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
