<script setup lang="ts">
import { Info } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { gsap } from "gsap";
const { cart, subtotal, combinedSubtotal } = useCart();
const { createCart } = useShopifyCart();
// const lenis = useLenis();
const isLoading = ref(false);
const date = ref<Date | null>(null);
const time = ref<string>("");

const device = useDevice();
const isCartOpen = useState("isCartOpen", () => false);

onMounted(() => {
  device.checkDevice();
  if (device.isMobile) {
    gsap.set(".cart-modal", { y: "100%" });
  } else {
    gsap.set(".cart-modal", { x: "100%" });
  }
});

// const bookingFee = computed(() => {
//   const bookableItem = cart.value.find(
//     (item: any) => item.productType.toLowerCase() === "bookable"
//   );
//   return bookableItem ? Number(bookableItem.compareAtPrice || 0) : 0;
// });

const hasBookableItem = computed(() =>
  cart.value.some((item: any) => item.productType.toLowerCase() === "bookable")
);

const isCheckoutDisabled = computed(() => {
  const cartEmpty = !cart.value.length;
  const missingBookingDetails =
    hasBookableItem.value && (!date.value || !time.value);
  return cartEmpty || isLoading.value || missingBookingDetails;
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

    // Format the date and time for Shopify
    const appointmentDate = date.value
      ? date.value.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : undefined;
    const appointmentTime = time.value || undefined;

    const shopifyCart = await createCart(
      items,
      appointmentDate,
      appointmentTime
    );

    console.log(items);
    console.log(appointmentDate);
    console.log(appointmentTime);

    if (shopifyCart?.checkoutUrl) {
      console.log(shopifyCart.checkoutUrl);
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
      <div>
        <BookingDateTimePicker
          v-if="hasBookableItem"
          v-model:date="date"
          v-model:time="time"
        />
      </div>
      <div class="cart-items">
        <CartItem v-for="item in cart" :key="item.id" :item="item" />
      </div>
      <div class="cart-subtotal">
        <div class="cart-subtotal-upper">
          <div class="flex items-center gap-2">
            <div class="web-subheading-1 low-priority">Subtotal</div>

            <div>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="outline" size="icon">
                    <Info class="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  :sideOffset="2"
                  class="width-[60px] !z-[999999]"
                >
                  <p>
                    This is the amount the services and products selected costs,
                    excluding any booking fees.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          <div class="product-price low-priority">
            ${{ combinedSubtotal.toFixed(2) }}
          </div>
        </div>

        <div class="cart-subtotal-lower">
          <div class="flex items-center gap-2">
            <div class="web-subheading-1">Amount to pay</div>
            <div>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="outline" size="icon">
                    <Info class="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  :sideOffset="2"
                  class="width-[60px] !z-[999999]"
                >
                  <p>
                    This amount includes the booking fee for the service and the
                    cost of any selected products.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          <div class="product-price">${{ subtotal.toFixed(2) }}</div>
        </div>
      </div>

      <div class="cart-checkout">
        <button
          @click="checkout"
          class="c-beige_button c-full w-button checkout-btn"
          :disabled="isCheckoutDisabled"
          :class="{
            disabled: isCheckoutDisabled,
          }"
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
