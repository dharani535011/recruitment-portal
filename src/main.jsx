
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Contextprovider } from './Components/Dataprovider.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <Contextprovider>
    <App /></Contextprovider></BrowserRouter>
  ,
)
