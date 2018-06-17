import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Dialog from '@material-ui/core/Dialog'

class DeleteConfirmation extends Component {
  handleCancel = () => {
    this.props.onClose(this.props.value)
  }
  handleOk = () => {
    this.props.deleteUser(this.props.id)
    this.props.onClose()
  }
  render() {
    const { onClose, open } = this.props
    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        aria-labelledby="confirmation-dialog-title"
        open={open}
      >
        <DialogTitle id="confirmation-dialog-title">Delete Account</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure? This cannot be undone. Deleting your account will
            delete all your preferences and saved restaurants.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleOk} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default DeleteConfirmation
