// composables/useShopifyCart.ts

async function shopifyRequest(query: string, variables?: any) {
  const res = await fetch(
    "https://zayae-wellness.myshopify.com/api/2024-07/graphql.json",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": "73480f6afae914a0520d5970fdb72512",
      },
      body: JSON.stringify({ query, variables }),
    }
  );
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
