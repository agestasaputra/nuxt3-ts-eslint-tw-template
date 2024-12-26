<template>
  <div class="h-full">
    <!-- Navbar -->
    <div class="py-2 px-28 bg-[#292E36] h-[66px] flex flex-row">
      <div class="flex gap-12 items-center">
        <img src="/assets/icons/moovie-time-logo.png" class="h-8" />
        <div class="flex items-center bg-gray-800 text-gray-300 rounded-md p-2">
          <div class="flex-shrink-0">
            <img src="/assets/icons/moovie-logo.png" class="h-5" />
          </div>
          <input
            type="text"
            placeholder="Find movie"
            class="flex-grow bg-transparent text-gray-300 placeholder-gray-500 px-4 focus:outline-none w-[700px]"
          />
          <div class="flex-shrink-0 flex items-center">
            <button>
              <img src="/assets/icons/search-logo.png" class="h-5" />
            </button>
          </div>
        </div>
      </div>
      <div class="flex flex-1 items-center justify-evenly">
        <template v-for="menu in headerMenus" :key="menu.name">
          <div v-if="menu.childs.length > 0" class="flex">
            <!-- Button -->
            <button
              id="button-menu-categories"
              type="button"
              class="inline-flex justify-center gap-x-1.5 text-sm text-white hover:text-[#E74B3C] uppercase"
              aria-expanded="false"
              aria-controls="dropdown-menu-categories"
              @click="toggleDropdown($event, 'menu-categories')"
            >
              <img src="/assets/icons/category-logo.png" class="h-5" />
              {{ menu.name }}
            </button>

            <!-- Child menu -->
            <div
              id="dropdown-menu-categories"
              class="absolute z-10 mt-8 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none hidden"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="button-menu-categories"
            >
              <div class="py-1" role="none">
                <!-- Active: "bg-gray-100 text-gray-900 outline-none", Not Active: "text-gray-700" -->
                <!-- <a
                  id="menu-item-0"
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                  >Account settings</a
                > -->
                <template v-for="child in menu.childs" :key="child.name">
                  <nuxt-link
                    to="/"
                    class="block px-4 py-2 text-sm text-gray-700 uppercase hover:text-[#E74B3C]"
                    >{{ child.name }}</nuxt-link
                  >
                </template>
              </div>
            </div>
          </div>
          <button
            v-else
            class="uppercase text-sm text-white hover:text-[#E74B3C]"
          >
            {{ menu.name }}
          </button>
        </template>
      </div>
    </div>

    <!-- Slider -->
    <div>
      <swiper-container ref="swiperElRef" init="false" class="w-full py-8">
        <swiper-slide
          v-for="(movie, key) in trendingMovies"
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
                <!-- Rating -->
                <div class="flex flex-row items-baseline gap-1">
                  <img src="/assets/icons/star-logo.png" class="h-4" />
                  <h6 class="text-lg text-white font-semibold">
                    {{ movie.vote_average }}
                  </h6>
                </div>
                <!-- Title -->
                <h3 class="text-xl text-white text-[28px] line-clamp-2">
                  {{ movie.title }}
                </h3>
                <!-- Year -->
                <div
                  class="flex items-center space-x-2 text-sm text-gray-400 mt-1"
                >
                  <p class="text-[16px] text-white">
                    {{
                      movie.release_date
                        ? movie.release_date.split("-")[0]
                        : "-"
                    }}
                  </p>
                  <span>•</span>
                </div>
                <!-- Overview -->
                <p class="mt-2 text-xs text-white line-clamp-[9]">
                  {{ movie.overview }}
                </p>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper-container>
    </div>

    <div class="bg-[#292E36] h-[300px]"></div>
    <!-- Discover -->
    <div class="absolute -mt-[270px] p-16 pb-0">
      <div class="flex justify-between mb-9">
        <h2 class="text-white text-2xl">Discover Movies</h2>
        <div class="flex gap-4">
          <button
            id="button-popular"
            class="px-4 py-2 rounded-full bg-gray-800 text-white transition-colors"
            @click="fetchDiscoverMovieList('popular')"
          >
            Popularity
          </button>
          <button
            id="button-release-date"
            class="px-4 py-2 rounded-full bg-gray-800 text-white transition-colors"
            @click="fetchDiscoverMovieList('release-date')"
          >
            Release Date
          </button>
        </div>
      </div>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
      >
        <template v-for="(movie, key) in discoverMovies" :key="key">
          <div class="relative group">
            <!-- Card Container -->
            <div
              class="relative overflow-hidden transition-transform duration-300 group-hover:scale-105"
            >
              <!-- Movie Image -->
              <div class="aspect-[2/3] relative">
                <img
                  :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
                  :alt="movie.title"
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
                    movie.vote_average.toFixed(1)
                  }}</span>
                </div>
              </div>

              <!-- Movie Info -->
              <div class="mt-2">
                <h3 class="text-white font-medium">{{ movie.title }}</h3>
                <p class="text-gray-400 text-sm">
                  {{
                    movie.release_date ? movie.release_date.split("-")[0] : "-"
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
      </div>
    </div>
    <div class="h-[58vw] min-h-[]"></div>

    <!-- Footer -->
    <div class="bg-[#15191E] p-16 flex justify-between">
      <p class="text-[#929292] text-[13px]">
        &copy;2021 MoovieTime. All rights reserved.
      </p>
      <img
        src="/assets/icons/moovie-time-grey-logo.png"
        alt="MoovieTime Logo"
        class="h-7"
      />
      <p class="text-[#929292] text-[13px]">Made with Nuxt.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  Movie,
  ResUpcomingMovie,
  SwiperConfig,
  SwiperRef,
} from "~/shared/interfaces";
import { authorization } from "~/shared/auth";

const headerMenus = ref([
  {
    name: "Categories",
    link: "/",
    icon: "",
    childs: [
      {
        name: "Action",
      },
      {
        name: "Adventure",
      },
      {
        name: "Animation",
      },
      {
        name: "Comedy",
      },
      {
        name: "Documentary",
      },
      {
        name: "Drama",
      },
      {
        name: "Family",
      },
      {
        name: "Fanntasy",
      },
      {
        name: "History",
      },
      {
        name: "Horror",
      },
    ],
  },
  {
    name: "Movies",
    link: "/movies",
    icon: "",
    childs: [],
  },
  {
    name: "Tv Shows",
    link: "/",
    icon: "",
    childs: [],
  },
  {
    name: "Login",
    link: "/",
    icon: "",
    childs: [],
  },
]);

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

const trendingMovies = ref<Movie[]>([]);
const discoverMovies = ref<Movie[]>([]);
const filterDisscoverMovies = ref<string>("popular");

onMounted(() => {
  // Add event listener for clicks outside
  document.addEventListener("click", closeDropdownOnClickOutside);

  fetchUpcomingMovieList();
  fetchDiscoverMovieList(filterDisscoverMovies.value);

  // Initialize Swiper
  if (swiperElRef.value) {
    // Mengatur parameter Swiper
    Object.assign(swiperElRef.value, swiperConfig);

    // Initialize Swiper
    swiperElRef.value.initialize();
  }
});

function onChangeFilterDiscoverMovies(value: string) {
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
    onChangeFilterDiscoverMovies(type);
    discoverMovies.value = res.results.slice(0, 10);
  } catch (error) {
    console.error(error);
  }
}

