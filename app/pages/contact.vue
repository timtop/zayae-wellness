<script setup lang="ts">
// const lenis = useLenis();

// onMounted(async () => {
//   lenis.initSmoothScroll();
// });

onMounted(() => {
  const form = document.getElementById("zayae-form") as HTMLFormElement | null;
  const successMessage = document.querySelector(
    ".success-message-contact"
  ) as HTMLElement | null;
  const errorMessage = document.querySelector(
    ".w-form-fail"
  ) as HTMLElement | null;
  const submitButton = form?.querySelector(
    'input[type="submit"]'
  ) as HTMLInputElement | null;

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Hide any previous messages
      if (successMessage) successMessage.style.display = "none";
      if (errorMessage) errorMessage.style.display = "none";

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.value = "Loading...";
      }

      const formData = new FormData(form);

      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbz2JC6H2TackhaX02xA7Pk2JVRfEatLOPQ0cmHpmZkO8fxc6GDgvxjM5-Y1OSmUR0vb/exec",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          form.reset();
          if (successMessage) successMessage.style.display = "block";
        } else {
          if (errorMessage) errorMessage.style.display = "block";
        }
      } catch (err) {
        if (errorMessage) errorMessage.style.display = "block";
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.value = "Send Message";
        }
      }
    });
  }
});
</script>

<template>
  <section class="contact-hero_section">
    <div class="product-hero">
      <img
        src="/images/cotact-hero.jpg"
        loading="lazy"
        sizes="(max-width: 1440px) 100vw, 1440px"
        srcset="
          /images/cotact-hero-p-500.jpg   500w,
          /images/cotact-hero-p-800.jpg   800w,
          /images/cotact-hero-p-1080.jpg 1080w,
          /images/cotact-hero.jpg        1440w
        "
        alt=""
        class="c-img c-cover"
      />
      <div class="c-container_hero">
        <div class="product-hero_text">
          <div class="custom-heading uc-white">Contact Us</div>
        </div>
      </div>
    </div>
  </section>
  <section class="contact-section">
    <div class="c-contact_container">
      <div class="contact-holder">
        <div class="contact-details_holder">
          <div class="contact-block">
            <div class="web-subheading-1">Address</div>
            <div class="web-paragraph-2">
              849 Fairmount Avenue <br />Suite 200 T-26
            </div>
          </div>
          <div class="contact-block">
            <div class="web-subheading-1">Contact</div>
            <div class="web-paragraph-2">+1 4109148640</div>
          </div>
          <div class="contact-block">
            <div class="web-subheading-1">Email</div>
            <div class="web-paragraph-2">bookings@zayaewellness.com</div>
          </div>
          <div class="contact-block">
            <div class="web-subheading-1">Socials</div>
            <div class="socials-holder">
              <a
                href="https://www.instagram.com/zayaewellness?igsh=OGhiMnVwazZuM3Ni"
                class="socials-link w-inline-block"
                ><img src="/images/ig-socail1.svg" loading="lazy" alt=""
              /></a>
              <a
                href="https://www.tiktok.com/@zayae.wellness"
                class="socials-link w-inline-block"
                ><img src="/images/tiktio-social1.svg" loading="lazy" alt=""
              /></a>
            </div>
          </div>
        </div>
        <div class="contact-form">
          <div class="form-heading">
            <div class="web-heading-4">Leave a message</div>
            <div class="web-paragraph-2">
              We are always ready to help you and answer your questions
            </div>
          </div>
          <div class="w-form">
            <form
              id="zayae-form"
              name="email-form-2"
              data-name="Email Form 2"
              method="get"
              class="form-2"
              data-wf-page-id="68ce563f687b9b48c00f7cc3"
              data-wf-element-id="b3106f24-c7b2-80e4-3860-61db2efc41e7"
            >
              <div class="form-layout_holders">
                <div class="details-holder">
                  <div class="full-name">
                    <label for="name" class="web-paragraph-2-copy uc-grey"
                      >Full Name</label
                    ><input
                      class="border-bottom_form w-input"
                      maxlength="256"
                      name="name"
                      data-name="Name"
                      placeholder=""
                      type="text"
                      id="name"
                    />
                  </div>
                  <div class="email">
                    <label for="email-2" class="web-paragraph-2-copy uc-grey"
                      >Email Address</label
                    ><input
                      class="border-bottom_form w-input"
                      maxlength="256"
                      name="email"
                      data-name="Email 2"
                      placeholder=""
                      type="email"
                      id="email-2"
                    />
                  </div>
                </div>
                <div class="details-message">
                  <label for="field" class="web-paragraph-2-copy uc-grey"
                    >Your Message</label
                  ><textarea
                    placeholder=""
                    maxlength="5000"
                    id="field"
                    name="field"
                    data-name="Field"
                    class="border-bottom_form w-input"
                  ></textarea>
                </div>
              </div>
              <div class="form-btn_holder">
                <input
                  type="submit"
                  data-wait="Please wait..."
                  class="c-brown_button w-button"
                  value="Send Message"
                />
              </div>
            </form>
            <div
              style="margin-top: 10px"
              class="success-message-contact w-form-done"
            >
              <div class="text-block-2">
                Thank you! Your submission has been received!
              </div>
            </div>
            <div class="w-form-fail">
              <div>Oops! Something went wrong while submitting the form.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <Cart />
</template>
