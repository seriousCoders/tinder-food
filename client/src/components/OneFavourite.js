import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'

const OneFavourite = ({
  handleChange,
  heading,
  expanded,
  panel,
  restaurant
}) => {
  return (
    <ExpansionPanel
      expanded={expanded === panel}
      onChange={handleChange(panel)}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={heading}>{restaurant.name}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>{restaurant.address}</Typography>
      </ExpansionPanelDetails>
      <Divider />
      <ExpansionPanelActions>
        <Button size="small">Remove</Button>
        <Button size="small" color="primary">
          Go
        </Button>
      </ExpansionPanelActions>
    </ExpansionPanel>
  )
}

export default OneFavourite
