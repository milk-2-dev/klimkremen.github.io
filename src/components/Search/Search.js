import { useEffect } from 'react'
import useCitySearch from '../../hooks/useCitySearch'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import SearchInput from './SearchInput'
import SearchResults from './SearchResults'

const Search = ({ open, close, onClickResultItem }) => {
  const { searchResults, setSearcResults, setSearchQuery } = useCitySearch()

  useEffect(() => {
    setSearcResults([])
  }, [open])

  return (
    <Dialog
      fullWidth
      maxWidth='sm'
      open={open}
      onClose={() => {
        close()
      }}
      scroll={'paper'}
    >
      <DialogContent dividers={true}>
        <SearchInput onChange={(value) => setSearchQuery(value)} />
        <SearchResults
          results={searchResults}
          onItemClick={(item) => {
            onClickResultItem(item)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}

export default Search
