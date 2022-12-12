import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import {
  ImageContainer,
  SectionContainer,
  SucessContainer,
} from "../styles/pages/sucess";

interface SucessProps {
  customerName: string;
  product: {
    name: string;
    imageUrl: string;
  };
  productImages: string[];
}

export default function Sucess({
  customerName,
  product,
  productImages,
}: SucessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>

      <SucessContainer>
        <SectionContainer>
          {productImages.map((image, index) => {
            return (
              <ImageContainer key={index}>
                <Image src={image} width={140} height={140} alt="" />
              </ImageContainer>
            );
          })}
        </SectionContainer>

        <h1>Compra efetuada!</h1>

        <p>
          Uhuul, <strong>{customerName}</strong>, Sua compra de{" "}
          {productImages.length} camisetas já está a caminho da sua casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SucessContainer>
    </>
  );
}

// Client-side (useEffect) / getServerSideProps / getStaticProps

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerName = session.customer_details?.name;
  const productImages = session.line_items?.data.map((item) => {
    const product = item.price?.product as Stripe.Product;
    return product.images[0];
  });

  return {
    props: {
      customerName,
      productImages,
    },
  };
};