function toggleDropdown(event: MouseEvent, buttonTarget: string) {
  const button = event.currentTarget as HTMLButtonElement;
  const dropdownMenu = document.getElementById(`dropdown-${buttonTarget}`);
  if (!button || !dropdownMenu) return;

  // Get current state of aria-expanded
  const isExpanded = button.getAttribute("aria-expanded") === "true";
  // Toggle aria-expanded
  button.setAttribute("aria-expanded", String(!isExpanded));

  // Show or hide dropdown menu
  if (isExpanded) {
    dropdownMenu.classList.add("hidden");
  } else {
    dropdownMenu.classList.remove("hidden");
  }
}

// Close dropdown when clicking outside
function closeDropdownOnClickOutside(event: MouseEvent) {
  const buttonMenuCategories = document.getElementById(
    "button-menu-categories"
  );
  const dropdownMenuCategories = document.getElementById(
    "dropdown-menu-categories"
  );
  if (!buttonMenuCategories || !dropdownMenuCategories) return;
  if (
    !buttonMenuCategories.contains(event.target as HTMLButtonElement) &&
    !dropdownMenuCategories.contains(event.target as HTMLButtonElement)
  ) {
    buttonMenuCategories.setAttribute("aria-expanded", "false");
    dropdownMenuCategories.classList.add("hidden");
  }
}
</script>
