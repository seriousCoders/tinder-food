import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import classNames from 'classnames'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Delete from '@material-ui/icons/Delete'
import Send from '@material-ui/icons/Send'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit,
    paddingLeft: '1em'
  },
  iconSmall: {
    fontSize: 20
  }
})

const OneFavourite = ({
  handleChange,
  handleDelete,
  classes,
  expanded,
  panel,
  restaurant
}) => {
  const url = `https://www.google.com/maps/search/?api=1&query=${
    restaurant.latitude
  },${restaurant.longitude}`
  return (
    <ExpansionPanel
      expanded={expanded === panel}
      onChange={handleChange(panel)}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.heading}>{restaurant.name}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>{restaurant.address}</Typography>
      </ExpansionPanelDetails>
      <Divider />
      <ExpansionPanelActions>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={() => handleDelete(restaurant.id)}
        >
          Remove
          <Delete
            className={classNames(classes.rightIcon, classes.iconSmall)}
          />
        </Button>
        <Button
          size="small"
          variant="contained"
          color="primary"
          href={url}
          className={classes.button}
        >
          Go
          <Send className={classNames(classes.rightIcon, classes.iconSmall)} />
        </Button>
      </ExpansionPanelActions>
    </ExpansionPanel>
  )
}

export default withStyles(styles)(OneFavourite)
