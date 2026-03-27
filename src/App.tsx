import { Navigate, Route, Routes } from 'react-router-dom'

import { AboutPage } from './pages/AboutPage'
import { HomePage } from './pages/HomePage'
import { ServicesPage } from './pages/ServicesPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}