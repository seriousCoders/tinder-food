import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Whatshot from '@material-ui/icons/Whatshot'
import Favorite from '@material-ui/icons/Favorite'
import Face from '@material-ui/icons/Face'

const TabBar = ({ handleChange, value }) => {
  return (
    <AppBar position="static" color="default">
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        fullWidth
        centered
      >
        <Tab icon={<Face />} />
        <Tab icon={<Whatshot />} />
        <Tab icon={<Favorite />} />
      </Tabs>
    </AppBar>
  )
}

export default TabBar
