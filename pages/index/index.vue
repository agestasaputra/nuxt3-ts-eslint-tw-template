<template>
  <div class="h-full">
    <Slider
      :trending-movies="trendingMovies"
      @on-change-filter-discover-movies="onChangeFilterDiscoverMovies"
    />
    <div class="absolute left-0 bg-[#292E36] h-[300px] w-full -z-10"></div>
    <Discover
      :filter-disscover-movies="filterDisscoverMovies"
      :discover-movies="discoverMovies"
      @on-change-filter-discover-movies="onChangeFilterDiscoverMovies"
    />
  </div>
</template>

<script setup lang="ts">
import type { Movie } from "~/shared/interfaces";
import { authorization } from "~/shared/auth";

const trendingMovies = ref<Movie[]>([]);
const discoverMovies = ref<Movie[]>([]);
const filterDisscoverMovies = ref<string>("popularity");

onMounted(() => {
  fetchUpcomingMovieList();
  onChangeFilterDiscoverMovies(filterDisscoverMovies.value);
});

function onChangeFilterDiscoverMovies(value: string) {
  try {
    fetchDiscoverMovieList(value);
    filterDisscoverMovies.value = value;
    const buttonPopularity = document.getElementById("button-popularity");
    const buttonReleaseDate = document.getElementById("button-release-date");

    if (buttonPopularity && buttonReleaseDate && value === "popularity") {
      buttonReleaseDate.classList.remove("bg-red-500");
      buttonReleaseDate.classList.remove("bg-grey-800");
      buttonReleaseDate.classList.add("bg-grey-800");

      buttonPopularity.classList.remove("bg-red-500");
      buttonPopularity.classList.remove("bg-grey-800");
      buttonPopularity.classList.add("bg-red-500");
    }
    if (buttonPopularity && buttonReleaseDate && value === "release-date") {
      buttonPopularity.classList.remove("bg-red-500");
      buttonPopularity.classList.remove("bg-grey-800");
      buttonPopularity.classList.add("bg-grey-800");

      buttonReleaseDate.classList.remove("bg-red-500");
      buttonReleaseDate.classList.remove("bg-grey-800");
      buttonReleaseDate.classList.add("bg-red-500");
    }
  } catch (error) {
    console.error(error);
  }
}
async function fetchUpcomingMovieList() {
  try {
    const url = "https://api.themoviedb.org/3/trending/all/day?language=en-US";

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
    trendingMovies.value = res.results;
  } catch (error) {
    console.error(error);
  }
}

async function fetchDiscoverMovieList(type: string) {
  try {
    const url =
      type === "popularity"
        ? "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
        : "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";

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
    discoverMovies.value = res.results.slice(0, 10);
  } catch (error) {
    console.error(error);
  }
}
</script>
