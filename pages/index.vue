<template>
  <div>
    <div
      class="py-2 px-28 bg-[#292E36] h-[66px] flex items-center justify-around"
    >
      <img src="/assets/icons/moovie-time-logo.png" class="h-8" />

      <div
        class="flex items-center bg-gray-800 text-gray-300 rounded-md p-2 w-full max-w-md"
      >
        <div class="flex-shrink-0">
          <img src="/assets/icons/moovie-logo.png" class="h-5" />
        </div>
        <input
          type="text"
          placeholder="Find movie"
          class="flex-grow bg-transparent text-gray-300 placeholder-gray-500 px-4 focus:outline-none"
        />
        <div class="flex-shrink-0 flex items-center">
          <button>
            <img src="/assets/icons/search-logo.png" class="h-5" />
          </button>
        </div>
      </div>

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

    <!-- Slider -->
    <div>
      <swiper-container ref="swiperElRef" init="false" class="w-full py-8">
        <swiper-slide
          v-for="(movie, id) in trendingMovies"
          :key="id"
          class="flex h-[400px]"
        >
          <div class="flex flex-row items-center">
            <div class="w-[50%]">
              <img
                :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
                :alt="movie.title"
              />
            </div>
            <div class="w-[50%] bg-black h-[80%]">
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
    <div>
      <div class="flex justify-between">
        <h2 class="text-white text-2xl">Discover Movies</h2>
        <div class="flex gap-4">
          <button
            class="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            Popularity
          </button>
          <button
            class="px-4 py-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
          >
            Release Date
          </button>
        </div>
      </div>
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
  // autoHeight: true,
  // height: "500px",
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

onMounted(() => {
  // Add event listener for clicks outside
  document.addEventListener("click", closeDropdownOnClickOutside);

  fetchUpcomingMovieList();
  fetchDiscoverMovieList();

  // Initialize Swiper
  if (swiperElRef.value) {
    // Mengatur parameter Swiper
    Object.assign(swiperElRef.value, swiperConfig);

    // Initialize Swiper
    swiperElRef.value.initialize();

    console.log("swiperElRef.value:", swiperElRef.value);
  }
});

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
    console.log("res:", res);
    console.log(
      "typeof res.results[0].release_date:",
      typeof res.results[0].release_date
    );
  } catch (error) {
    console.log(error);
  }
}

async function fetchDiscoverMovieList() {
  try {
    const url =
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";

    const res = await $fetch<ResUpcomingMovie>(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: authorization,
      },
    });
    if (!res) throw new Error("Failed to fetch");
    discoverMovies.value = res.results;
    console.log("res:", res);
    console.log(
      "typeof res.results[0].release_date:",
      typeof res.results[0].release_date
    );
  } catch (error) {
    console.log(error);
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
