<script setup lang="ts">
interface ImageNode {
  url: string;
}

interface PriceNode {
  amount: string;
  currencyCode: string;
}

interface VariantNode {
  id: string;
  price: PriceNode;
}

interface ProductNode {
  id: string;
  title: string;
  handle: string;
  description: string;
  images: {
    edges: Array<{ node: ImageNode }>;
  };
  variants: {
    edges: Array<{ node: VariantNode }>;
  };
}

interface ProductProp {
  node: ProductNode;
}

const props = defineProps<{
  product: ProductProp;
}>();

const { cart, addToCart, updateQuantity, removeFromCart } = useCart();

// computed quantity for this product in the cart
const quantity = computed(() => {
  const item = cart.value.find((p) => p.id === props.product.node.handle);
  return item ? item.quantity : 0;
});

function handleAddToCart() {
  const variantId = props.product.node.variants.edges[0]?.node.id;
  if (!variantId) {
    console.error("No variant ID found for product");
    return;
  }

  addToCart({
    id: props.product.node.handle,
    title: props.product.node.title,
    price: props.product.node.variants.edges[0]?.node.price.amount || "0",
    image: props.product.node.images.edges[0]?.node.url || "",
    quantity: 1,
    variantId,
  });
}

function increaseQuantity() {
  updateQuantity(props.product.node.handle, quantity.value + 1);
}

function decreaseQuantity() {
  if (quantity.value > 1) {
    updateQuantity(props.product.node.handle, quantity.value - 1);
  } else {
    removeFromCart(props.product.node.handle);
  }
}
</script>

<template>
  <div class="product">
    <NuxtLink :to="`/product/${product.node.handle}`">
      <div class="hero-product_image">
        <img
          :src="props.product.node.images.edges[0]?.node.url"
          loading="lazy"
          sizes="(max-width: 553px) 100vw, 553px"
          alt=""
          class="c-img c-cover"
        />
      </div>
    </NuxtLink>

    <div class="product-textholder">
      <div class="product-details">
        <div class="web-subheading-2">{{ product.node.title }}</div>
        <div class="product-price">
          ${{ product.node.variants.edges[0]?.node.price.amount }}
        </div>
      </div>
      <div class="cart-holder">
        <div v-if="quantity === 0" class="cart-button" @click="handleAddToCart">
          <div class="w-embed">
            <svg
              width="31"
              height="31"
              viewbox="0 0 31 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.52246 3.03687L3.77246 8.03687V25.5369C3.77246 26.1999 4.03585 26.8358 4.50469 27.3046C4.97353 27.7735 5.60942 28.0369 6.27246 28.0369H23.7725C24.4355 28.0369 25.0714 27.7735 25.5402 27.3046C26.0091 26.8358 26.2725 26.1999 26.2725 25.5369V8.03687L22.5225 3.03687H7.52246Z"
                stroke="#974619"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M3.77246 8.03687H26.2725"
                stroke="#974619"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M20.0225 13.0369C20.0225 14.3629 19.4957 15.6347 18.558 16.5724C17.6203 17.5101 16.3485 18.0369 15.0225 18.0369C13.6964 18.0369 12.4246 17.5101 11.4869 16.5724C10.5492 15.6347 10.0225 14.3629 10.0225 13.0369"
                stroke="#974619"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>
        </div>
        <div v-else class="cart-counter">
          <div @click="decreaseQuantity" class="cart-minus">
            <svg
              width="13"
              height="2"
              viewBox="0 0 13 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.505859 0.0546875H12.3338V1.7444H0.505859V0.0546875Z"
                fill="#974619"
              />
            </svg>
          </div>
          <div class="web-body-text uc-brown product-count">{{ quantity }}</div>
          <div @click="increaseQuantity" class="cart-plus">
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.652344 6.05469H12.4803V7.7444H0.652344V6.05469Z"
                fill="#974619"
              />
              <path
                d="M7.41211 0.984375L7.41211 12.8123H5.7224L5.7224 0.984375L7.41211 0.984375Z"
                fill="#974619"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
.product:hover .cart-holder .cart-button svg path {
  stroke: #ffffff;
}
.product:hover .product-textholder .product-details .web-subheading-2 {
  color: #ffffff;
}
.product:hover .product-textholder .product-details .product-price {
  color: #ffffff;
}
.product:hover .cart-holder .cart-counter .cart-minus svg path {
  fill: #ffffff;
}

.product:hover .cart-holder .cart-counter .web-body-text {
  color: #ffffff;
}
.product:hover .cart-holder .cart-counter .cart-plus svg path {
  fill: #ffffff;
}
.product:hover .cart-holder .cart-counter {
  border-color: #ffffff;
}

.cart-plus,
.cart-minus {
  padding: 10px 0px;
  cursor: pointer;
}
</style>
