<script setup lang="ts">
const props = defineProps<{
  text: string;
  to: string;
}>();

// Remove the type annotation and initial value
const beigeBtn = ref();

const beigeBtnAnimationEnter = () => {
  if (beigeBtn.value) {
    beigeBtn.value.style.background =
      "conic-gradient(from -34.46deg at 95.69% 84.36%, #FEEAC6 0deg, #BE7F35 230.29deg, #FEEAC6 360deg)";
  }
};

const beigeBtnAnimationLeave = () => {
  if (beigeBtn.value) {
    beigeBtn.value.style.background = "";
  }
};
</script>

<template>
  <NuxtLink :to="props.to">
    <div
      @mouseenter="beigeBtnAnimationEnter"
      @mouseleave="beigeBtnAnimationLeave"
      ref="beigeBtn"
      class="c-beige_button w-button"
    >
      {{ props.text }}
    </div>
  </NuxtLink>
</template>
