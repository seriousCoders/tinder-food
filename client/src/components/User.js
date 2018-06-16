import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'

import DeleteConfirmation from './DeleteConfirmation'
import { logout, deleteUser } from '../store/user'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    minWidth: '75%',
    backgroundColor: 'lightgrey',
    size: 'big',
    borderRadius: '25px'
  },
  cssRoot: {
    backgroundColor: 'red'
  },
  column: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  avatar: {
    margin: 30
  },
  bigAvatar: {
    width: 60,
    height: 60
  }
})

class User extends Component {
  state = {
    open: false
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { classes, user } = this.props
    return (
      <div className={classes.column}>
        <Avatar
          alt={user.name}
          src={user.imageUrl}
          className={classNames(classes.avatar, classes.bigAvatar)}
        />
        <Button className={classes.button} onClick={this.props.logout}>
          Logout
        </Button>
        <Button
          className={classNames(classes.button, classes.cssRoot)}
          onClick={this.handleOpen}
        >
          Delete account
        </Button>
        <DeleteConfirmation
          open={this.state.open}
          onClose={this.handleClose}
          deleteUser={this.props.deleteUser}
          id={this.props.user.id}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  logout() {
    dispatch(logout())
  },
  deleteUser(id) {
    dispatch(deleteUser(id))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(User))
