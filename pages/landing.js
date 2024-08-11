import React, { useState, useEffect, useRef } from "react";
import imgmob from "../assets/landing/imgmob.svg";
import logojal from "../assets/landing/jalva.svg";
import ottback from "../assets/landing/ottback.svg";
import mobdownload from "../assets/landing/mobdownload.svg";
import playstore from "../assets/landing/playstore.svg";
import barcode from "../assets/landing/barcode.svg";
import google from "../assets/landing/google.svg";
import webcoming from "../assets/landing/webcoming.svg";
import fedback from "../assets/landing/fedback.svg";
import thumb from "../assets/landing/thumb.svg";
import call from "../assets/landing/call.svg";
import mail from "../assets/landing/mail.svg";
import arrow from "../assets/landing/arrow.svg";
import plansection from "../assets/landing/plansection.svg";
import watchphoto from "../assets/landing/watchphoto.svg";
import watchbold from "../assets/landing/watchbold.svg";
import trailer from "../assets/landing/trailer.svg";
import circle from "../assets/landing/circle.svg";
import watchcircle from "../assets/landing/watchcircle.svg";
import plancircle from "../assets/landing/plancircle.svg";
import closeBtn from "../assets/image/Vector.png";
import { useUserAuth } from "../context/UserAuthContext";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
{/*import Popup from "../components/popup";*/}
const static_url = process.env.NEXT_PUBLIC_CDN_STATIC;

