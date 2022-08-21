import React, { useState } from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import WeatherListItem from '../WeatherList/WeatherListItem'

const SearchResults = ({ results = [], onItemClick }) => {
  return !results.length ? (
    <></>
  ) : (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <List aria-label='Search results'>
        {results.map((item: any, index: any, array: any) => {
          return (
            <React.Fragment key={item.id}>
              <WeatherListItem
                onClick={() => {
                  onItemClick(item)
                }}
                {...item}
              />
              {index !== array.length - 1 ? <Divider /> : null}
            </React.Fragment>
          )
        })}
      </List>
    </Box>
  )
}

export default SearchResults
