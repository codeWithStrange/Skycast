import React from 'react'
import './landing.css'
import { cloudSolid, halfSnow, halfSun, sunCloud, threeClouds } from './svg.js'

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Landing = () => {



  
  return (
    <div className='landingPage d-flex justify-content-between'>
        <div className="landing-left rounded-4 d-flex flex-column justify-content-between align-items-center py-4">
            <div className="landing-sun-cloud">
              <img src={sunCloud} alt="" />
            </div>
            <div className="landing-sun-snow d-flex gap-2">
              <img className='landing-sun' src={halfSun} alt="" />
              <img className='landing-snow' src={halfSnow} alt="" />
            </div>
            <div className="landing-threeclouds">
              <img src={threeClouds} alt="" />
            </div>
        </div>
        <div className="landing-right d-flex flex-column justify-content-between align-items-center py-5">
          <div className="skycast-logo text-center d-flex flex-column align-items-center">
            <div className="landing-logo d-flex justify-content-center align-items-center rounded-4">
              <img src={cloudSolid} alt="" />
            </div>
            <h1>Skycast</h1>
          </div>
          <div className="skycast-getstarted">
            <button className='get-started-btn btn btn-primary rounded-3 px-4'><span className='me-1'>Get Started</span><FontAwesomeIcon icon={faArrowRight}/></button>
          </div>
        </div>
    </div>
  )
}

export default Landing
