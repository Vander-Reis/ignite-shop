import type { AppProps } from "next/app";
import { globalStyles } from "../styles/global";
import logoImg from "../assets/logo.svg";
import { Container, Header } from "../styles/pages/app";

import Image from "next/image";
import { Cart } from "../components/Cart";
import { CartProvider } from "use-shopping-cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CartProvider
        mode="payment"
        cartMode="client-only"
        stripe={process.env.STRIPE_SECRET_KEY!}
        successUrl={process.env.NEXT_URL_SUCESS!}
        cancelUrl={process.env.NEXT_URL!}
        currency="BRL"
        allowedCountries={["US", "GB", "CA"]}
        billingAddressCollection={true}
        shouldPersist={true}
      >
        <Container>
          <Header>
            <Link href="/">
              <Image src={logoImg} alt="" />
            </Link>
            <Cart />
          </Header>

          <Component {...pageProps} />
        </Container>
        <ToastContainer />
      </CartProvider>
    </>
  );
}
