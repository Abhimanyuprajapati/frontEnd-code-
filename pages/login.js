import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import facebook from "../assets/loginPage/Group 292 (1).png";
import google from "../assets/loginPage/Group 294.png";
import { useUserAuth } from "../context/UserAuthContext";
import withRedirect from "../components/Auth/Redirect";
import Head from "next/head";
const Login = () => {
  const { handleFacebookSignIn, handlegoogleSignIn } = useUserAuth();
  //state
  const [error, setError] = useState("");
  const [show_msg, setshow_msg] = useState(false);
  return (
    <>
      <Head>
        <meta property="al:iphone:url" content="jalva://login" />
        <meta property="al:iphone:app_store_id" content="6504566793" />
        <meta property="al:iphone:app_name" content="Jalva" />
        <meta property="al:ios:url" content="jalva://login" />
        <meta property="al:ios:app_store_id" content="6504566793" />
        <meta property="al:ios:app_name" content="Jalva" />
        <meta property="al:android:url" content="jalva://login" />
        <meta property="al:android:app_name" content="Jalva" />
        <meta property="al:android:package" content="com.jalva.android" />
        <meta property="al:web:url" content="https://www.jalva.app/login" />
      </Head>

      <div className="login_page_css">
        <h1>Login / Register</h1>
        <p style={{ color: "orange", margin: "10px", textAlign: "center" }}>
          {!show_msg ? "Please login and enjoy your favourites movies" : error}
        </p>
        <div className="sociallogin">
          <button onClick={handlegoogleSignIn} className="googleAuth">
            <Image
              src={google}
              width={50}
              height={50}
              style={{ marginRight: "0.7rem" }}
              alt="googleBtn"
            />{" "}
            Google
          </button>
          <button onClick={handleFacebookSignIn} className="googleAuth">
            <Image
              src={facebook}
              width={50}
              height={50}
              style={{ marginRight: "0.7rem" }}
              alt="facebookBtn"
            />{" "}
            Facebook
          </button>
        </div>
        <p style={{ color: "orange", margin: "10px", textAlign: "center" }}>
          Don't have an account ? <Link href="/register">Register here </Link>
        </p>
      </div>
    </>
  );
};

export default withRedirect(Login);
