import Carousel from 'react-bootstrap/Carousel';

import img1 from "../Img/c2.jpg"
import img2 from "../Img/c5.jpg"
import img3 from "../Img/c6.jpg"
import "./carousel.css"

function Ad() {
  return (
    <Carousel fade style={{background:'white'}}>
      <Carousel.Item>
        <div className='carousel-image-container'>
          <img className='Cimage' src={img1} alt="First slide"></img>
          <div className="carousel-text" id='Carousel1'>
            <h3 style={{color:'white'}}>Your Health, Our Priority:<br></br> <br></br>Welcome to</h3>
            <h1><span className='medicarelogo' style={{fontSize:'90px',fontWeight:'800'}}>MEDi-</span><span className='care' style={{fontSize:'90px',fontWeight:'800'}}>CARE</span></h1>
           
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className='carousel-image-container'>
          <img className='Cimage' src={img2} alt="Second slide"></img>
          <div className="carousel-text" id='Carousel2'>
            <h1>"Leading the Way in<br></br> Medical Excellence<br></br> Learn About MediCare"</h1>
           
           
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className='carousel-image-container'>
          <img className='Cimage' src={img3} alt="Third slide"></img>
          <div className="carousel-text" id='Carousel3'>
            <h2>Your Health, 
              <br></br>Our Priority</h2>
              <h3>Healing Begins Here, Discover<br></br> Our Dedicated Medical Team.</h3>
            
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}
 
export default Ad;
