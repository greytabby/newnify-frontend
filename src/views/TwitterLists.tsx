import React from 'react';
import { useEffect } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from '@material-ui/core'
import { Twitter } from '@material-ui/icons'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTwitterLists, fetchTwitterListTimeline, selectTwitterLists } from '../features/tweet/tweetSlice'

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
)

const TwitterLists: React.FC<{}> = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const lists = useSelector(selectTwitterLists)

  useEffect(() => {
    dispatch(fetchTwitterLists())
  }, [dispatch])

  const generate = () => {
    return lists.map((v) => {
      return (
        <ListItem button key={v.id} alignItems="flex-start" component="article" onClick={() => dispatch(fetchTwitterListTimeline(v.id_str))}>
          <ListItemAvatar>
            <Avatar variant="rounded" src={v.user.profile_image_url_https}/>
          </ListItemAvatar>

          <ListItemText
            primary={
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {v.name}
              </Typography>
            }
            secondary={v.description}
          />
        </ListItem>
      )
    })
  }

  return (
    <div className={classes.root}>
      <Typography>
        <Twitter color="primary" className={classes.titleIcon}/>
        Twitter Lists
      </Typography>
      <List>
        {generate()}
      </List>
    </div>
  );
}

export default TwitterLists
