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

// Define working hours (9am to 5pm)
const WORKING_HOURS_START = 9;
const WORKING_HOURS_END = 17;

// Generate time slots from 9am to 5pm
const generateTimeSlots = () => {
  const slots: string[] = [];
  for (let hour = WORKING_HOURS_START; hour <= WORKING_HOURS_END; hour++) {
    // Add hour:00
    const hourStr = String(hour).padStart(2, "0");
    slots.push(`${hourStr}:00`);
    // Add hour:30 (except for the last hour)
    if (hour < WORKING_HOURS_END) {
      slots.push(`${hourStr}:30`);
    }
  }
  return slots;
};

const timeSlots = generateTimeSlots();

// Filter available time slots based on current time if today
const availableTimeSlots = computed(() => {
  if (!isToday.value) return timeSlots;

  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTimeInMinutes = currentHour * 60 + currentMinute;

  return timeSlots.filter(slot => {
    const parts = slot.split(':');
    const hours = parseInt(parts[0] || '0', 10);
    const minutes = parseInt(parts[1] || '0', 10);
    const slotTimeInMinutes = hours * 60 + minutes;
    return slotTimeInMinutes > currentTimeInMinutes;
  });
});

// Validate if a time is outside working hours or in the past
const isTimeInvalid = (timeString: string): boolean => {
  if (!timeString) return false;

  // Check if time is in available slots
  const isAvailable = availableTimeSlots.value.includes(timeString);
  return !isAvailable;
};

// Watch for time changes and validate against working hours and current time
watch(time, (newTime) => {
  if (newTime) {
    if (isTimeInvalid(newTime)) {
      // Reset to empty if trying to select an invalid time
      time.value = "";
    }
  }
});

// Watch for date changes and clear invalid time
watch(date, () => {
  if (time.value) {
    if (isTimeInvalid(time.value)) {
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

// Format time to 12-hour format with AM/PM
const formatTime = (timeString: string): string => {
  if (!timeString) return timeString;
  const [hours, minutes] = timeString.split(':').map(Number);
  if (hours === undefined || minutes === undefined) return timeString;
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${String(minutes).padStart(2, '0')} ${period}`;
};

const formattedTime = computed(() =>
  time.value ? formatTime(time.value) : "Select time"
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
            <span>{{ formattedTime }}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          class="p-3 w-[240px] max-h-[300px] overflow-y-auto !z-[150]"
          side="bottom"
          align="start"
        >
          <div class="space-y-1">
            <button
              v-for="slot in availableTimeSlots"
              :key="slot"
              @click="time = slot"
              class="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors"
              :class="{ 'bg-brown-500 text-white hover:bg-brown-600': time === slot }"
            >
              {{ formatTime(slot) }}
            </button>
            <div v-if="availableTimeSlots.length === 0" class="px-3 py-2 text-sm text-gray-500 text-center">
              No available times today
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  </div>
</template>
