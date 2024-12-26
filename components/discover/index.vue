<template>
  <div class="absolute -mt-[270px] py-16 px-36 pb-0">
    <div class="flex justify-between mb-9">
      <h2 class="text-white text-2xl">Discover Movies</h2>
      <div class="flex gap-4">
        <button
          id="button-popularity"
          class="px-4 py-2 rounded-full bg-gray-800 text-white transition-colors"
          @click="emit('onChangeFilterDiscoverMovies', 'popularity')"
        >
          Popularity
        </button>
        <button
          id="button-release-date"
          class="px-4 py-2 rounded-full bg-gray-800 text-white transition-colors"
          @click="emit('onChangeFilterDiscoverMovies', 'release-date')"
        >
          Release Date
        </button>
      </div>
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
    >
      <template v-for="movie in props.discoverMovies" :key="movie.link">
        <CardMovie :movie="movie" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Movie } from "~/shared/interfaces";

const props = defineProps({
  discoverMovies: {
    type: Array as PropType<Movie[]>,
    default: () => [],
  },
  filterDisscoverMovies: {
    type: String,
    default: "popularity",
  },
});
const emit = defineEmits(["onChangeFilterDiscoverMovies"]);

onMounted(() => {
  emit("onChangeFilterDiscoverMovies", props.filterDisscoverMovies);
});
</script>
