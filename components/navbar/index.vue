<template>
  <!-- Navbar -->
  <header class="bg-[#292E36] h-[66px] flex">
    <nav class="w-[1440px] flex flex-row mx-auto gap-28 px-8">
      <div class="flex gap-8 items-center">
        <nuxt-link to="/" class="w-[118px]">
          <img src="/assets/icons/moovie-time-logo.png" class="h-8" />
        </nuxt-link>
        <div
          class="flex flex-1 items-center bg-gray-800 text-gray-300 rounded-md p-2"
        >
          <div class="flex-shrink-0">
            <img src="/assets/icons/moovie-logo.png" class="h-5" />
          </div>
          <input
            type="text"
            placeholder="Find movie"
            class="flex-grow bg-transparent text-gray-300 placeholder-gray-500 px-4 focus:outline-none w-[33vw]"
          />
          <div class="flex-shrink-0 flex items-center">
            <button>
              <img src="/assets/icons/search-logo.png" class="h-5" />
            </button>
          </div>
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
import type { HeaderMenus } from "~/shared/interfaces";

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
</script>
