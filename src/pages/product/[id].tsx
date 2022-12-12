import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "../../styles/pages/product";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Head from "next/head";
import { useShoppingCart } from "use-shopping-cart";
import { toast } from "react-toastify";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    description: string;
    defaultPriceId: string;
  };
}

export default function Product({ product }: ProductProps) {
  const { addItem, cartDetails } = useShoppingCart();

  const entries = [] as any[];

  for (const id in cartDetails) {
    const entry = cartDetails[id];
    entries.push(entry);
  }

  const { isFallback } = useRouter();

  function handlerAddProduct(product: any) {
    const existProduct = entries.filter((element) => element.id === product.id);

    if (existProduct.length > 0) {
      return toast.warning("Já existe esse produto no carrinho!");
    }

    addItem(product);

    toast.success("Produto adicionado na sacola!");
  }
  if (isFallback) {
    return (
      <>
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <ProductContainer>
            <Skeleton width={576} height={656} />

            <ProductDetails>
              <Skeleton height={40} />
              <div>
                <Skeleton width={100} />
              </div>
              <div style={{ marginTop: "2.5rem" }}>
                <Skeleton count={4} />
              </div>

              <div
                style={{
                  marginTop: "auto",
                }}
              >
                <Skeleton height={60} />
              </div>
            </ProductDetails>
          </ProductContainer>
        </SkeletonTheme>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>
          <p>{product.description}</p>

          <button onClick={() => handlerAddProduct(product)}>
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "prod_MthllOeWr26uSE" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params!.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  console.log(product);

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount! / 100),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hora
  };
};
