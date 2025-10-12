<script setup lang="ts">
import { TooltipProvider } from "@/components/ui/tooltip";
</script>

<template>
  <div>
    <TooltipProvider>
      <NavBar />
      <slot />
      <Footer />
    </TooltipProvider>
  </div>
</template>
