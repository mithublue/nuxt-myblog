<template>
  <article class="flex flex-col shadow my-4">
    <!-- Article Image -->
    <NuxtLink :to="'/post/' + post.databaseId" class="hover:opacity-75">
      <img v-if="post.featuredImage" :src="post.featuredImage.node.sourceUrl">
    </NuxtLink>
    <div class="bg-white flex flex-col justify-start p-6">
      <template v-for="category in post.categories.edges">
        <NuxtLink :to="'categories/' + category.node.databaseId" class="text-blue-700 text-sm font-bold uppercase pb-4">
          {{ category.node.name }}
        </NuxtLink>
      </template>
      <NuxtLink :to="'/post/' + post.databaseId" class="text-3xl font-bold hover:text-gray-700 pb-4">{{ post.title }}</NuxtLink>
      <NuxtLink :to="'/post/' + post.databaseId" class="text-sm pb-3">
        By <a href="#" class="font-semibold hover:text-gray-800">{{ post.author.node.name }}</a>, Published on {{ post.date }}
      </NuxtLink>
      <a href="#" class="pb-6" v-html="post.excerpt"></a>
      <NuxtLink :to="'/post/' + post.databaseId" class="uppercase text-gray-800 hover:text-black">Continue Reading <i class="fas fa-arrow-right"></i></NuxtLink>
    </div>
  </article>
</template>
<script setup>
const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})
</script>
