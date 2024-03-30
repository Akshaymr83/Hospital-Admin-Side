import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Nave from '../Nav';
import TextBox from '../parallax/TextBox';
import ImageOne from '../parallax/ImageOne';
import ImageTwo from '../parallax/ImageTwo';
import ImageThree from '../parallax/ImageThree';
import Ad from '../Carousels/Carousel';
import TextBox3 from '../parallax/TextBox3';
import TextBox2 from '../parallax/TextBox2';
import "../parallax/parallax.css";
import Down from '../DownNav/DownNav';

function Frontpage() {
  return (
    <div>
      <Nave />
      <Ad />
      <TextBox />
      <ImageOne />
      <TextBox2 />
      <ImageTwo />
      <TextBox3 />
      <ImageThree />
      {/* <Link to="/employee">
        <Button>Employee</Button>
      </Link>
      <br />
      <Link to="/departmentpost">
        <Button>Department</Button>
      </Link>
      <br />
      <Link to="/DepHead">
        <Button>Department Head</Button>
      </Link> */}
      <Down/>
    </div>
  );
}

export default Frontpage;
