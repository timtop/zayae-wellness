// composables/useShopifyCart.ts
const SHOPIFY_API =
  "https://zayae-wellness.myshopify.com/api/2024-07/graphql.json";
const TOKEN = "73480f6afae914a0520d5970fdb72512"; // your Storefront API token

async function shopifyRequest(query: string, variables?: any) {
  const res = await fetch(SHOPIFY_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN,
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
