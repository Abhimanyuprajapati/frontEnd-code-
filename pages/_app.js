import '../styles/styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import { UserAuthContextProvider } from '../context/UserAuthContext';
import Script from 'next/script';
import Head from 'next/head';
import '../components/Player/Player.css';
import '../components/Gateways/App.css';
import '../styles/login.css';
function MyApp({ Component, pageProps }) {
  return (
    <>
    <Script src="https://kit.fontawesome.com/c45aced2c8.js"/>
    {/*<Script src="https://securegw.paytm.in/merchantpgpui/checkoutjs/merchants/VOOVID43363199343335.js"></Script>*/}
    <Script src="https://securegw.paytm.in/merchantpgpui/checkoutjs/merchants/RABBIT83100137902764.js"></Script>
    <Head>
    <title>FilmCity</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
    </Head>
    <UserAuthContextProvider>
    <Component {...pageProps} />
    </UserAuthContextProvider>
    </>
  )
}

export default MyApp
