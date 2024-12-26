<template>
  <div class="relative group">
    <!-- Card Container -->
    <div
      class="relative overflow-hidden transition-transform duration-300 group-hover:scale-105"
    >
      <!-- Movie Image -->
      <div class="aspect-[2/3] relative">
        <img
          :src="`https://image.tmdb.org/t/p/w500${props.movie.poster_path}`"
          :alt="props.movie.title"
          class="w-full h-full object-cover"
        />

        <!-- Rating Badge -->
        <div
          class="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded flex items-center gap-1"
        >
          <svg
            class="w-4 h-4 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
          <span class="text-white font-medium">{{
            props.movie.vote_average.toFixed(1)
          }}</span>
        </div>
      </div>

      <!-- Movie Info -->
      <div class="mt-2">
        <h3 class="text-white font-medium">{{ props.movie.title }}</h3>
        <p class="text-gray-400 text-sm">
          {{
            props.movie.release_date
              ? props.movie.release_date.split("-")[0]
              : "-"
          }}
        </p>
      </div>

      <!-- Hover Overlay -->
      <div
        class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
      >
        <button
          class="bg-red-600 text-white px-6 py-2 rounded-full font-medium transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
        >
          VIEW
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Movie } from "~/shared/interfaces";

const props = defineProps({
  movie: {
    type: Object as PropType<Movie>,
    default: () => ({}),
  },
});
</script>
