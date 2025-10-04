// composables/useProducts.ts

export const useProducts = () => {
  const products = useState("products", () => []); // global reactive state
  const homeProducts = useState("homeProducts", () => []);
  const product = useState<ShopifyProduct | null>("product", () => null);

  const config = useRuntimeConfig();
  // types/shopify.ts

  interface ShopifyImageNode {
    url: string;
    altText?: string | null;
  }

  interface ShopifyVariantNode {
    id: string;
    price: {
      amount: string; // Shopify returns money amounts as strings
    };
  }

  interface ShopifyProduct {
    id: string;
    title: string;
    descriptionHtml: string;
    images: {
      edges: { node: ShopifyImageNode }[];
    };
    variants: {
      edges: { node: ShopifyVariantNode }[];
    };
    metafield?: {
      value: string;
      type: string;
    } | null;
  }

  const fetchProducts = async () => {
    if (products.value.length) return; // avoid refetching if already fetched

    const query = `
    {
      products(first: 100) {
        edges {
          node {
            id
            title
            handle
            description
            images(first: 1) {
              edges {
                node { url }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

    try {
      const response = await fetch(config.public.shopifyApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": config.public.shopifySecret,
        },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      products.value = data.data.products.edges;
      homeProducts.value = products.value.slice(0, 3);
    } catch (err: any) {
      console.error("Error fetching products:", err.message);
    }
  };

  async function fetchSingleProduct(handle: string) {
    const query = `query getProductByHandle($handle: String!) {
        product(handle: $handle) {
          id
          title
          descriptionHtml
          images(first: 5) { edges { node { url altText } } }
          variants(first: 1) { edges { node { id price { amount } } } }
          metafield(namespace: "custom", key: "active_ingredient") { value type }
        }
      }`;

    const res = await fetch(config.public.shopifyApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": config.public.shopifySecret,
      },
      body: JSON.stringify({ query, variables: { handle } }),
    });

    const data = await res.json();
    product.value = data.data.product;
    console.log(`Fetched single product:`, product.value); // Debug log
  }

  return { product, products, homeProducts, fetchProducts, fetchSingleProduct };
};
