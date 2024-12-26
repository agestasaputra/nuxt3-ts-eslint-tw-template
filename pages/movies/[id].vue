<template>
  <div class="h-full">
    <Navbar />
    <!-- Movie Hero -->
    <div class="relative h-96">
      <div class="absolute inset-0 bg-gradient-to-t from-gray-900"></div>
      <div class="container mx-auto px-4 pt-20">
        <div class="flex gap-8">
          <!-- Poster -->
          <img
            :src="movie.poster"
            :alt="movie.title"
            class="w-64 h-96 rounded-lg object-cover"
          />

          <!-- Movie Info -->
          <div class="text-white space-y-4">
            <div class="flex items-center gap-4">
              <span class="text-gray-400">{{ movie.year }}</span>
              <h1 class="text-4xl font-bold">{{ movie.title }}</h1>
            </div>
            <div class="text-sm">{{ movie.genres.join(", ") }}</div>

            <!-- Stats -->
            <div class="flex gap-8 py-4">
              <div class="flex items-center gap-2">
                <span class="text-yellow-400">★</span>
                <span class="text-2xl font-bold">{{ movie.rating }}</span>
                <span class="text-gray-400">{{ movie.votes }} votes</span>
              </div>
              <div class="flex gap-4 text-sm">
                <span>{{ movie.status }}</span>
                <span>{{ movie.language }}</span>
                <span>{{ movie.budget }}</span>
                <span>{{ movie.production }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Overview -->
    <div class="container mx-auto px-4 py-8">
      <h2 class="text-white text-xl font-bold mb-4">OVERVIEW</h2>
      <p class="text-gray-300">{{ movie.overview }}</p>

      <!-- Reviews -->
      <div class="mt-12">
        <h2 class="text-white text-xl font-bold mb-4">REVIEWS</h2>
        <div class="grid grid-cols-2 gap-8">
          <div
            v-for="review in movie.reviews"
            :key="review.author"
            class="bg-gray-800 p-6 rounded-lg"
          >
            <div class="flex justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gray-600 rounded-full"></div>
                <div>
                  <div class="text-white font-medium">{{ review.author }}</div>
                  <div class="text-gray-400 text-sm">{{ review.date }}</div>
                </div>
              </div>
              <div class="flex items-center">
                <span class="text-yellow-400">★</span>
                <span class="text-white ml-1">{{ review.rating }}</span>
              </div>
            </div>
            <p class="text-gray-300 text-sm">{{ review.content }}</p>
          </div>
        </div>
      </div>

      <!-- Recommendations -->
      <div class="mt-12">
        <h2 class="text-white text-xl font-bold mb-4">RECOMMENDATION MOVIES</h2>
        <div class="grid grid-cols-5 gap-6">
          <div
            v-for="movie in recommendedMovies"
            :key="movie.id"
            class="space-y-2"
          >
            <img
              :src="movie.poster"
              :alt="movie.title"
              class="w-full h-64 object-cover rounded-lg"
            />
            <div class="flex justify-between items-center">
              <span class="text-white font-medium">{{ movie.title }}</span>
              <span class="text-white">{{ movie.rating }}</span>
            </div>
            <div class="text-gray-400 text-sm">{{ movie.year }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const movie = ref({
  title: "Wonder Woman 1984",
  year: "2020",
  genres: ["Fantasy", "Action", "Adventure"],
  rating: "7.0",
  votes: "3621",
  status: "RELEASED",
  language: "ENGLISH",
  budget: "$200,000,000.00",
  production: "DC ENTERTAINMENT",
  overview:
    "Wonder Woman comes into conflict with the Soviet Union during the Cold War in the 1980s and finds a formidable foe by the name of the Cheetah.",
  reviews: [
    {
      author: "SWITCH.",
      date: "December 18, 2020",
      rating: "7.0",
      content:
        "It isn't as easy as saying 'Wonder Woman 1984' is a good or bad movie...",
    },
    // Add more reviews
  ],
});

const recommendedMovies = ref([
  {
    id: 1,
    title: "The New Mutants",
    year: "2020",
    rating: "7.0",
    poster: "/mutants.jpg",
  },
  // Add more movies
]);
</script>
