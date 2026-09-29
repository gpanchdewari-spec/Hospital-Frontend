import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Services from '../components/Services'
import DoctorsSection from '../components/DoctorsSection'
import Footer from '../components/Footer'
import { Book } from 'lucide-react'
import BookAppointment from '../components/Appointment'
import NotificationBar from '../components/NotificationBar'

import WelcomePopup from '../components/WelcomePopup'
import FindRightCare from '../components/FindRightCare'

const Home = () => {
  return (
    <div>
      <WelcomePopup/>
      <NotificationBar />
        <Navbar />
        <Hero></Hero>
        <FindRightCare/>
        <Services></Services>
        
        <DoctorsSection/>
        <BookAppointment/>
        <Footer/>
    </div>
  )
}

export default Home