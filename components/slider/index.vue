<template>
  <swiper-container ref="swiperElRef" init="false" class="w-full py-8">
    <swiper-slide
      v-for="(movie, key) in props.trendingMovies"
      :key="key"
      class="flex h-[400px]"
    >
      <div class="flex flex-row items-center">
        <div class="w-[50%]">
          <img
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            :alt="movie.title"
          />
        </div>
        <div class="w-[50%] bg-black h-[77%]">
          <div class="p-6">
            <div class="flex flex-row items-baseline gap-1">
              <img src="/assets/icons/star-logo.png" class="h-4" />
              <h6 class="text-lg text-white font-semibold">
                {{ movie.vote_average }}
              </h6>
            </div>

            <h3 class="text-xl text-white text-[28px] line-clamp-2">
              {{ movie.title }}
            </h3>

            <div class="flex items-center space-x-2 text-sm text-gray-400 mt-1">
              <p class="text-[16px] text-white">
                {{
                  movie.release_date
                    ? movie.release_date.split("-")[0]
                    : "Coming soon"
                }}
              </p>
              <span>•</span>
            </div>

            <p class="mt-2 text-xs text-white line-clamp-[9]">
              {{ movie.overview }}
            </p>
          </div>
        </div>
      </div>
    </swiper-slide>
  </swiper-container>
</template>

<script setup lang="ts">
import type { Movie, SwiperConfig, SwiperRef } from "~/shared/interfaces";

const props = defineProps({
  trendingMovies: {
    type: Array as PropType<Movie[]>,
    default: () => [],
  },
});

const swiperElRef = ref<SwiperRef | null>(null);
const swiperConfig: SwiperConfig = {
  slidesPerView: 3,
  spaceBetween: 30,
  navigation: true,
  pagination: {
    clickable: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
};

onMounted(() => {
  // Initialize Swiper
  if (swiperElRef.value) {
    // Mengatur parameter Swiper
    Object.assign(swiperElRef.value, swiperConfig);

    // Initialize Swiper
    swiperElRef.value.initialize();
  }
});
</script>
