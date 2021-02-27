import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
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
        <Container maxWidth="lg">
          {props.children as React.ReactElement}
        </Container>
      </main>
    </div>
  )
}

export default Content
