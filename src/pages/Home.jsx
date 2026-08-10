import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Services from '../components/Services'
import DoctorsSection from '../components/DoctorsSection'
import Footer from '../components/Footer'
import { Book } from 'lucide-react'
import BookAppointment from '../components/Appointment'

const Home = () => {
  return (
    <div>
        <Navbar />
        <Hero></Hero>
        <Services></Services>
        <DoctorsSection/>
        <BookAppointment/>
        <Footer/>
    </div>
  )
}

export default Home