<template>
  <!-- Navbar -->
  <header class="bg-[#292E36] h-[66px] flex">
    <nav class="w-[1440px] flex flex-row mx-auto gap-28 px-8">
      <div class="flex gap-8 items-center">
        <nuxt-link to="/" class="w-[118px]">
          <img src="/assets/icons/moovie-time-logo.png" class="h-8" />
        </nuxt-link>
        <div
          class="flex flex-1 items-center bg-[#1A1E24] text-gray-300 rounded-md p-2"
        >
          <div class="flex-shrink-0">
            <img src="/assets/icons/moovie-logo.png" class="h-5" />
          </div>
          <input
            v-model="keyword"
            type="text"
            placeholder="Find movie"
            class="flex-grow bg-transparent text-gray-300 placeholder-gray-500 px-4 focus:outline-none w-[33vw]"
            @input="onInputSearch"
          />
          <div class="flex-shrink-0 flex items-center">
            <button>
              <img src="/assets/icons/search-logo.png" class="h-5" />
            </button>
          </div>
          <ul
            v-if="results.length > 0"
            class="absolute w-[35.5vw] max-h-[300px] bg-black z-30 top-14 rounded-md p-4 overflow-auto"
          >
            <li
              v-for="result in results"
              :key="result.id"
              class="text-white pb-2 cursor-pointer hover:underline hover:text-[#E74B3C] capitalize"
              @click="selectResult"
            >
              <nuxt-link
                class="w-full inline-block"
                :to="`/movies/${result.id}`"
              >
                {{ result.title }}
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="flex flex-1 justify-end">
        <div class="flex flex-1 items-center justify-between">
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
                class="absolute z-20 mt-8 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none hidden"
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
                      :to="menu.link"
                      class="block px-4 py-2 text-sm text-gray-700 uppercase hover:text-[#E74B3C]"
                      >{{ child.name }}</nuxt-link
                    >
                  </template>
                </div>
              </div>
            </div>
            <nuxt-link
              v-else
              class="uppercase text-sm text-white hover:text-[#E74B3C]"
              :to="menu.link"
            >
              {{ menu.name }}
            </nuxt-link>
          </template>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import type { HeaderMenus, Movie } from "~/shared/interfaces";
import { authorization } from "~/shared/auth";

const headerMenus = ref<HeaderMenus[]>([
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
const keyword = ref<string>("");
const results = ref<Movie[]>([]);
let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

onMounted(() => {
  // Add event listener for clicks outside
  document.addEventListener("click", closeDropdownOnClickOutside);
});

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

function onInputSearch(event: Event) {
  const input = event.target as HTMLInputElement;
  if (!input) return;
  if (debounceTimeout) clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    fetchMovieSuggestions(input.value);
  }, 300);
}

function selectResult() {
  keyword.value = "";
  results.value = [];
  if (debounceTimeout) clearTimeout(debounceTimeout);
}

async function fetchMovieSuggestions(keyword: string) {
  try {
    const url = `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=en-US&page=1`;

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
    results.value = res.results;
  } catch (error) {
    console.error(error);
  }
}
</script>
