<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { format } from "date-fns";
import { today, getLocalTimeZone, CalendarDate } from "@internationalized/date";
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

// Get today's date as the minimum selectable date
const minDate = today(getLocalTimeZone());

// Check if selected date is today
const isToday = computed(() => {
  if (!date.value) return false;
  const now = new Date();
  return (
    date.value.getFullYear() === now.getFullYear() &&
    date.value.getMonth() === now.getMonth() &&
    date.value.getDate() === now.getDate()
  );
});

// Get current time as minimum time for today
const minTime = computed(() => {
  if (!isToday.value) return "";
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
});

// Validate if a time is in the past
const isTimePast = (timeString: string): boolean => {
  if (!isToday.value || !timeString) return false;
  const now = new Date();
  const timeParts = timeString.split(":");
  if (timeParts.length !== 2 || !timeParts[0] || !timeParts[1]) return false;
  const hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);
  if (isNaN(hours) || isNaN(minutes)) return false;
  const selectedDateTime = new Date();
  selectedDateTime.setHours(hours, minutes, 0, 0);
  return selectedDateTime < now;
};

// Watch for time changes and validate against current time
watch(time, (newTime) => {
  if (isToday.value && newTime) {
    if (isTimePast(newTime)) {
      // Reset to empty if trying to select a past time
      time.value = "";
    }
  }
});

// Watch for date changes and clear invalid time
watch(date, () => {
  if (isToday.value && time.value) {
    if (isTimePast(time.value)) {
      time.value = "";
    }
  }
});

// Convert Date to DateValue for the Calendar component
const calendarValue = computed({
  get: (): DateValue | undefined => {
    if (!date.value) return undefined;
    // Properly convert JavaScript Date to CalendarDate
    return new CalendarDate(
      date.value.getFullYear(),
      date.value.getMonth() + 1, // JavaScript months are 0-indexed
      date.value.getDate()
    ) as DateValue;
  },
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
          <Calendar v-model="calendarValue" :min-value="minDate" />
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
            :min="isToday ? minTime : undefined"
            class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brown-500"
          />
        </PopoverContent>
      </Popover>
    </div>
  </div>
</template>
