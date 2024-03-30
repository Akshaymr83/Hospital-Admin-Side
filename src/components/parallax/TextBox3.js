import React from 'react';
import img1 from '../Img/ward1.webp'
import img2 from '../Img/ward22.webp'
import img3 from '../Img/ward3.jpg'
import img4 from '../Img/ward4.jpg'


const TextBox3 = () => {
  const services = [
    {
      title: 'Emergency Care',
      description: '24/7 emergency medical services with skilled professionals.',
      imageUrl: img1,
    },
    {
      title: 'Specialized Treatments',
      description: 'Advanced treatments and therapies tailored to your unique needs.',
      imageUrl: img2,
    },
    {
      title: 'Primary Care',
      description: 'Comprehensive primary care services for individuals and families.We prioritize building long-term relationships with our patients, fostering trust and understanding to better address their healthcare needs. Whether you are seeking routine medical care, assistance with managing a health condition',
      imageUrl: img3,
    },
    {
      title: 'Diagnostic Imaging',
      description: 'State-of-the-art imaging technologies for accurate diagnosis.Our diagnostic imaging department is equipped with advanced technologies and staffed by highly trained radiologists and technicians who are dedicated to delivering exceptional care.',
      imageUrl: img4,
    },
  ];

  return (
    <div className='text-box' style={{height:'120vh',paddingTop:'5rem'}}  >
        <div><h2 style={{color:'white',fontSize:"60px",fontWeight:'600', textAlign:'center'}}>SERVICES</h2></div>
        <br></br><br/><br></br>
      <div className="row">
        {services.map((service, index) => (
          <div key={index} id='card' className="col-md-6 col-lg-3 mb-4">
            <div className="card h-100">
              <img src={service.imageUrl} className="card-img-top" alt={service.title} />
              <div className="card-body">
                <h5 className="card-title">{service.title}</h5>
                <p className="card-text">{service.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextBox3;
