import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import Clear from '@material-ui/icons/Clear'

import Images from './Images'

const styles = {
  card: {
    margin: 0
  },
  media: {
    minHeight: '75vh',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: '15px'
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '0'
  },
  text: {
    lineHeight: 'inherit',
    color: 'white'
  }
}

const OneRestaurant = props => {
  const { classes, restaurant, handleLike, handleDislike } = props
  return (
    <div>
      <Card className={classes.card}>
        <Images
          restaurant={restaurant}
          media={classes.media}
          text={classes.text}
        />
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton
            aria-label="Get rid of this!"
            onClick={() => handleDislike(restaurant)}
          >
            <Clear color="primary" />
          </IconButton>
          <IconButton
            aria-label="Looks good! Add to my favourites"
            onClick={() => handleLike(restaurant)}
          >
            <FavoriteIcon color="secondary" />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  )
}

export default withStyles(styles)(OneRestaurant)
