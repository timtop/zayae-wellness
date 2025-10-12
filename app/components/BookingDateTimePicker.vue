<script setup lang="ts">
import { ref, computed } from "vue";
import { format } from "date-fns";
import type { DateValue } from "reka-ui";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

const date = defineModel<Date | null>("date", { default: null });
const time = defineModel<string>("time", { default: "" });

// Convert Date to DateValue for the Calendar component
const calendarValue = computed({
  get: () => (date.value ? (date.value as unknown as DateValue) : undefined),
  set: (val: DateValue | undefined) => {
    if (val) {
      // Convert DateValue to JavaScript Date object
      const jsDate = new Date(val.year, val.month - 1, val.day);
      date.value = jsDate;
    } else {
      date.value = null;
    }
  },
});

const formattedDate = computed(() =>
  date.value ? format(date.value, "EEE, MMM d, yyyy") : "Select date"
);
</script>

<template>
  <div class="text-lg font-semibold pb-1">Book appointment</div>
  <div class="flex gap-4 w-full max-w-sm">
    <!-- Date Picker -->
    <div>
      <label class="block mb-2 text-sm font-medium text-gray-700">
        Select Date
      </label>

      <Popover>
        <PopoverTrigger as-child>
          <Button
            variant="outline"
            class="w-full justify-start text-left font-normal [border:1px_solid_#0000001a!important]"
          >
            <span>{{ formattedDate }}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent class="p-0 !z-[150]" side="bottom" align="start">
          <Calendar v-model="calendarValue" />
        </PopoverContent>
      </Popover>
    </div>

    <!-- Time Picker -->
    <div>
      <label class="block mb-2 text-sm font-medium text-gray-700">
        Select Time
      </label>

      <Popover>
        <PopoverTrigger as-child>
          <Button
            variant="outline"
            class="w-full justify-start text-left font-normal [border:1px_solid_#0000001a!important]"
          >
            <span>{{ time || "Select time" }}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          class="p-3 w-[240px] !z-[150]"
          side="bottom"
          align="start"
        >
          <input
            type="time"
            v-model="time"
            class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brown-500"
          />
        </PopoverContent>
      </Popover>
    </div>
  </div>
</template>
