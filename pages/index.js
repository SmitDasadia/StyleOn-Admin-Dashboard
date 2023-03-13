import Head from "next/head";
import Login from "../src/Login";



export default function Home() {
  return (
    <>

      <div>
        <Head>
          <title>StyleOn Admin Panel</title>
          <meta
            name="description"
            content="Monster Free Next Js Dashboard Template"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>


       <Login/>





      </div>
    </>
  );
}
