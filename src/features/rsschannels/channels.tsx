import React from 'react';
import { useEffect } from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import {RssFeed} from '@material-ui/icons'
import { useSelector, useDispatch } from 'react-redux';
import { refreshAsync, fetchFeedsAsync, selectRssChannels } from './rssChannelsSlice'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
      padding: theme.spacing(1),
    },
    titleIcon: {
      marginTop: theme.spacing(1),
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    inline: {
      display: 'inline',
      padding: 5,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  }),
);

const ChannelList: React.FC<{}> = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const channels = useSelector(selectRssChannels)

  useEffect(() => {
    dispatch(refreshAsync())
  }, [dispatch])

  const generate = () => {
    return channels.map((v) => {
      return (
        <ListItem button key={v.id} alignItems="flex-start" component="article" onClick={() => dispatch(fetchFeedsAsync(v.id))}>
          <ListItemText
            primary={
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {v.title}
              </Typography>
            }
          />
        </ListItem>
      )
    })
  }

  return (
    <div className={classes.root}>
      <Typography>
        <RssFeed color="primary" className={classes.titleIcon}/>
        RSS Channels
      </Typography>
      <List>
        {generate()}
      </List>
    </div>
  );
}

export default ChannelList
