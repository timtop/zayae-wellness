<script setup lang="ts">
const props = defineProps<{
  text: string;
  to: string;
}>();

// Remove the type annotation and initial value
const brownBtn = ref();

const brownBtnAnimationEnter = () => {
  if (brownBtn.value) {
    brownBtn.value.style.background =
      "conic-gradient(from -33.37deg at 89.13% 75.18%, #974619 0deg, #B88163 230.29deg, #974619 360deg)";
  }
};

const brownBtnAnimationLeave = () => {
  if (brownBtn.value) {
    brownBtn.value.style.background = "";
  }
};
</script>

<template>
  <NuxtLink :to="props.to">
    <div
      @mouseenter="brownBtnAnimationEnter"
      @mouseleave="brownBtnAnimationLeave"
      ref="brownBtn"
      class="c-brown_button w-button"
    >
      {{ props.text }}
    </div>
  </NuxtLink>
</template>
