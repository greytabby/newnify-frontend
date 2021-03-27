import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      width: "100%",
      margin: theme.spacing(3),
      marginBottom: theme.spacing(8)
    },
  }),
)

const Content: React.FC = (props) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <main>
        <Box justifyContent="center">
          {props.children}
        </Box>
      </main>
    </div>
  )
}

export default Content
