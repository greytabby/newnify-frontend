import React from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { useSelector } from 'react-redux'
import { selectRssChannelFeeds } from './rssChannelsSlice'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'block',
    },
    refreshIcon: {
      marginLeft: theme.spacing(1),
    },
    channelTitle: {
      margin: theme.spacing(3),
      flexBasis: '100%',
    },
    date: {
      margin: theme.spacing(1),
    },
    inline: {
      padding: 5,
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
    const now = new Date()
    const pubDate = new Date(d)
    const elapsedDays = now.getDay() - pubDate.getDay()
    return `${String(elapsedDays)} day ago`
  }

  const generate = () => {
    if (feeds === null) {
      return
    }
    return feeds.items.map((v) => {
      return (
        <ListItem button key={v.link} alignItems="flex-start" component="a" href={v.link} target="_blank" rel="noopener noreferrer">
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
              <Typography
                component="span"
                variant="subtitle1"
                color="textSecondary"
              >
                {v.description.substring(0, 100) + '...'}
              </Typography>
            }
          />
        </ListItem>
      )
    })
  }

  return (
    <div className={classes.root}>
      <Box>
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
      <List>
        {generate()}
      </List>
    </div>
  );
}

export default Feeds
