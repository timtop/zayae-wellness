<script setup>
const { homeProducts, fetchProducts } = useProducts();
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
const swiperRef = ref(null);

// import "swiper/css";
import "swiper/css/effect-fade";
// import "swiper/css/pagination";

function updateNavButtons(swiper, prevSelector, nextSelector, isInit = false) {
  const prevEl = document.querySelector(prevSelector);
  const nextEl = document.querySelector(nextSelector);
  if (!prevEl || !nextEl) return;

  const isBeginning = swiper.isBeginning;
  const isEnd = swiper.isEnd;

  prevEl.style.opacity = isBeginning ? "0.3" : "1";
  nextEl.style.opacity = isEnd ? "0.3" : "1";

  if (isInit) {
    prevEl.style.pointerEvents = isBeginning ? "none" : "auto";
    nextEl.style.pointerEvents = isEnd ? "none" : "auto";
  }
}

function onSwiperInit(swiper) {
  swiperRef.value = swiper;
  swiper.update();
  updateNavButtons(swiper, ".service-left_nav", ".service-right_nav", true);
}

function onSlideChange(swiper) {
  updateNavButtons(swiper, ".service-left_nav", ".service-right_nav");
}

function onResize(swiper) {
  updateNavButtons(swiper, ".service-left_nav", ".service-right_nav");
}

onMounted(async () => {
  await fetchProducts();
});
</script>

