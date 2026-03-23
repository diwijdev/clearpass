import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PatientList from './pages/PatientList'
import PatientDetail from './pages/PatientDetail'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-surface">
        <Routes>
          <Route path="/" element={<PatientList />} />
          <Route path="/patient/:id" element={<PatientDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App