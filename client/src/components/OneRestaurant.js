import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { detailedRestaurants } from './DummyData'

const styles = {
  card: {
    maxWidth: '80wh'
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  }
}

const OneRestaurant = props => {
  const { classes } = props
  const restaurant = detailedRestaurants[0]
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={restaurant.photos[0]}
          title={restaurant.name}
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {`${restaurant.name}, ${restaurant.price}`}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default withStyles(styles)(OneRestaurant)
