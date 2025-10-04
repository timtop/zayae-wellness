<script setup lang="ts">
import { gsap } from "gsap";
const { cart, subtotal } = useCart();
const { createCart } = useShopifyCart();
// const lenis = useLenis();
const isLoading = ref(false);

const device = useDevice();
const isCartOpen = useState("isCartOpen", () => false);

onMounted(() => {
  device.checkDevice();
  if (device.isMobile) {
    gsap.set(".cart-modal", { y: "100%" });
  } else {
    gsap.set(".cart-modal", { x: "100%" });
  }

  // Watch for cart changes to re-enable/disable the checkout button
  watch(
    () => cart.value.length,
    (newLength) => {
      const checkoutBtn = document.querySelector(
        ".checkout-btn"
      ) as HTMLButtonElement | null;
      if (checkoutBtn) {
        checkoutBtn.disabled = newLength === 0;
        checkoutBtn.classList.toggle("disabled", newLength === 0);
      }
    },
    { immediate: true }
  );
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

const checkout = async () => {
  if (isLoading.value) return;
  isLoading.value = true;
  await nextTick();
  gsap.to(".roller-logo", {
    rotation: 360,
    duration: 1,
    ease: "linear",
    repeat: -1,
    transformOrigin: "50% 50%",
  });

  try {
    const items = cart.value.map((item: any) => ({
      variantId: item.variantId, // must be the Shopify `gid://` ID for the variant
      quantity: item.quantity,
    }));

    const shopifyCart = await createCart(items);

    if (shopifyCart?.checkoutUrl) {
      window.location.href = shopifyCart.checkoutUrl; // redirect to Shopify checkout
    } else {
      console.error("Checkout failed:", shopifyCart);
    }
  } catch (err) {
    console.error("Checkout error:", err);
  }
  //  finally {
  //   isLoading.value = false;
  //   gsap.set(".roller-logo", {
  //     rotation: 0,
  //   });
  // }
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
        <button
          @click="checkout"
          class="c-beige_button c-full w-button checkout-btn"
          :disabled="!cart.length || isLoading"
          :class="{ disabled: !cart.length || isLoading }"
        >
          <div v-if="!isLoading">Checkout</div>

          <div v-else class="roller-logo">
            <img src="/images/logo-roller.png" alt="zayae-logo" srcset="" />
          </div>
        </button>
      </div>
    </div>
  </div>
  <!-- <div class="frosted-bg"></div> -->
</template>

<style lang="css" scoped>
.checkout-btn:disabled,
.checkout-btn.disabled {
  opacity: 0.5;
  pointer-events: none;
  cursor: not-allowed;
}
</style>
