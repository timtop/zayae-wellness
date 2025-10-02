<script setup lang="ts">
import { gsap } from "gsap";
const { cart, subtotal } = useCart();
// const lenis = useLenis();

const device = useDevice();
const isCartOpen = useState("isCartOpen", () => false);

// const openCart = () => {
//   console.log("Cart opened");
// };

// const closeCart = () => {
//   console.log("Cart closed");
// };

onMounted(() => {
  device.checkDevice();
  if (device.isMobile) {
    gsap.set(".cart-modal", { y: "100%" });
  } else {
    gsap.set(".cart-modal", { x: "100%" });
  }
});

watch(isCartOpen, (open) => {
  if (open) {
    console.log("Cart opened");
    // lenis.updateScroll();

    if (device.isMobile) {
      gsap.to(".cart-modal", { y: "0%", duration: 0.5, ease: "power2.out" });
    } else {
      gsap.to(".cart-modal", { x: "0%", duration: 0.5, ease: "power2.out" });
    }
  } else {
    console.log("Cart closed");
    if (device.isMobile) {
      gsap.to(".cart-modal", { y: "100%", duration: 0.5, ease: "power2.in" });
    } else {
      gsap.to(".cart-modal", { x: "100%", duration: 0.5, ease: "power2.in" });
    }
  }
});

const closeCart = () => {
  isCartOpen.value = false;
};
</script>

<template>
  <div class="cart-modal">
    <div class="cart-container">
      <div class="cart-heading">
        <div class="web-subheading-1">Cart</div>
        <div class="cart-close" @click="closeCart">
          <div class="w-embed">
            <svg
              width="30"
              height="30"
              viewbox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.5 7.5L7.5 22.5"
                stroke="black"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M7.5 7.5L22.5 22.5"
                stroke="black"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div class="cart-items">
        <CartItem v-for="item in cart" :key="item.id" :item="item" />
      </div>
      <div class="cart-subtotal">
        <div class="web-subheading-1">Subtotal</div>
        <div class="product-price">${{ subtotal.toFixed(2) }}</div>
      </div>
      <div class="cart-checkout">
        <a href="#" class="c-beige_button c-full w-button">Checkout</a>
      </div>
    </div>
  </div>
  <!-- <div class="frosted-bg"></div> -->
</template>
