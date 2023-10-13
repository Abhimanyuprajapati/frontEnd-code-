import React from "react";
import download1 from "../../assets/loginPage/image 118.png";
import download2 from "../../assets/loginPage/image 119.png";
import mobile from "../../assets/loginPage/Group 66444.png";
import logo from "../../assets/loginPage/fluent_home-16-filled.png";
import Image from "next/image";
const Download = () => {
  return (
    <>
      <section className="container-add">
        <div className="downloadImg">
          <Image src={mobile} alt="mpb" className="downloadImg1" />
          <Image src={logo} alt="mpb" className="downloadImg2" />
          <Image src={logo} alt="mpb" className="downloadImg3" />
        </div>
        <div className="scannerSection">
          <h2>Download your Shows to watch offline</h2>
          <p>Save your Favourites easily and always have somethings to watch </p>
          <hr className="hrdownload" />
          <div className="images">
            <h2>Download Our App</h2>
            <div>
              <a href="#">
                <Image src={download1} alt="image2" className="AppleStore" />
              </a>
              <a href="#">
                <Image src={download2} className="AppleStore" alt="image2" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Download;