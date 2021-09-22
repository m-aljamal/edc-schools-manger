import "antd/dist/antd.css";
import Router from "next/router";
import { SWRConfig } from "swr";
import axios from "axios";
import NProgress from "nprogress";
import "../components/styles/nprogress.css";
import "../components/styles/globals.css";
import "tailwindcss/tailwind.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function MyApp({ Component, pageProps }) {
  Router.events.on("routeChangeStart", () => NProgress.start());
  Router.events.on("routeChangeComplete", () => NProgress.done());
  Router.events.on("routeChangeError", () => NProgress.done());
  return (
    <>
      <SWRConfig value={{ fetcher: (url) => axios(url).then((r) => r.data) }}>
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}

export default MyApp;
