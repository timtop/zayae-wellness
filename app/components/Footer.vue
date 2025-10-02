<script setup lang="ts"></script>

<template>
  <section class="c-footer">
    <div class="c-container">
      <div class="footer-holder">
        <div class="footer-top">
          <div class="footer-logo_holder">
            <img
              src="/images/balck-logo.svg"
              loading="lazy"
              alt=""
              class="c-img c-cover"
            />
          </div>
          <div class="footer-subscribe">
            <div class="web-subheading-1">Subscribe to our newsletter</div>
            <div class="form-block w-form">
              <form
                id="email-form"
                name="email-form"
                data-name="Email Form"
                method="get"
                class="form"
                data-wf-page-id="68b2ce13f86be1d4249db61d"
                data-wf-element-id="5f78190f-d2db-80ad-9821-32356f72ccea"
              >
                <input
                  class="text-field w-input"
                  maxlength="256"
                  name="email"
                  data-name="Email"
                  placeholder="Email Address"
                  type="email"
                  id="email"
                /><input
                  type="submit"
                  data-wait="Please wait..."
                  class="submit-button w-button"
                  value="Submit"
                />
              </form>
              <div class="success-message w-form-done">
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
        <div class="footer-bottom">
          <div class="footer-link_holder">
            <div class="web-subheading-2">Our Company</div>
            <div class="footer-links_holder">
              <NuxtLink to="/" class="footer-link">Home</NuxtLink>
              <NuxtLink to="/products" class="footer-link">Products</NuxtLink>
              <NuxtLink to="/contact" class="footer-link">Contact</NuxtLink>
            </div>
          </div>
          <div class="footer-link_holder">
            <div class="web-subheading-2">Find Us</div>
            <div class="footer-links_holder">
              <a href="#" class="footer-link">bookings@zayaewellness.com</a>
              <a href="#" class="footer-link">+1 4109148640</a>
              <a href="#" class="footer-link"
                >849 Fairmount Avenue <br />Suite 200 T-26</a
              >
            </div>
          </div>
          <div class="footer-link_holder">
            <div class="web-subheading-2">Find Us</div>
            <div class="footer-links_holder">
              <a href="#" class="footer-link">Terms &amp; Conditions</a>
              <a href="#" class="footer-link">Privacy Policy</a>
            </div>
          </div>
          <div class="footer-link_holder">
            <div class="web-subheading-2">Socials</div>
            <div class="footer-social_holder">
              <a
                href="https://www.instagram.com/zayaewellness?igsh=OGhiMnVwazZuM3Ni"
                class="social-link_block w-inline-block"
                ><img src="/images/instagram.svg" loading="lazy" alt="" />
                <div class="text-block-4">Instagram</div>
              </a>
              <a
                href="https://www.tiktok.com/@zayae.wellness"
                target="_blank"
                class="social-link_block w-inline-block"
                ><img src="/images/tiktok.svg" loading="lazy" alt="" />
                <div class="text-block-5">TikTok</div>
              </a>
            </div>
          </div>
        </div>
        <div class="footer-copyright">
          <div class="hr"></div>
          <div>Zayae Wellness © All Rights Reserved</div>
        </div>
      </div>
    </div>
  </section>
</template>
