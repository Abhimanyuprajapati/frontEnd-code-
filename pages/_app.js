import '../styles/styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import { UserAuthContextProvider } from '../context/UserAuthContext';
import Script from 'next/script';
import Head from 'next/head';
import '../components/Player/Player.css';
import '../components/Gateways/App.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Script src="https://kit.fontawesome.com/c45aced2c8.js"/>
    {/*<Script src="https://securegw.paytm.in/merchantpgpui/checkoutjs/merchants/VOOVID43363199343335.js"></Script>*/}
    <Script src="https://securegw.paytm.in/merchantpgpui/checkoutjs/merchants/RABBIT83100137902764.js"></Script>
    <Head>
    <title>Jalwa</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet"></link>
    </Head>
    <UserAuthContextProvider>
    <Component {...pageProps} />
    </UserAuthContextProvider>
    </>
  )
}

export default MyApp
