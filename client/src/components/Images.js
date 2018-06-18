import React, { Component } from 'react'
import Swipeable from 'react-swipeable'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

class Images extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = { imageIdx: 0 }
  }

  onSwiped(direction) {
    const { photos } = this.props.restaurant
    const change = direction === -1 ? -1 : 1
    const adjustedIdx = this.state.imageIdx + change
    let newIdx
    if (adjustedIdx >= photos.length) {
      newIdx = 0
    } else if (adjustedIdx < 0) {
      newIdx = photos.length - 1
    } else {
      newIdx = adjustedIdx
    }
    this.setState({ imageIdx: newIdx })
  }

  render() {
    const { photos, name, price } = this.props.restaurant
    const { imageIdx = 0 } = this.state

    return (
      <Swipeable
        className="swipe"
        trackMouse
        style={{ touchAction: 'none' }}
        preventDefaultTouchmoveEvent
        onSwipedLeft={() => this.onSwiped(1)}
        onSwipedRight={() => this.onSwiped(-1)}
      >
        <CardMedia
          className={this.props.media}
          image={photos[imageIdx]}
          title={name}
        >
          <div />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
              minHeight: '30em'
            }}
          >
            <button
              type="button"
              style={{
                width: '2em',
                backgroundColor: 'Transparent',
                border: 'none'
              }}
              onClick={() => this.onSwiped(-1)}
            >
              ⇦
            </button>
            <button
              type="button"
              style={{
                width: '2em',
                backgroundColor: 'Transparent',
                border: 'none'
              }}
              onClick={() => this.onSwiped(1)}
            >
              ⇨
            </button>
          </div>
          <Typography
            variant="headline"
            component="h3"
            className={this.props.text}
          >
            {`${name}, ${price}`}
          </Typography>
        </CardMedia>
      </Swipeable>
    )
  }
}

export default Images
