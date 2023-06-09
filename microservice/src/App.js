import { BrowserRouter, Route, Routes } from 'react-router-dom'
import QueryManage from './components/QueryManage'

const App = () => {



  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<QueryManage />} />

    </Routes>
    </BrowserRouter>
    
</>



    
  )
}

export default App