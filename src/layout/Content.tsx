import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      width: "100%",
      marginBottom: theme.spacing(8)
    },
    content: {
      margin: theme.spacing(3)
    }
  }),
)

const Content: React.FC = (props) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <Box maxWidth="lg">
          {props.children}
        </Box>
      </main>
    </div>
  )
}

export default Content
