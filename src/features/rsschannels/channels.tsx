import React from 'react';
import { useEffect } from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton'
import Refresh from '@material-ui/icons/Refresh'
import { useSelector, useDispatch } from 'react-redux';
import { refreshAsync, fetchFeedsAsync, selectRssChannels } from './rssChannelsSlice'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 10,
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    refreshIcon: {
      alignContent: 'left',
      marginLeft: theme.spacing(1),
    },
    inline: {
      display: 'inline',
      padding: 5,
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
    console.log("Generate")
    return channels.map((v) => {
      return (
        <div>
          <ListItem button key={v.id} alignItems="flex-start" component="article" onClick={() => dispatch(fetchFeedsAsync(v.id))}>
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {v.title}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </div>
      )
    })
  }

  return (
    <div className={classes.root}>
      <IconButton className={classes.refreshIcon} onClick={() => dispatch(refreshAsync()) }>
        <Refresh/>
      </IconButton>
      <Typography>
        RSS Channels
      </Typography>
      <List>
        {generate()}
      </List>
    </div>
  );
}

export default ChannelList
