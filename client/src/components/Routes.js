import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import SwipeableViews from 'react-swipeable-views'
import Typography from '@material-ui/core/Typography'

import TabBar from './TabBar'
import User from './User'

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100wh'
  }
})

class Routes extends Component {
  state = {
    value: 0
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  handleChangeIndex = index => {
    this.setState({ value: index })
  }

  render() {
    const { classes, theme } = this.props
    return (
      <div className={classes.root}>
        <TabBar handleChange={this.handleChange} value={this.state.value} />
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <User />
          </TabContainer>
          <TabContainer dir={theme.direction}>Item Two</TabContainer>
          <TabContainer dir={theme.direction}>Item Three</TabContainer>
        </SwipeableViews>
      </div>
    )
  }
}

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  )
}

export default connect()(withStyles(styles, { withTheme: true })(Routes))
// mapStateToProps,
// mapDispatchToProps
