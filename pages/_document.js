import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      {/* <!-- Google tag (gtag.js) --> */}
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}/>
      <script src="https://kit.fontawesome.com/c45aced2c8.js"/>
          {/* {/ Inject the GA tracking code with the Measurement ID /} */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)};
                gtag('js', new Date());
                gtag('config','${process.env.NEXT_PUBLIC_GA_ID}',{
                  page_path: window.location.pathname
                });
              `,
            }}
          />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
