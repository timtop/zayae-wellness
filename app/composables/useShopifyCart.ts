// composables/useShopifyCart.ts

async function shopifyRequest(query: string, variables?: any) {
  const config = useRuntimeConfig();

  const res = await fetch(config.public.shopifyApi, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": config.public.shopifySecret,
    },
    body: JSON.stringify({ query, variables }),
  });
  return res.json();
}

export const useShopifyCart = () => {
  // Step 1: create a cart with items
  async function createCart(items: { variantId: string; quantity: number }[]) {
    const mutation = `
      mutation cartCreate($input: CartInput) {
        cartCreate(input: $input) {
          cart {
            id
            checkoutUrl
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const variables = {
      input: {
        lines: items.map((i) => ({
          merchandiseId: i.variantId,
          quantity: i.quantity,
        })),
      },
    };

    const { data } = await shopifyRequest(mutation, variables);
    return data.cartCreate.cart;
  }

  return { createCart };
};
