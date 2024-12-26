<template>
  <div class="h-full">
    <Navbar />
    <main class="px-36 py-8">
      <div class="flex">
        <!-- Filter Sidebar -->
        <aside class="w-[240px] mr-14">
          <div class="bg-[#101925] rounded-lg p-4">
            <h2 class="text-lg font-semibold text-white mb-4">
              Sort Result By
            </h2>
            <select
              v-model="sortResultBy"
              class="w-full px-3 py-2 bg-gray-700 rounded-lg text-white"
            >
              <option value="popularity">Popularity</option>
              <option value="release-date">Release Date</option>
              <option value="rating">Rating</option>
            </select>
          </div>
          <div class="bg-[#101925] rounded-lg p-4 mt-4">
            <h2 class="text-lg font-semibold text-white mb-4">Genres</h2>
            <ul>
              <li
                v-for="genre in genres"
                :key="genre.id"
                class="mb-3 flex justify-between"
              >
                <label :for="genre.name" class="text-white">
                  {{ genre.name }}</label
                >
                <input
                  :id="genre.name"
                  v-model="selectedGenres"
                  type="checkbox"
                  :value="genre.id"
                />
              </li>
            </ul>
          </div>
        </aside>

        <!-- Movie List -->
        <main class="flex-1">
          <section class="flex-1 grid grid-cols-4 gap-4">
            <template v-for="movie in discoverMovies" :key="movie.link">
              <CardMovie :movie="movie" />
            </template>
          </section>
          <div class="w-full text-center mt-8">
            <button
              class="px-6 py-2 bg-red-600 text-white rounded-lg"
              @click="fetchDiscoverMovieList(sortResultBy, true)"
            >
              Load More
            </button>
          </div>
        </main>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { Genre, Movie } from "~/shared/interfaces";
import { authorization } from "~/shared/auth";

const discoverMovies = ref<Movie[]>([]);
const selectedGenres = ref<Array<number>>([]);
const genres = ref<Genre[]>([]);
const page = ref<number>(1);
const sortResultBy = ref<string>("popularity");

onMounted(() => {
  fetchGenreList();
});

watch(
  () => sortResultBy.value,
  (newValue) => {
    page.value = 1;
    fetchDiscoverMovieList(newValue, false);
  },
  { immediate: true, deep: true }
);

watch(
  () => selectedGenres.value,
  (newValue) => {
    if (newValue.length === 0) {
      page.value = 1;
      fetchDiscoverMovieList(sortResultBy.value, false);
    }
    if (newValue.length > 0) {
      const filteredMovies = discoverMovies.value.filter((movie) =>
        movie.genre_ids.some((genre) => newValue.includes(genre))
      );
      discoverMovies.value = filteredMovies;
    }
  },
  { immediate: true, deep: true }
);

async function fetchDiscoverMovieList(value: string, isLoadMore: boolean) {
  try {
    let url = "";
    if (value === "popularity") {
      url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page.value}`;
    }
    if (value === "release-date") {
      url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page.value}`;
    }
    if (value === "rating") {
      url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page.value}`;
    }

    const res = await $fetch<{
      results: Movie[];
      page: number;
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
    discoverMovies.value = isLoadMore
      ? [...discoverMovies.value, ...res.results]
      : res.results;

    if (selectedGenres.value.length > 0) {
      const filteredMovies = discoverMovies.value.filter((movie) =>
        movie.genre_ids.some((genre) => selectedGenres.value.includes(genre))
      );
      discoverMovies.value = filteredMovies;
    }
    page.value++;
  } catch (error) {
    console.error(error);
  }
}
async function fetchGenreList() {
  try {
    const url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
    const res = await $fetch<{ genres: Genre[] }>(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: authorization,
      },
    });
    if (!res) throw new Error("Failed to fetch");
    genres.value = res.genres;
  } catch (error) {
    console.error(error);
  }
}
</script>
