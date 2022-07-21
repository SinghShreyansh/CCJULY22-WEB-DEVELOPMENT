import './about.css';
import React from 'react';
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <section id="page-header" className="about-header">
        <h2 style={{color: 'white'}}>#KnowUs</h2>
        <p style={{color: 'white'}}>Read all information about Us! </p>
      </section>
      
      <seaction id="about-head" className="section-p1">
        <div>
          <h2>Who we are</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In ab alias ex rem quos reprehenderit, aliquam odio officiis. Vero quas ducimus eligendi est aperiam! Vel rem corporis error porro sit, molestiae assumenda tempora dolorem ratione blanditiis voluptatem quisquam obcaecati vitae non officia animi quia id provident amet. Amet nobis culpa molestiae similique, sit eum adipisci vel! Nihil tempora similique nemo.</p>
          <abbr>Create stunning images with as much or as little control as you like thanks to a choice of Basic and Creative modes.</abbr>
          <br /><br />
          {/* eslint-disable-next-line */}
          <marquee bgcolor="#ccc" loop="-1" scrollamount="5" width="100%">Create stunning imageswith as much or little control as you like thanks to choice of Basic and Creative modes.</marquee>
        </div>
      </seaction>

      <footer className="section-p1">
        <div className="col">
          <h4>Contact</h4>
          <p><strong>Address:</strong> 526 Wellington Road, Street 32, San Francisco</p>
          <p><strong>Phone:</strong> +01 2222 365 / (+91) 01 2345 6789</p>
          <p><strong>Hours:</strong> 10:00 - 18:00, Mon - Sat</p>
          <div className="follow">
            <h4 className="icon">Follow Us</h4>
            <div className="icon">
              <i className="fa-brands fa-facebook-f" style={{color: '#3b5998'}}></i>
              <i className="fa-brands fa-twitter" style={{color: '#55acee'}}></i>
              <i className="fa-brands fa-instagram" style={{color: '#fb3958'}}></i>
              <i className="fa-brands fa-pinterest-p" style={{color: '#E60023'}}></i>
              <i className="fa-brands fa-youtube" style={{color: '#FF0000'}}></i>
            </div>
          </div>
        </div>
        <div className="col">
          <h4>About</h4>
          <Link to="/">About Us</Link>
          <Link to="/">Website Information</Link>
          <Link to="/">Privacy Policy</Link>
          <Link to="/">Terms & Conditions</Link>
          <Link to="/">Contact Us</Link>
        </div>
        <div className="col install">
          <h4>Install App</h4>
          <p>From App Store or Google Play</p>
          <p>Secured Your Note</p>
        </div>

        <div className="copyright">
          <p>© 2021, Divyansh Singh etc - HTML CSS JS React BootStrap NodeJs ExpressJs MongoDB Note Template</p>
        </div>
      </footer>
    </>
  );
}

export default About;