<template>
  <div>
    <swiper
      class="hero-slider"
      wrapperClass="hero-slider_wrapper"
      :modules="[Autoplay, EffectFade, Pagination]"
      :loop="true"
      :speed="800"
      effect="fade"
      :fadeEffect="{ crossFade: true }"
      :autoplay="{ delay: 5000, disableOnInteraction: false }"
      :pagination="{ el: '.paginater', clickable: true }"
    >
      <div class="c-container_pager">
        <div class="paginater"></div>
      </div>
      <!-- <div class="hero-slider_wrapper swiper-wrapper"> -->
      <swiper-slide class="hero-slider_slide swiper-slide">
        <div class="c-container_hero">
          <div class="hero-cute_text">
            <div class="web-paragraph-2 uc-white">
              Whether you’re feeling drained, out of balance, or simply ready
              for a reset, ZAYAÉ Wellness offers care that meets you where you
              are. From IV drips to personalised weight support, our treatments
              are crafted to help you feel nourished, energised and whole again.
            </div>
            <!-- <NuxtLink to="/products" class="c-beige_button w-button"
                >Start Your Wellness Journey</NuxtLink
              > -->
            <BeigeButton text="Start Your Wellness Journey" to="/products" />
          </div>
        </div>
        <img
          src="//images/hero1.jpg"
          loading="lazy"
          sizes="(max-width: 2880px) 100vw, 2880px"
          srcset="
            /images/hero1-p-500.jpg   500w,
            /images/hero1-p-800.jpg   800w,
            /images/hero1-p-1080.jpg 1080w,
            /images/hero1-p-1600.jpg 1600w,
            /images/hero1-p-2000.jpg 2000w,
            /images/hero1-p-2600.jpg 2600w,
            /images/hero1.jpg        2880w
          "
          alt=""
          class="c-img c-cover"
        />
        <div class="hero-text_holder">
          <div class="c-container_hero">
            <div class="hero-slider_holder">
              <div class="hero-paginate_holder">
                <div class="hero-holder">
                  <div class="custom-heading uc-white">
                    Your Body Deserves Better
                  </div>
                </div>
                <div class="hero-cute_textmobile">
                  <div class="web-paragraph-2 uc-white">
                    Whether you’re feeling drained, out of balance, or simply
                    ready for a reset, ZAYAÉ Wellness offers care that meets you
                    where you are. From IV drips to personalised weight support,
                    our treatments are crafted to help you feel nourished,
                    energised and whole again.
                  </div>
                  <BeigeButton
                    text="Start Your Wellness Journey"
                    to="/products"
                  />
                </div>
              </div>
              <div class="hero-product">
                <div class="hero-product_image">
                  <img
                    src="/images/essentialdrip_hero.jpg"
                    loading="lazy"
                    sizes="(max-width: 553px) 100vw, 553px"
                    srcset="
                      /images/essentialdrip_hero-p-500.jpg 500w,
                      /images/essentialdrip_hero.jpg       553w
                    "
                    alt=""
                    class="c-img c-cover"
                  />
                </div>
                <div class="product-hero_textholder">
                  <div class="product-text">Alleviate</div>
                  <div class="product-price">$199.99</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide class="hero-slider_slide swiper-slide">
        <div class="c-container_hero">
          <div class="hero-cute_text">
            <div class="web-paragraph-2 uc-white">
              Safe, effective weight management solutions using FDA-approved
              options such as Semaglutide (Ozempic®️, Wegovy®️) and Tirzepatide
              (Mounjaro®️, Zepbound™️), provided under nurse-led guidance.
            </div>
            <BeigeButton text="Start Your Wellness Journey" to="/products" />
          </div>
        </div>
        <img
          src="/images/hero2.jpg"
          loading="lazy"
          sizes="(max-width: 1440px) 100vw, 1440px"
          srcset="
            /images/hero2-p-500.jpg   500w,
            /images/hero2-p-800.jpg   800w,
            /images/hero2-p-1080.jpg 1080w,
            /images/hero2.jpg        1440w
          "
          alt=""
          class="c-img c-cover"
        />
        <div class="hero-text_holder">
          <div class="c-container_hero">
            <div class="hero-slider_holder">
              <div class="hero-paginate_holder">
                <div class="paginater"></div>
                <div class="hero-holder">
                  <div class="custom-heading uc-white">
                    GLP-1 Injectable Weight Loss
                  </div>
                </div>
                <div class="hero-cute_textmobile">
                  <div class="web-paragraph-2 uc-white">
                    Safe, effective weight management solutions using
                    FDA-approved options such as Semaglutide (Ozempic®️,
                    Wegovy®️) and Tirzepatide (Mounjaro®️, Zepbound™️), provided
                    under nurse-led guidance.
                  </div>
                  <BeigeButton
                    text="Start Your Wellness Journey"
                    to="/products"
                  />
                </div>
              </div>
              <div class="hero-product">
                <div class="hero-product_image">
                  <img
                    src="/images/essentialdrip_hero.jpg"
                    loading="lazy"
                    sizes="(max-width: 553px) 100vw, 553px"
                    srcset="
                      /images/essentialdrip_hero-p-500.jpg 500w,
                      /images/essentialdrip_hero.jpg       553w
                    "
                    alt=""
                    class="c-img c-cover"
                  />
                </div>
                <div class="product-hero_textholder">
                  <div class="product-text">Alleviate</div>
                  <div class="product-price">$199.99</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide class="hero-slider_slide swiper-slide">
        <div class="c-container_hero">
          <div class="hero-cute_text">
            <div class="web-paragraph-2 uc-white">
              Supports cellular repair, boosts energy production, enhances
              metabolism, and promotes cognitive function.
            </div>
            <BeigeButton text="Start Your Wellness Journey" to="/products" />
          </div>
        </div>
        <img
          src="/images/hero3.jpg"
          loading="lazy"
          sizes="(max-width: 1440px) 100vw, 1440px"
          srcset="
            /images/hero3-p-500.jpg   500w,
            /images/hero3-p-800.jpg   800w,
            /images/hero3-p-1080.jpg 1080w,
            /images/hero3.jpg        1440w
          "
          alt=""
          class="c-img c-cover"
        />
        <div class="hero-text_holder">
          <div class="c-container_hero">
            <div class="hero-slider_holder">
              <div class="hero-paginate_holder">
                <div class="paginater"></div>
                <div class="hero-holder">
                  <div class="custom-heading uc-white">
                    NAD+ IV &amp; IM Therapy
                  </div>
                </div>
                <div class="hero-cute_textmobile">
                  <div class="web-paragraph-2 uc-white">
                    Supports cellular repair, boosts energy production, enhances
                    metabolism, and promotes cognitive function.
                  </div>
                  <BeigeButton
                    text="Start Your Wellness Journey"
                    to="/products"
                  />
                </div>
              </div>
              <div class="hero-product">
                <div class="hero-product_image">
                  <img
                    src="/images/essentialdrip_hero.jpg"
                    loading="lazy"
                    sizes="(max-width: 553px) 100vw, 553px"
                    srcset="
                      /images/essentialdrip_hero-p-500.jpg 500w,
                      /images/essentialdrip_hero.jpg       553w
                    "
                    alt=""
                    class="c-img c-cover"
                  />
                </div>
                <div class="product-hero_textholder">
                  <div class="product-text">Alleviate</div>
                  <div class="product-price">$199.99</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide class="hero-slider_slide swiper-slide">
        <div class="c-container_hero">
          <div class="hero-cute_text">
            <div class="web-paragraph-2 uc-white">
              Quickly boosts energy, improves mood, supports metabolism, and
              promotes nerve health.
            </div>
            <BeigeButton text="Start Your Wellness Journey" to="/products" />
          </div>
        </div>
        <img
          src="/images/hero4.jpg"
          loading="lazy"
          sizes="(max-width: 1440px) 100vw, 1440px"
          srcset="
            /images/hero4-p-500.jpg   500w,
            /images/hero4-p-800.jpg   800w,
            /images/hero4-p-1080.jpg 1080w,
            /images/hero4.jpg        1440w
          "
          alt=""
          class="c-img c-cover"
        />
        <div class="hero-text_holder">
          <div class="c-container_hero">
            <div class="hero-slider_holder">
              <div class="hero-paginate_holder">
                <div class="paginater"></div>
                <div class="hero-holder">
                  <div class="custom-heading uc-white">
                    Vitamin B-12 Injections
                  </div>
                </div>
                <div class="hero-cute_textmobile">
                  <div class="web-paragraph-2 uc-white">
                    Quickly boosts energy, improves mood, supports metabolism,
                    and promotes nerve health.
                  </div>
                  <BeigeButton
                    text="Start Your Wellness Journey"
                    to="/products"
                  />
                </div>
              </div>
              <div class="hero-product">
                <div class="hero-product_image">
                  <img
                    src="/images/essentialdrip_hero.jpg"
                    loading="lazy"
                    sizes="(max-width: 553px) 100vw, 553px"
                    srcset="
                      /images/essentialdrip_hero-p-500.jpg 500w,
                      /images/essentialdrip_hero.jpg       553w
                    "
                    alt=""
                    class="c-img c-cover"
                  />
                </div>
                <div class="product-hero_textholder">
                  <div class="product-text">Alleviate</div>
                  <div class="product-price">$199.99</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide class="hero-slider_slide swiper-slide">
        <div class="c-container_hero">
          <div class="hero-cute_text">
            <div class="web-paragraph-2 uc-white">
              A powerful antioxidant treatment that detoxifies the body,
              brightens skin, strengthens immunity, and supports overall
              cellular health.
            </div>
            <BeigeButton text="Start Your Wellness Journey" to="/products" />
          </div>
        </div>
        <img
          src="/images/hero5.jpg"
          loading="lazy"
          sizes="(max-width: 1440px) 100vw, 1440px"
          srcset="
            /images/hero5-p-500.jpg   500w,
            /images/hero5-p-800.jpg   800w,
            /images/hero5-p-1080.jpg 1080w,
            /images/hero5.jpg        1440w
          "
          alt=""
          class="c-img c-cover"
        />
        <div class="hero-text_holder">
          <div class="c-container_hero">
            <div class="hero-slider_holder">
              <div class="hero-paginate_holder">
                <div class="paginater"></div>
                <div class="hero-holder">
                  <div class="custom-heading uc-white">
                    Glutathione IV Therapy
                  </div>
                </div>
                <div class="hero-cute_textmobile">
                  <div class="web-paragraph-2 uc-white">
                    A powerful antioxidant treatment that detoxifies the body,
                    brightens skin, strengthens immunity, and supports overall
                    cellular health.
                  </div>
                  <BeigeButton
                    text="Start Your Wellness Journey"
                    to="/products"
                  />
                </div>
              </div>
              <div class="hero-product">
                <div class="hero-product_image">
                  <img
                    src="/images/essentialdrip_hero.jpg"
                    loading="lazy"
                    sizes="(max-width: 553px) 100vw, 553px"
                    srcset="
                      /images/essentialdrip_hero-p-500.jpg 500w,
                      /images/essentialdrip_hero.jpg       553w
                    "
                    alt=""
                    class="c-img c-cover"
                  />
                </div>
                <div class="product-hero_textholder">
                  <div class="product-text">Alleviate</div>
                  <div class="product-price">$199.99</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
      <!-- </div> -->
    </swiper>

    <section class="product-section">
      <div class="c-container">
        <div class="product-section-holder">
          <div class="product-heading_holder">
            <div class="product-heading_lhs">
              <div class="web-heading-3">From quick boosts to deep resets</div>
            </div>
            <div class="product-heading_rhs">
              <div class="web-paragraph-2">
                Each one is crafted to restore balance, support your body, and
                help you feel your best. Whatever your day calls for, there’s a
                blend to help you meet it feeling your best.
              </div>
            </div>
          </div>
          <div class="product-show">
            <Product v-for="product in homeProducts" :product="product" />
            <!-- <div class="product">
              <div class="hero-product_image">
                <img
                  src="/images/essentialdrip_hero.jpg"
                  loading="lazy"
                  sizes="(max-width: 553px) 100vw, 553px"
                  srcset="
                    /images/essentialdrip_hero-p-500.jpg 500w,
                    /images/essentialdrip_hero.jpg       553w
                  "
                  alt=""
                  class="c-img c-cover"
                />
              </div>
              <div class="product-textholder">
                <div class="product-details">
                  <div class="web-subheading-2">B-lean</div>
                  <div class="product-price">$159.99</div>
                </div>
                <div class="cart-holder">
                  <div class="cart-counter">
                    <div class="cart-minus">
                      <img
                        src="/images/minus.svg"
                        loading="lazy"
                        alt=""
                        class="c-img c-cover"
                      />
                    </div>
                    <div class="web-body-text uc-brown">1</div>
                    <div class="cart-plus">
                      <img
                        src="/images/plus.svg"
                        loading="lazy"
                        alt=""
                        class="c-img c-cover"
                      />
                    </div>
                  </div>
                  <div class="cart-button">
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
                </div>
              </div>
            </div> -->
          </div>
          <div class="product-btn_holder">
            <BrownButton text="See All Our Products" to="/products" />
          </div>
        </div>
      </div>
    </section>

    <section class="wellness-section">
      <div class="c-container">
        <div class="hr"></div>
        <div class="wellness-holder">
          <div class="wellness-lhs">
            <div class="wellness-lhs_textholder">
              <div class="web-heading-3">
                Wellness isn’t just about how  you look; it’s about how you
                feel.
              </div>
              <div class="web-paragraph-2">
                We are a mobile wellness boutique offering IV therapy,
                rejuvenating treatments, and personalized weight support
                solutions, including GLP-1 injectables. Every service is
                designed to help you feel better, physically, emotionally, and
                mentally.
              </div>
            </div>
            <div class="wellness-lhs_img">
              <img
                src="/images/whisk.jpg"
                loading="lazy"
                sizes="(max-width: 1321px) 100vw, 1321px"
                srcset="
                  /images/whisk-p-500.jpg   500w,
                  /images/whisk-p-800.jpg   800w,
                  /images/whisk-p-1080.jpg 1080w,
                  /images/whisk.jpg        1321w
                "
                alt=""
                class="c-img c-cover"
              />
            </div>
          </div>
          <div class="wellness-rhs">
            <div class="wellness-rhs_img">
              <img
                src="/images/wellness-rhsimg.jpg"
                loading="lazy"
                sizes="(max-width: 954px) 100vw, 954px"
                srcset="
                  /images/wellness-rhsimg-p-500.jpg 500w,
                  /images/wellness-rhsimg-p-800.jpg 800w,
                  /images/wellness-rhsimg.jpg       954w
                "
                alt=""
                class="c-img c-cover"
              />
            </div>
            <div class="wellness-rhs_textholder">
              <div class="web-paragraph-2">
                Founded by a mental health nurse practitioner with over a decade
                of experience in critical care, emergency medicine, and
                interventional radiology, ZAYAÉ blends medical insight with
                deeply intentional care. After witnessing first hand the gaps in
                preventive wellness and recovery support, she invested in a
                whole-body approach that centers your physical health while
                honoring your need for rest, beauty, and vitality.
              </div>
              <!-- <a href="#" class="c-brown_button w-button">Book your Session</a> -->
              <BrownButton text="Book your Session" to="/products" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="service-section">
      <div class="c-container">
        <div class="service-section_holder">
          <div class="service-heading_holder">
            <div class="web-heading-3">Our Services</div>
            <div class="service-pagination_holder">
              <div class="service-left_nav">
                <img src="/images/left-white.svg" loading="lazy" alt="" />
              </div>
              <div class="service-right_nav">
                <img src="/images/right-white.svg" loading="lazy" alt="" />
              </div>
            </div>
          </div>
          <Swiper
            ref="swiperRef"
            class="services-slider"
            wrapperClass="services-slider_wrapper"
            :modules="[Navigation, Autoplay]"
            slides-per-view="auto"
            :space-between="16"
            :speed="800"
            :autoplay="{
              delay: 2000,
              disableOnInteraction: false,
            }"
            :navigation="{
              nextEl: '.service-right_nav',
              prevEl: '.service-left_nav',
            }"
            @swiper="onSwiperInit"
            @slideChange="onSlideChange"
            @resize="onResize"
          >
            <!-- <div class="services-slider_wrapper swiper-wrapper"> -->
            <SwiperSlide class="services-slide swiper-slide">
              <img
                src="/images/service1.jpg"
                loading="lazy"
                sizes="(max-width: 996px) 100vw, 996px"
                srcset="
                  /images/service1-p-500.jpg 500w,
                  /images/service1-p-800.jpg 800w,
                  /images/service1.jpg       996w
                "
                alt=""
                class="c-img c-cover"
              />
              <div class="service-slide_text">
                <div class="web-subheading-1 uc-white">Wellness + Vitality</div>
                <div class="web-small_paragraph">
                  For when you just want to feel like you again: clear, steady,
                  and ready for anything.
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide class="services-slide swiper-slide">
              <img
                src="/images/service2.jpg"
                loading="lazy"
                sizes="(max-width: 996px) 100vw, 996px"
                srcset="
                  /images/service2-p-500.jpg 500w,
                  /images/service2-p-800.jpg 800w,
                  /images/service2.jpg       996w
                "
                alt=""
                class="c-img c-cover"
              />
              <div class="service-slide_text">
                <div class="web-subheading-1 uc-white">
                  Mental Clarity + Mood Support
                </div>
                <div class="web-small_paragraph">
                  For clear thinking, calm energy, and a brighter mood that
                  lasts.
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide class="services-slide swiper-slide">
              <img
                src="/images/service3.jpg"
                loading="lazy"
                sizes="(max-width: 996px) 100vw, 996px"
                srcset="
                  /images/service3-p-500.jpg 500w,
                  /images/service3-p-800.jpg 800w,
                  /images/service3.jpg       996w
                "
                alt=""
                class="c-img c-cover"
              />
              <div class="service-slide_text">
                <div class="web-subheading-1 uc-white">Skin + Beauty</div>
                <div class="web-small_paragraph">
                  Your inside-out secret to brighter, smoother, softer skin.
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide class="services-slide swiper-slide">
              <img
                src="/images/service4.jpg"
                loading="lazy"
                sizes="(max-width: 996px) 100vw, 996px"
                srcset="
                  /images/service4-p-500.jpg 500w,
                  /images/service4-p-800.jpg 800w,
                  /images/service4.jpg       996w
                "
                alt=""
                class="c-img c-cover"
              />
              <div class="service-slide_text">
                <div class="web-subheading-1 uc-white">
                  Weight Support + Metabolic Care
                </div>
                <div class="web-small_paragraph">
                  Support that helps you feel lighter on your feet
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide class="services-slide swiper-slide">
              <img
                src="/images/service5.jpg"
                loading="lazy"
                sizes="(max-width: 996px) 100vw, 996px"
                srcset="
                  /images/service5-p-500.jpg 500w,
                  /images/service5-p-800.jpg 800w,
                  /images/service5.jpg       996w
                "
                alt=""
                class="c-img c-cover"
              />
              <div class="service-slide_text">
                <div class="web-subheading-1 uc-white">
                  Recovery + Restoration
                </div>
                <div class="web-small_paragraph">
                  The deep reset your body’s been asking for.
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide class="services-slide swiper-slide">
              <img
                src="/images/service6.jpg"
                loading="lazy"
                sizes="(max-width: 996px) 100vw, 996px"
                srcset="
                  /images/service6-p-500.jpg 500w,
                  /images/service6-p-800.jpg 800w,
                  /images/service6.jpg       996w
                "
                alt=""
                class="c-img c-cover"
              />
              <div class="service-slide_text">
                <div class="web-subheading-1 uc-white">Active Recovery</div>
                <div class="web-small_paragraph">
                  Help your body recharge after the hard work’s done<br />Restore
                  what your body spent
                </div>
              </div>
            </SwiperSlide>
            <!-- </div> -->
          </Swiper>
          <div class="product-btn_holder">
            <BrownButton text="See All Our Services" to="/products" />
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
                With a ZAYAÉ subscription, you get regular access to your
                favorite drips, on your schedule, in your space. Stay energized,
                supported, and radiant all month long without the hassle of
                booking from scratch every time.
              </div>
            </div>
            <BeigeButton text="Join the Wellness Circle" to="/contact" />
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
  </div>
</template>

<style lang="css" scoped>
.disabled {
  opacity: 0.5;
  pointer-events: none;
}
.c-container_pager {
  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    background-color: #e2cbbf;
  }
  .swiper-pagination-bullet-active {
    background-color: #974619;
    width: 180px;
  }
}
</style>
