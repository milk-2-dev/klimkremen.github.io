import './App.css'
import { Route, Routes } from 'react-router-dom'
import CityList from './features/CityList/CityList'
import City from './features/City/City'
import MainLayout from './layout/MainLayout'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<CityList />} />
        <Route path=':id' element={<City />} />
      </Route>
    </Routes>
  )
}

export default App
