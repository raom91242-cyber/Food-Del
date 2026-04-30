import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

// Import pages
import Home from './pages/Home/Home'
import Menu from './pages/Menu/Menu'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import SignIn from './pages/SignIn/SignIn'
import SignUp from './pages/SignUp/SignUp'
import ContactUs from './pages/ContactUs/ContactUs'
import Profile from './pages/Profile/Profile'
import Discounts from './pages/Discounts/Discounts'
import Combos from './pages/Combos/Combos'
import MobileApp from './pages/MobileApp/MobileApp'
import NotFound from './pages/NotFound/NotFound'

// Scroll to top on route change
const ScrollToTop = () => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return null
}

const App = () => {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  // Don't show Navbar and Footer on admin routes
  if (isAdminRoute) {
    return (
      <div className='app'>
        <Routes>
          <Route path='/admin/*' element={<div>Admin Routes</div>} />
        </Routes>
      </div>
    )
  }

  return (
    <div className='app'>
      <ScrollToTop />
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/shop' element={<Menu />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<PlaceOrder />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/about' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/discounts' element={<Discounts />} />
        <Route path='/combos' element={<Combos />} />
        <Route path='/mobile-app' element={<MobileApp />} />

        {/* 404 - Page Not Found */}
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App