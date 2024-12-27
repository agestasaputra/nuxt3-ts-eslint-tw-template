<template>
  <div class="bg-[#F9F9F9] shadow-md rounded-lg p-6">
    <div class="flex items-center mb-2 justify-between">
      <div class="flex">
        <div class="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
        <div>
          <h3 class="font-bold text-sm">{{ review.author }}</h3>
          <p class="text-xs text-gray-500">
            {{
              review.created_at
                ? new Date(review.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "-"
            }}
          </p>
        </div>
      </div>
      <div class="rounded-lg bg-[#C4C4C447] p-2">
        <span class="flex items-start text-yellow-500 text-lg">
          ★
          <p class="ml-2 text-black text-4xl font-semibold inline-block">
            {{ review.author_details.rating }}
          </p>
        </span>
      </div>
    </div>
    <div class="flex items-center mb-2"></div>
    <p
      v-if="!isExpanded && review.content"
      class="text-gray-700 text-sm line-clamp-3 text-justify"
      v-html="review.content"
    ></p>
    <p
      v-if="isExpanded && review.content"
      class="text-gray-700 text-sm text-justify"
      v-html="review.content"
    ></p>
    <nuxt-link
      v-if="isTruncatable"
      class="text-blue-500 cursor-pointer hover:underline text-sm"
      @click="toggleReadMore"
    >
      {{ isExpanded ? "Show less" : "Read more" }}
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
import type { Review } from "~/shared/interfaces";

const props = defineProps({
  review: {
    type: Object as () => Review,
    required: true,
  },
});

const isExpanded = ref<boolean>(false);
const isTruncatable = computed(() => props.review.content.length > 150);

// Truncate logic
// const truncatedText = computed(() => {
//   const maxLength = 450;
//   return props.review.content.length > maxLength
//     ? `${props.review.content.slice(0, maxLength)}...`
//     : props.review.content;
// });

function toggleReadMore() {
  isExpanded.value = !isExpanded.value;
}
</script>

<style scoped></style>
