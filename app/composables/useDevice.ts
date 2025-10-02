export const useDevice = () => {
  const isMobile = ref(false);
  const isMobileLandscape = ref(false);
  const isTablet = ref(false);

  const checkDevice = () => {
    if (window.innerWidth <= 991 && window.innerWidth > 767) {
      isTablet.value = true;
      isMobile.value = false;
      isMobileLandscape.value = false;
    } else if (window.innerWidth <= 767 && window.innerWidth > 490) {
      isMobileLandscape.value = true;
      isMobile.value = false;
      isTablet.value = false;
    } else if (window.innerWidth <= 490) {
      isMobile.value = true;
      isMobileLandscape.value = false;
      isTablet.value = false;
    } else {
      isMobile.value = false;
      isMobileLandscape.value = false;
      isTablet.value = false;
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("resize", () => {
      checkDevice();
    });
    checkDevice();
  }

  return reactive({
    isMobile,
    isMobileLandscape,
    isTablet,
    checkDevice,
  });
};
