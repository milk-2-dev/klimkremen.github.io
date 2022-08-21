import React, { useEffect, useState } from 'react'
import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import useDebounce from '../../hooks/useDebounce'

const SearchDiv = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    // marginLeft: theme.spacing(1),
    // width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: theme.spacing(10),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      // width: '12ch',
      // '&:focus': {
      //   width: '20ch',
      // },
    },
  },
}))

const SearchInput = ({ onChange }) => {
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value, 500)

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  useEffect(() => {
    onChange(value)
  }, [debouncedValue])

  return (
    <SearchDiv>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        autoFocus
        placeholder='Search city…'
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleChange}
      />
    </SearchDiv>
  )
}

export default SearchInput
