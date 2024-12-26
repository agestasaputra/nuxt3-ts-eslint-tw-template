<template>
  <div class="h-full">
    <Navbar />
    <Slider
      :trending-movies="trendingMovies"
      @on-change-filter-discover-movies="onChangeFilterDiscoverMovies"
    />
    <div class="bg-[#292E36] h-[300px]"></div>
    <Discover
      :filter-disscover-movies="filterDisscoverMovies"
      :discover-movies="discoverMovies"
      @on-change-filter-discover-movies="onChangeFilterDiscoverMovies"
    />
    <div class="h-[58vw]"></div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import type {
  Movie,
  ResUpcomingMovie,
  // SwiperConfig,
  // SwiperRef,
} from "~/shared/interfaces";
import { authorization } from "~/shared/auth";

const trendingMovies = ref<Movie[]>([]);
const discoverMovies = ref<Movie[]>([]);
const filterDisscoverMovies = ref<string>("popular");

onMounted(() => {
  fetchUpcomingMovieList();
  onChangeFilterDiscoverMovies(filterDisscoverMovies.value);
});

function onChangeFilterDiscoverMovies(value: string) {
  try {
    fetchDiscoverMovieList(value);
    filterDisscoverMovies.value = value;
    const buttonPopular = document.getElementById("button-popular");
    const buttonReleaseDate = document.getElementById("button-release-date");

    if (buttonPopular && buttonReleaseDate && value === "popular") {
      buttonReleaseDate.classList.remove("bg-red-500");
      buttonReleaseDate.classList.remove("bg-grey-800");
      buttonReleaseDate.classList.add("bg-grey-800");

      buttonPopular.classList.remove("bg-red-500");
      buttonPopular.classList.remove("bg-grey-800");
      buttonPopular.classList.add("bg-red-500");
    }
    if (buttonPopular && buttonReleaseDate && value === "release-date") {
      buttonPopular.classList.remove("bg-red-500");
      buttonPopular.classList.remove("bg-grey-800");
      buttonPopular.classList.add("bg-grey-800");

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

    const res = await $fetch<ResUpcomingMovie>(url, {
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
      type === "popular"
        ? "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
        : "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";

    const res = await $fetch<ResUpcomingMovie>(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: authorization,
      },
    });
    if (!res) throw new Error("Failed to fetch");
    // onChangeFilterDiscoverMovies(type);
    discoverMovies.value = res.results.slice(0, 10);
  } catch (error) {
    console.error(error);
  }
}
</script>
