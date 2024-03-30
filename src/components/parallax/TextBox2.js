import React from 'react'
import png from '../Img/png.svg'

const TextBox2 = () => {
    return (
        <div className='text-box' style={{background:'white'}}>

            <h2  className='aboutus'  style={{color:'black',textAlign:'center'}}>ABOUT US</h2>
            <div className='aboutus-div'>
            <div className='aboutus-p-div'>
            <p className='aboutus-p'><h5 >WELCOME TO MEDI-CARE,</h5> 

At MEDI-CARE, we believe in the transformative power of compassionate healthcare. Founded with a vision to redefine medical excellence, we stand as a beacon of hope and healing in our community.

With a steadfast commitment to your wellbeing, we offer a comprehensive range of medical services designed to meet the diverse needs of our patients. From preventive care to advanced treatments, our dedicated team of healthcare professionals strives to deliver personalized, patient-centered care at every step of your journey.

At the heart of MEDI-CARE lies a culture of empathy, respect, and integrity. We understand that navigating the complexities of healthcare can be daunting, which is why we prioritize clear communication, transparency, and collaboration. Our aim is not only to treat ailments but also to empower individuals to take control of their health and lead fulfilling lives.

Driven by innovation and fueled by compassion, MEDI-CARE is more than just a healthcare provider – we are your partners in wellness. Whether you're seeking routine check-ups, specialized care, or emergency services, you can trust us to be by your side, every step of the way.

Thank you for entrusting us with your health. Welcome to MEDI-CARE, where your health is our priority.
        </p>
        </div>
        <div><div><button className='know-button'><p>KNOW MORE ABOUT US</p></button></div>
        <div><img src={png} style={{height:'300px',width:'300px'}}></img></div>
        </div>
        </div>
        </div>
    )
}

export default TextBox2