import { useState } from "react";
import "./About.css";
import TwitterIcon from '@mui/icons-material/Twitter';
// import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import download from '../images/logo.png';
import hall from '../images/hall.png';
import muskan from '../images/muskan.jpg';
import anamika from '../images/anamika.jpg';
import ridhi from '../images/riddhi.jpg';
import alka from '../images/alka.jpg';
import upasana from '../images/upasana.jpg';
import harshita from '../images/harshita.JPG';
import NavBar from "../components/Navbar";

function Tabs() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div>
      < NavBar />
      <div className="container1">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Celestial Biscuit
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          Hall of Fame
        </button>
        <button
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          Team
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"} >
          <img src={download} height={100} className="cbpic" />
          <p className="cbd">
            <b>Celestial Biscuit</b> is here to carry forward the ideology of problem solving and innovation 
            with technology for the greater good in our minds, hearts and souls. We are a bunch of enthusiastic 
            people from IGDTUW who are passionate about what we do and take pride in our university, our work and 
            our profession. We are the people who believe in the fact that change is something that doesn't come 
            just by dreaming about it but comes by working hard for it to make it a true reality.
          </p>

          <div className='icons'>
                    <a href='https://mobile.twitter.com/cbigdtuw'>
                    <TwitterIcon className='icon' />
                    </a>
                    <a href='https://www.instagram.com/celestialbiscuit/'>
                    <InstagramIcon className='icon'/>
                    </a>
                    <a href='https://www.linkedin.com/company/celestial-biscuit-igdtuw/'>
                    <LinkedInIcon className='icon'/>
                    </a>
                </div>

        </div>

        <div
          className={toggleState === 2 ? "content2  active-content" : "content"}
        >
          
          <p>
          Hall of Fame is a web portal that provides a platform for students of Indira Gandhi Delhi Technical University for Women (IGDTUW) to showcase their achievements in various categories such as internships, hackathons, technical programs, speakers at conferences, coding contests, non-technical programs, scholarships, internships & placements.
          </p>
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          <div className="flip-cardr">
            <div className="flip-cardr-inner">
              <div className="flip-cardr-front">
                <img src={ridhi} className="ridhi" />
              </div>
              <div className="flip-cardr-back">
                <h2 className="all">Riddhi</h2>
                <h3 className="ridhid" >Web Developer</h3>
                <h4 className="ridhid">Majoring in Computer Science @ IGDTUW</h4>

              </div>
            </div>
          </div>
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src={muskan} height={280} width={250} className="muskan" />
              </div>
              <div class="flip-card-back">
                <h2 className="all">Muskan</h2>
                <h3 className="muskand">Web Developer</h3>
                <h4 className="muskand">Majoring in Computer Science - Artificial Intelligence @ IGDTUW</h4>

              </div>
            </div>
          </div>

          <div className="flip-carda">
            <div className="flip-carda-inner">
              <div className="flip-carda-front">
                <img src={anamika} height={300} width={250} className="anamika" />
              </div>
              <div class="flip-carda-back">
                <h2 className="all">Anamika</h2>
                <h3 className="anamikad">Web Developer</h3>
                <h4 className="anamikad">Majoring in ComputerScience - Artificial Intelligence @ IGDTUW</h4>
              </div>
            </div>
          </div>

          <div className="flip-cardl">
            <div className="flip-cardl-inner">
              <div className="flip-cardl-front">
                <img src={alka} height={300} width={300} className="alka" />
              </div>
              <div className="flip-cardl-back">
                <h2 className="all">Alka</h2>
                <h3 className="alkad">Web Developer</h3>
                <h4 className="alkad">Majoring in Computer Science - Artificial Intelligence @ IGDTUW</h4>

              </div>
            </div>
          </div>

          <div className="flip-cardu">
            <div className="flip-cardu-inner">
              <div className="flip-cardu-front">
                <img src={upasana} height={300} width={300} className="upasana" />
              </div>
              <div className="flip-cardu-back">
                <h2 className="all">Upasana</h2>
                <h3 className="upasanad">Web Developer</h3>
                <h4 className="upasanad">Majoring in Information Technology @ IGDTUW</h4>

              </div>
            </div>
          </div>

          <div className="flip-cardh">
            <div className="flip-cardh-inner">
              <div className="flip-cardh-front">
                <img src={harshita} height={300} width={300} className="harshita" />
              </div>
              <div className="flip-cardh-back">
                <h2 className="all">Harshita</h2>
                <h3 className="harshitad">Web Developer</h3>
                <h4 className="harshitad">Majoring in Computer Science - Artificial Intelligence @ IGDTUW</h4>

              </div>
            </div>
          </div>





        </div>
      </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Tabs;
