import '../styles/styles.css';     //using this one sir 
import "../styles/landing.css";
import 'bootstrap/dist/css/bootstrap.css';
import { UserAuthContextProvider } from '../context/UserAuthContext';
import Head from 'next/head';
import '../components/Player/Player.css';
import '../components/Gateways/App.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Jalva</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
        <meta name="facebook-domain-verification" content="tfn551w93cl3xfvdajja7g7fnrv4rn" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet"></link>
      </Head>
      <UserAuthContextProvider>
        <Component {...pageProps} />
      </UserAuthContextProvider>
    </>
  )
}

export default MyApp
