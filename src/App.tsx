import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { DesignPage } from './routes/DesignPage'
import { RootRedirect } from './routes/RootRedirect'
import { ViewPage } from './routes/ViewPage'

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-dvh flex-col bg-slate-50">
        <Header />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<RootRedirect />} />
            <Route path="/design" element={<DesignPage />} />
            <Route path="/view" element={<ViewPage />} />
            <Route path="*" element={<RootRedirect />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
