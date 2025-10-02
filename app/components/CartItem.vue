<script setup lang="ts">
const { cart, updateQuantity, removeFromCart } = useCart();

interface Item {
  id: string;
  title: string;
  price: string;
  image: string;
  quantity: number;
}

const props = defineProps<{
  item: Item;
}>();

// computed quantity for this product in the cart
const quantity = computed(() => {
  const item = cart.value.find((p) => p.id === props.item.id);
  return item ? item.quantity : 0;
});

function increaseQuantity() {
  updateQuantity(props.item.id, quantity.value + 1);
}

function decreaseQuantity() {
  if (quantity.value > 1) {
    updateQuantity(props.item.id, quantity.value - 1);
  } else {
    removeFromCart(props.item.id);
  }
}
</script>

<template>
  <div class="cart-item">
    <div class="cart-item_img">
      <img
        :src="item.image"
        loading="lazy"
        sizes="(max-width: 800px) 100vw, 800px"
        alt=""
        class="c-img c-cover"
      />
    </div>
    <div class="cart-item_details">
      <div class="cart-item_holder">
        <div class="cart-item_name">
          <div class="web-subheading-1">{{ item.title }}</div>
          <div class="product-price">${{ item.price }}</div>
        </div>
        <div @click="removeFromCart(item.id)" class="remove-item">
          <div class="w-embed">
            <svg
              width="24"
              height="24"
              viewbox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 6H5H21"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M10 11V17"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M14 11V17"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div class="cart-counter-product_white">
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
        <div class="web-body-text uc-brown">{{ quantity }}</div>
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
</template>

<style scoped>
.cart-plus,
.cart-minus {
  padding: 10px 0px;
  cursor: pointer;
}
</style>