const Landing = () => {
  const router = useRouter();
  const { allSubscriptions, Upcomingcontents } = useUserAuth();
  const [container, setContainer] = useState([]);
  const [array, setArray] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState(null);

  useEffect(() => {
    const fetchUpcomingContents = async () => {
      const upcomingData = await Upcomingcontents();
      setContainer(upcomingData);
    };

    const fetchSubscriptions = async () => {
      const data = await allSubscriptions();
      setArray(data);
      const oneMonthSubscription = data.find((sub) => sub.period === 30);
      console.log("one month=>", oneMonthSubscription);
      setSubscriptionData(oneMonthSubscription);
    };

    fetchUpcomingContents();
    fetchSubscriptions();

    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setShowPopup(false);
  };

  const redirectToGooglePlay = () => {
    const url =
      "https://play.google.com/store/apps/details?id=com.jalva.android";
    const win = window.open(url, "_blank");
    win.focus();
  };

  const scrollToRef = useRef(null);
  const scrollToTop = () => {
    if (scrollToRef.current) {
      scrollToRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const backgroundColors = [
    "linear-gradient(136.83deg, rgba(211, 97, 13, 0.2) 0%, rgba(203, 10, 27, 0.2) 100%)",
    "linear-gradient(136.83deg, rgba(211, 191, 13, 0.2) 0%, rgba(10, 203, 29, 0.2) 100%)",
    "linear-gradient(136.83deg, rgba(13, 211, 199, 0.2) 0%, rgba(37, 10, 203, 0.2) 100%)",
    "linear-gradient(136.83deg, rgba(183, 13, 211, 0.2) 0%, rgba(37, 10, 203, 0.2) 100%)",
  ];

  const upcomingpage = () => {
    router.push("/upcoming");
  };

  const redirectHome = ()=>{
    router.push("/");
  }

  console.log(subscriptionData);
  return (
    <>
      {showPopup && (
        <>
          <div className="popupStyles">
            <div className="popupContentStyles">
              <button onClick={closePopup} className="closeButtonStyles">
                <Image src={closeBtn} width={20} height={20} alt="close" />
              </button>
              <div className="popupplanstyle">
                <h1>Our Pricing</h1>
                <p>Get Jalva Membership Only At</p>
                <div className="popupStylesdiv">
                  <p className="popupPlan">
                    <span>
                      {subscriptionData.price.map((z, index) => {
                        return <span key={index}>₨ {z.value / 100} </span>;
                      })}
                    </span>
                    &nbsp;&nbsp;
                    <span>{subscriptionData.name}</span>
                  </p>

                  {subscriptionData.benefits.map((x, index) => {
                    return (
                      <p
                        key={index}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Image
                          src={plancircle}
                          width={20}
                          height={20}
                          alt="img"
                        />
                        &nbsp;{x}
                      </p>
                    );
                  })}

                  <button onClick={() => router.push(`/gateway/${subscriptionData._id}`)}>
                    <Link
                      href="https://play.google.com/store/apps/details?id=com.jalva.android"
                      target="_blank"
                    >
                      Subscribe Now
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="landingPage">
        {/* header section  */}
        <header className="ottheader" ref={scrollToRef} id="top">
          <Image src={logojal} width={100} height={50} alt="img"  onClick={redirectHome} style={{cursor:"pointer"}}/>
          <button onClick={redirectToGooglePlay}>Download Jalva APP</button>
        </header>

        {/* ott section  */}
        <div className="ottcomp">
          <span className="ottpara">
            <p style={{ color: "white" }}>
              One of the{" "}
              <span
                style={{
                  background:
                    "linear-gradient(98.51deg, #A20AFF 43%, #EF1362 73.63%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Best
              </span>{" "}
              & <br />
              Leading{" "}
              <span
                style={{
                  background:
                    "linear-gradient(98.51deg, #A20AFF 43%, #EF1362 73.63%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                OTT App
              </span>{" "}
              with <br />
              Uncut Web Series
            </p>
            <button onClick={redirectToGooglePlay}>Download Jalva APP</button>
          </span>
          <span>
            <Image
              src={imgmob}
              width={500}
              height={500}
              alt="img"
              className="ottmobilebackground"
            />
          </span>
          <Image
            src={ottback}
            width={200}
            height={100}
            alt="img"
            className="ottback"
          />
        </div>

        {/* youtube section  */}
        <div className="youtubesection">
          <div className="youtubesection1">
            <Image src={trailer} width={500} height={500} alt="img" />
          </div>
          <div className="youtubesection2">
            <div className="scroll">
              <Link
                href="https://www.youtube.com/watch?v=0qf3HOpTGrE?si=FPjkqiHQ4_4pkyLE"
                target="_blank"
              >
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/0qf3HOpTGrE?si=FPjkqiHQ4_4pkyLE"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </Link>
            </div>
            <div className="scroll">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/gfcNIt4PmdY?si=VO08iNBYbCm-kvKp"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
            <div className="scroll">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/sM-oFqKZ-mM?si=z2LtOk0qxeSlgF6q"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
            <div className="scroll">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/NMiG80b6kVc?si=dJ_T2pcVvTlr7NxT"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        {/* download section  */}
        <div className="landingdownloadsection">
          <div className="downloadimg">
            <Image src={mobdownload} width={500} height={500} alt="img" />
          </div>
          <div className="downloadinfo">
            <h1>
              <p style={{ color: "white" }}>
                Download your shows to <br />
                watch offline
              </p>
            </h1>
            <p>
              <p style={{ color: "white" }}>
                Save your favourites easily and <br />
                always havesomething to watch.
              </p>
            </p>
            <p className="downlo">
              <span className="downgoogle">
                <Image
                  src={google}
                  width={200}
                  height={200}
                  alt="img"
                  onClick={redirectToGooglePlay}
                />
                <Image
                  src={playstore}
                  width={200}
                  height={200}
                  alt="img"
                  onClick={redirectToGooglePlay}
                />
              </span>
              <span className="downgoogle">
                <Image src={barcode} width={200} height={200} alt="img" />
              </span>
            </p>
          </div>
        </div>

        {/* upcoming section  */}
        <div className="upcomingland">
          <div className="uplandtrans">
            <Image src={webcoming} width={100} height={100} alt="img" />
          </div>
          <div className="container">
            {container.map((x, index) => {
              return (
                <div key={index} className="container1">
                  <div className="container2">
                    <Image
                      src={circle}
                      width={150}
                      height={150}
                      alt="img"
                      className="container3"
                    />
                    <h1>{index + 1}</h1>
                  </div>
                  <div className="upcomingImage">
                    <Link href="#">
                      <Image
                        src={
                          static_url +
                          "/" +
                          x.resourcePath +
                          "/" +
                          x.landscapeNormal
                        }
                        alt="sldi"
                        width="540"
                        height="370"
                        onClick={upcomingpage}
                        className="mobilewidthland"
                      />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* feedback section  */}
        <div className="fedbackpage">
          <div className="testiomonial">
            <Image src={fedback} width={100} height={100} alt="img" />
          </div>
          <div className="feedbackbox">
            <div className="fedbackbox fedbackbox01">
              <div className="descfed">
                <span>{"M"}</span>
                <span>
                  <p> Malik Azhar</p>
                  <p>⭐⭐⭐⭐⭐ June 10,2023</p>
                </span>
                <span>
                  <Image src={thumb} width={30} height={30} alt="img" />
                </span>
              </div>
              <div className="descfed01">
                <p>
                  Really a straight forward app, nothing hidden or shady
                  regarding subscription, effortless viewing, almost no
                  buffering, picture quality superb, sound is best . Only one
                  thing I think in regard to present day , a bit more boldness
                  pertaining to the videos is expected.
                </p>
              </div>
            </div>

            <div className="fedbackbox fedbackbox02">
              <div className="descfed">
                <span>{"A"}</span>
                <span>
                  <p>Akshay Kamble</p>
                  <p>⭐⭐⭐⭐⭐ August 05,2023</p>
                </span>
                <span>
                  <Image src={thumb} width={30} height={30} alt="img" />
                </span>
              </div>
              <div>
                <p>
                  Such a nice app for all types of movies, series,drama,
                  thriller and all content. Recently my Jalva account is hacked
                  and I contact Jalva customer support, They help me to transfer
                  my subscription to new account. He is very helpful and
                  understanding guy. All new customer keep streaming with Jalva
                  😊
                </p>
              </div>
            </div>

            <div className="fedbackbox fedbackbox03">
              <div className="descfed">
                <span>{"V"}</span>
                <span>
                  <p> Vivek Singh</p>
                  <p>⭐⭐⭐⭐⭐ Jan 27,2024</p>
                </span>
                <span>
                  <Image src={thumb} width={30} height={30} alt="img" />
                </span>
              </div>
              <div>
                <p>
                  My issue was resolved. If any one facing same issue pls
                  contact to Jalva technical support. They will update your app
                  by manually. After that every thing can access. Below issue
                  solved.
                </p>
              </div>
            </div>

            <div className="fedbackbox fedbackbox04">
              <div className="descfed">
                <span>{"P"}</span>
                <span>
                  <p>Pravin Kevat</p>
                  <p>⭐⭐⭐⭐⭐ June 17,2024</p>
                </span>
                <span>
                  <Image src={thumb} width={30} height={30} alt="img" />
                </span>
              </div>
              <div>
                <p>
                  At first i was not sure about downloading the App , but once i
                  downloaded it trust me i am happy that I believed my
                  instincts... Great App awesome content and highly
                  appreciated... I will definitely recommend it to my friends...
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* watch section  */}
        <div className="landingWatch">
          <div className="landwatchphoto">
            <Image src={watchphoto} width={600} height={500} alt="img" />
          </div>
          <div className="landwatchdetails">
            <div className="landwatchdetails1">
              <Image src={watchbold} width={600} height={600} alt="img" />
            </div>
            <div className="landwatchdetails2">
              <h1>Why to Watch on Jalva App?</h1>
              <p>
                {" "}
                <Image
                  src={watchcircle}
                  width={20}
                  height={20}
                  alt="img"
                />{" "}
                &nbsp; More than 1Cr Downloads
              </p>
              <p>
                {" "}
                <Image
                  src={watchcircle}
                  width={20}
                  height={20}
                  alt="img"
                />{" "}
                &nbsp; More than 50 Web Series
              </p>
              <p>
                {" "}
                <Image
                  src={watchcircle}
                  width={20}
                  height={20}
                  alt="img"
                />{" "}
                &nbsp; 5000+ Watch hours
              </p>
              <p>
                {" "}
                <Image
                  src={watchcircle}
                  width={20}
                  height={20}
                  alt="img"
                />{" "}
                &nbsp; Hot & Diverse Content Library
              </p>
              <p>
                {" "}
                <Image
                  src={watchcircle}
                  width={20}
                  height={20}
                  alt="img"
                />{" "}
                &nbsp; Superhit Web Series with Most diversified Genres such as
                Drama, Romance, Fantasy, Comedy, Suspense & more
              </p>
              <p>
                {" "}
                <Image
                  src={watchcircle}
                  width={20}
                  height={20}
                  alt="img"
                />{" "}
                &nbsp; Get Rich Visuals Content Library
              </p>
              <p>
                {" "}
                <Image
                  src={watchcircle}
                  width={20}
                  height={20}
                  alt="img"
                />{" "}
                &nbsp; More than 1000Cr Views
              </p>
              <p>
                {" "}
                <Image
                  src={watchcircle}
                  width={20}
                  height={20}
                  alt="img"
                />{" "}
                &nbsp; Free Unlimited Download
              </p>
            </div>
          </div>
        </div>

        {/* Plan section  */}
        <div className="PlansLanding">
          <div className="planimg">
            <Image src={plansection} width={500} height={500} alt="img" />
          </div>
          <div className="Plansbox">
            {array.map((x, index) => {
              const backgroundColor =
                backgroundColors[index % backgroundColors.length];
              return (
                <div
                  className="Plansbox1"
                  key={index}
                  style={{ background: backgroundColor }}
                >
                  <p
                    style={{
                      background: backgroundColor,
                      border: `2px solid ${backgroundColor}`,
                    }}
                    className="Plansbox2"
                  >
                    <span>
                      {x.price.map((z, index) => {
                        return <span key={index}>₨ {z.value / 100} </span>;
                      })}
                    </span>
                    &nbsp;&nbsp;
                    <span>{x.name}</span>
                  </p>

                  {x.benefits.map((x, index) => {
                    return (
                      <p
                        key={index}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Image
                          src={plancircle}
                          width={20}
                          height={20}
                          alt="img"
                        />
                        &nbsp;{x}
                      </p>
                    );
                  })}

                  <button onClick={() => router.push(`/gateway/${x._id}`)}>
                    <Link
                      href="https://play.google.com/store/apps/details?id=com.jalva.android"
                      target="_blank"
                    >
                      Subscribe Now
                    </Link>
                  </button>
                </div>
              );
            })}
          </div>
          <div className="buttonPlan">
            <button onClick={redirectToGooglePlay}>Download Jalva APP</button>
          </div>
        </div>

        {/* Footer section */}
        <div className="landfooter">
          <Image
            src={arrow}
            width={100}
            height={100}
            alt="img"
            className="arrow"
            onClick={scrollToTop}
          />
          <Image src={logojal} width={150} height={100} alt="img" />
          <h1>Want to get in touch with us? You are most welcome!</h1>
          <p>
            For any Enquiry, Feedbacks, Complaints, Subscription Plans Contact
            Us On
          </p>
          <p className="landfooter01">
            <span>
              <Image src={call} width={20} height={20} alt="img" />
              &nbsp;+91-8655906637
            </span>
            <span>
              {" "}
              <Image src={mail} width={20} height={20} alt="img" />
              &nbsp;contact@Jalva.app
            </span>
          </p>
          <p>
            © 2024 All Rights Reserved to{" "}
            <span style={{ color: "orange" }}>Jalva</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Landing;
