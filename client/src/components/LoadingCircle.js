import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  }
})

const LoadingCircle = props => {
  const { classes, progress, variant } = props
  return (
    <CircularProgress
      className={classes.progress}
      color="secondary"
      variant={variant}
      size={150}
      value={progress}
    />
  )
}

export default withStyles(styles)(LoadingCircle)
