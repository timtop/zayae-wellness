<script setup lang="ts">
// const lenis = useLenis();
const { product, fetchSingleProduct } = useProducts();
const { cart, addToCart, updateQuantity, removeFromCart } = useCart();
const route = useRoute();
// const productId = product.
console.log(product);

const currentItem = computed(
  // () => cart.value.find((p) => p.id === product.value?.id)
  () => cart.value.find((p) => p.id === route.params.id)
);

onMounted(async () => {
  // lenis.initSmoothScroll();
  await fetchSingleProduct(route.params.id as string);
});

function handleAddToCart() {
  if (!product.value) return;

  const variantId = product.value.variants?.edges[0]?.node?.id;
  if (!variantId) {
    console.error("No variant ID found for product");
    return;
  }

  addToCart({
    id: route.params.id as string,
    title: product.value.title,
    price: product.value.variants?.edges[0]?.node?.price?.amount as string,
    image: product.value.images?.edges[0]?.node?.url as string,
    quantity: 1,
    variantId,
  });
}

function increase() {
  if (currentItem.value) {
    updateQuantity(currentItem.value.id, currentItem.value.quantity + 1);
  }
}

function decrease() {
  if (currentItem.value) {
    updateQuantity(currentItem.value.id, currentItem.value.quantity - 1);
  }
}
</script>

<template>
  <div class="open-hero">
    <div class="open-hero_lhs">
      <img
        :src="product?.images?.edges[1]?.node.url"
        loading="lazy"
        sizes="(max-width: 690px) 100vw, 690px"
        alt=""
        class="c-img c-cover"
      />
    </div>
    <div class="open-hero_rhs">
      <div class="rhs-content_holder">
        <div class="rhs-product_details">
          <div class="web-large-text uc-white">{{ product?.title }}</div>
          <div
            class="web-paragraph-2 uc-white"
            v-html="product?.descriptionHtml"
          ></div>
        </div>
        <div class="web-heading-4 uc-white">
          ${{ product?.variants?.edges[0]?.node?.price?.amount }}
        </div>
        <div class="rhs-product_ingrident">
          <div class="web-paragraph-1 uc-white">Active Ingredient</div>
          <div class="web-paragraph-2 uc-white">
            <!-- Taurine, Olympia vita complex, Methylcobalamin -->
            {{ product?.metafield?.value }}
          </div>
        </div>
        <div class="cart-content_holder">
          <a
            v-if="!currentItem"
            @click.prevent="handleAddToCart"
            class="c-beige_button full-width w-button"
            >Add to Cart</a
          >
          <div v-else class="cart-counter-product_brown">
            <div @click="decrease" class="cart-minus">
              <svg
                width="13"
                height="2"
                viewBox="0 0 13 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.505859 0.0546875H12.3338V1.7444H0.505859V0.0546875Z"
                  fill="#FFFFFF"
                />
              </svg>
            </div>
            <div class="web-body-text uc-white">{{ currentItem.quantity }}</div>
            <div @click="increase" class="cart-plus">
              <svg
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.652344 6.05469H12.4803V7.7444H0.652344V6.05469Z"
                  fill="#FFFFFF"
                />
                <path
                  d="M7.41211 0.984375L7.41211 12.8123H5.7224L5.7224 0.984375L7.41211 0.984375Z"
                  fill="#FFFFFF"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Cart />
</template>

<style lang="css" scoped>
.cart-plus,
.cart-minus {
  padding: 10px 0px;
  cursor: pointer;
}
</style>
