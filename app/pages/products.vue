<script setup>
// const lenis = useLenis();
const { products, fetchProducts } = useProducts();

onMounted(async () => {
  await fetchProducts();
  // lenis.initSmoothScroll();
});
</script>

<template>
  <section class="product-hero_section">
    <div class="product-hero">
      <img
        src="/images/product-hero.jpg"
        loading="lazy"
        sizes="(max-width: 2880px) 100vw, 2880px"
        srcset="
          /images/product-hero-p-500.jpg   500w,
          /images/product-hero-p-800.jpg   800w,
          /images/product-hero-p-1080.jpg 1080w,
          /images/product-hero-p-1600.jpg 1600w,
          /images/product-hero-p-2000.jpg 2000w,
          /images/product-hero-p-2600.jpg 2600w,
          /images/product-hero.jpg        2880w
        "
        alt=""
        class="c-img c-cover"
      />
      <div class="c-container_hero">
        <div class="product-hero_text">
          <div class="custom-heading uc-white">Our Products</div>
        </div>
      </div>
    </div>
  </section>

  <section class="all-products">
    <div class="c-container">
      <div class="product-holder">
        <div class="product-show">
          <Product
            v-for="product in products"
            :key="product.node.handle"
            :product="product"
          />
        </div>
      </div>
    </div>
  </section>

  <section class="wellness-circle">
    <div class="c-container">
      <div class="wellness-block">
        <div class="circle-lhs">
          <div class="circle-text_holder">
            <div class="web-heading-2 uc-white">
              Wellness works best when it’s consistent.
            </div>
            <div class="web-paragraph-2 uc-white">
              With a ZAYAÉ subscription, you get regular access to your favorite
              drips, on your schedule, in your space. Stay energized, supported,
              and radiant all month long without the hassle of booking from
              scratch every time.
            </div>
          </div>
          <NuxtLink href="/contact" class="c-beige_button w-button"
            >Join the Wellness Circle</NuxtLink
          >
        </div>
        <div class="circle-rhs">
          <img
            src="/images/wellness-cta.jpg"
            loading="lazy"
            sizes="(max-width: 1012px) 100vw, 1012px"
            srcset="
              /images/wellness-cta-p-500.jpg  500w,
              /images/wellness-cta-p-800.jpg  800w,
              /images/wellness-cta.jpg       1012w
            "
            alt=""
            class="c-img c-cover"
          />
        </div>
      </div>
    </div>
  </section>

  <Cart />
</template>

<style lang="css" scoped></style>
