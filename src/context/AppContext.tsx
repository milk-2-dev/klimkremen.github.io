import React, { FC, ReactNode, createContext, useState } from 'react'
import { useContext } from 'react'

interface IStateContext {
  showSearch: boolean
  setShowSearch: (val: boolean) => void
  canAddNewCity: boolean
  setCanAddNewCity: (val: boolean) => void
  isLoading: boolean
  setIsLoading: (val: boolean) => void
}

const initialState: IStateContext = {
  showSearch: false,
  setShowSearch: (val) => {},
  canAddNewCity: false,
  setCanAddNewCity: (val) => {},
  isLoading: false,
  setIsLoading: (val) => {},
}

export const AppContext = createContext(initialState)

type AppProviderProps = {
  children: ReactNode
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [canAddNewCity, setCanAddNewCity] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  return (
    <AppContext.Provider
      value={{
        showSearch,
        setShowSearch,
        canAddNewCity,
        setCanAddNewCity,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
