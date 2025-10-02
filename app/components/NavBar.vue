<script setup lang="tsx">
import { gsap } from "gsap";
// const lenis = useLenis();
const { totalItems } = useCart();

const isNavOpen = ref(false);
const navMenu = ref<HTMLElement | null>(null);
const close = ref<HTMLElement | null>(null);

const isCartOpen = useState("isCartOpen", () => false);

const openCart = () => {
  isCartOpen.value = true;
  // lenis.updateScroll();
};

onMounted(() => {
  if (navMenu.value) {
    gsap.set(navMenu.value, { y: "-26%" });
  }
});

const openNav = () => {
  if (navMenu.value) {
    gsap.to(navMenu.value, { y: "0%", duration: 0.5, ease: "power2.out" });
    navMenu.value.style.display = "block";
    isNavOpen.value = true;
  }
};

const closeNav = () => {
  if (navMenu.value) {
    gsap.to(navMenu.value, {
      y: "-26%",
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        navMenu.value!.style.display = "none";
      },
    });
    // navMenu.value.style.display = "none";
    isNavOpen.value = false;
  }
};

const router = useRouter();

router.afterEach(() => {
  closeNav();
});
</script>

<template>
  <div class="c-nav">
    <div class="c-container">
      <div class="nav-holder">
        <NuxtLink
          to="/"
          aria-current="page"
          class="logo-holder w-inline-block w--current"
        >
          <img
            loading="lazy"
            src="/images/zayae-logo_white.svg"
            alt=""
            class="image"
          />
        </NuxtLink>
        <div class="nav-link_holders">
          <div class="nav-link_desktop">
            <NuxtLink to="/" aria-current="page" class="nav-text w--current"
              >Home</NuxtLink
            >
            <NuxtLink to="/products" class="nav-text">Products</NuxtLink>
            <NuxtLink to="/contact" class="nav-text">Contact</NuxtLink>
          </div>
          <div class="cart-icon_holder" @click="openCart">
            <div class="w-embed">
              <svg
                width="24"
                height="24"
                viewbox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M3 6H21"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
            <div class="cart-num_holder">
              <div id="cartCount" class="cart-num">{{ totalItems }}</div>
            </div>
          </div>
          <div @click="openNav" class="nav-hamburger_holder">
            <div class="w-embed">
              <svg
                width="36"
                height="20"
                viewbox="0 0 36 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M36 10H0"
                  stroke="white"
                  stroke-width="4"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M36 2H0"
                  stroke="white"
                  stroke-width="4"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M36 18H0"
                  stroke="white"
                  stroke-width="4"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mobile-nav" ref="navMenu">
      <div class="c-container">
        <div class="mobile-inner">
          <div @click="closeNav" ref="close" class="mobile-close">
            <div class="code-embed w-embed">
              <svg
                width="30"
                height="30"
                viewbox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.5 7.5L7.5 22.5"
                  stroke="white"
                  stroke-width="2.5"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M7.5 7.5L22.5 22.5"
                  stroke="white"
                  stroke-width="2.5"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
          </div>
          <NuxtLink
            to="/"
            aria-current="page"
            class="mobile-link_item w-inline-block w--current"
          >
            <div>Home</div>
          </NuxtLink>
          <NuxtLink to="/products" class="mobile-link_item w-inline-block">
            <div>Products</div>
          </NuxtLink>
          <NuxtLink to="/contact" class="mobile-link_item w-inline-block">
            <div>Contact</div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
