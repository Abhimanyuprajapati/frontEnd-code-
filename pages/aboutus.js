import React, { useState } from "react";
import withState from "../components/Auth/State";

const Aboutus = () => {

  addToFavourite();
  return (
    <div className="AboutUsPage_css">
      <span>
        <span style={{ color: "rgba(246, 173, 27, 1)" }}>About</span> Us
      </span>
      <h5>Get hooked to binge-worthy content</h5>
      <h5>tailored to your taste in your language!</h5>
      <p>
        Jalva is a video streaming service that offers a wide variety of genres
        from drama, horror, suspense, thriller to comedy & beyond. Binge watch
        from our collection of web series, movies, Jalva Originals and more in
        your regional language. Start a Free Trial and your first 2 videos will
        be on us. Enjoy unlimited video streaming and downloads at a pocket
        friendly price all year long.
      </p>
      <ul>
        <li>check Flip through trailers to help choose what to watch first.</li>
        <li>
          check Personalized content according to your geographical location.
        </li>
        <li>check Unlimited HD streaming and downloading 24x7.</li>
        <li>check Personalize your membership plan to suit your need.</li>
        <li>check Access content anywhere in the world.</li>
        <li>check Download videos for offline viewing-on-the-go.</li>
      </ul>
      <div className="detail_comn">
        <p>
          This website is owned by{" "}
          <strong>Films Garden Private Limited.</strong>
        </p>
        <p>
          24 Heera Panna M.R. No.2 Oshiwara, Shreeji Hotel, Andheri, Mumbai -
          400053, Maharashtra.
        </p>
        <p>Toll Free :</p>
      </div>
    </div>
  );
};

export default withState(Aboutus);
