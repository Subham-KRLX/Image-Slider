import { useState } from 'react'
import './App.css'
import ImageSlider from './Components/ImageSlider/ImageSlider'
import Header from './Components/Header'
import Footer from './Components/Footer'

function App() {
  const slides = [
    {
      image: '/images/1.png',
      title: 'Neon Horizon',
      description: 'Explore the depths of the cybernetic metropolis where light meets darkness.'
    },
    {
      image: '/images/2.png',
      title: 'Quantum Core',
      description: 'The heart of the machine beats with infinite processing power.'
    },
    {
      image: '/images/3.png',
      title: 'Data Stream',
      description: 'Navigating the endless rivers of information in the digital ether.'
    },
    {
      image: '/images/4.png',
      title: 'Cyber Synth',
      description: 'Synthetic organisms evolving in a post-biological ecosystem.'
    },
    {
      image: '/images/5.png',
      title: 'Future Tech',
      description: 'Advanced robotics systems online and ready for deployment.'
    }
  ];

  return (
    <div className="App">
      <Header />

      <div className="slider-wrapper">
        <ImageSlider slides={slides} />
      </div>

      <Footer />
    </div>
  )
}

export default App
