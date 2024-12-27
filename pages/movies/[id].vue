<template>
  <div class="h-full">
    <!-- Backdrop -->
    <section
      v-if="movie"
      class="relative bg-cover bg-center h-[500px] overflow-hidden z-10"
      :style="{
        backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')`,
      }"
    >
      <section
        class="h-[80px] bg-black/50 text-white py-4 px-96 relative -bottom-[85.6%]"
      >
        <div class="container mx-auto flex justify-around items-center">
          <!-- Rating -->
          <div class="flex items-center space-x-2">
            <span class="text-yellow-500 text-3xl">★</span>
            <div>
              <div class="text-4xl font-semibold mx-4">7.0</div>
            </div>
            <div>
              <h6 class="text-xs text-#FFFFFF80 text-gray-400">User score</h6>
              <p class="text-xs text-white uppercase">
                {{ movie.vote_count }} VOTES
              </p>
            </div>
          </div>

          <!-- Status -->
          <div>
            <h6 class="text-xs text-#FFFFFF80 text-gray-400">Status</h6>
            <p class="text-xs text-white">
              {{ movie.status || "Coming soon" }}
            </p>
          </div>

          <!-- Language -->
          <div>
            <h6 class="text-xs text-#FFFFFF80 text-gray-400">Language</h6>
            <p class="text-xs text-white uppercase">
              {{ movie.original_language }}
            </p>
          </div>

          <!-- Budget -->
          <div>
            <h6 class="text-xs text-#FFFFFF80 text-gray-400">Budget</h6>
            <p class="text-xs text-white uppercase">{{ movie.budget }}</p>
          </div>

          <!-- Production -->
          <div>
            <h6 class="text-xs text-#FFFFFF80 text-gray-400">Production</h6>
            <p class="text-xs text-white uppercase">
              {{
                movie.production_companies.length > 0
                  ? movie.production_companies[0].name
                  : "-"
              }}
            </p>
            <!-- <div class="flex items-end">
              <p
                v-for="company in movie.production_companies"
                :key="company.id"
                class="text-xs text-white uppercase"
              >
                {{ company.name }}
              </p>
            </div> -->
          </div>
        </div>
      </section>
      <div class="absolute inset-0 bg-black/50"></div>
    </section>

    <div v-if="movie" class="px-28 py-16 -mt-[270px] bg-white">
      <!-- Overview -->
      <div class="flex gap-8 relative z-10">
        <img
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
          :alt="movie.title"
          class="h-[330px] object-cover"
        />
        <div class="text-white flex flex-col justify-between">
          <div>
            <p class="text-lg text-gray-400">
              {{
                movie.release_date
                  ? movie.release_date.split("-")[0]
                  : "Coming soon"
              }}
            </p>
            <h1 class="text-4xl font-bold mt-0">{{ movie.title }}</h1>
          </div>

          <div>
            <h3 class="text-sm font-semibold text-[#FF0000] mb-2 uppercase">
              Overview
            </h3>
            <p class="text-sm text-black">
              {{ movie.overview }}
            </p>
          </div>
        </div>
      </div>

      <!-- Reviews -->
      <section v-if="reviews && reviews.length > 0" class="mt-14">
        <h3 class="text-sm font-semibold text-[#FF0000] mb-6 uppercase">
          Reviews
        </h3>
        <div class="container mx-auto">
          <div class="grid gap-4 grid-cols-2">
            <CardReview
              v-for="(review, index) in reviews"
              :key="index"
              :review="review"
            />
          </div>
        </div>
      </section>
    </div>

    <!-- Recommendation Movies -->
    <section class="my-14">
      <h3 class="text-sm font-semibold text-white mb-6 uppercase">
        Recommendation Movies
      </h3>
      <div v-if="recommendationMovies" class="grid grid-cols-5 gap-6">
        <template v-for="item in recommendationMovies" :key="item.id">
          <CardMovie :movie="item" />
        </template>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Movie, Review } from "~/shared/interfaces";
import { authorization } from "~/shared/auth";

const movie = ref<Movie | null>(null);
const reviews = ref<Review[] | null>(null);
const recommendationMovies = ref<Movie[] | null>(null);

const route = useRoute();

onMounted(() => {
  const movieId = Number(route.params.id);
  if (movieId) {
    fetchMovieDetail(movieId);
    fetchReviews(movieId);
    fetchRecommendationMovies(movieId);
  }
});

async function fetchMovieDetail(movieId: number) {
  try {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;

    const res = await $fetch<Movie>(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: authorization,
      },
    });
    if (!res) throw new Error("Failed to fetch");
    movie.value = res;
  } catch (error) {
    console.error(error);
  }
}

async function fetchReviews(movieId: number) {
  try {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`;

    const res = await $fetch<{
      id: number;
      page: number;
      results: Review[];
      total_pages: number;
      total_results: number;
    }>(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: authorization,
      },
    });
    if (!res) throw new Error("Failed to fetch");
    reviews.value = res.results.slice(0, 2);
  } catch (error) {
    console.error(error);
  }
}

async function fetchRecommendationMovies(movieId: number) {
  try {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=1`;

    const res = await $fetch<{
      page: number;
      results: Movie[];
      total_pages: number;
      total_results: number;
    }>(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: authorization,
      },
    });
    if (!res) throw new Error("Failed to fetch");
    recommendationMovies.value = res.results.slice(0, 5);
  } catch (error) {
    console.error(error);
  }
}
</script>
