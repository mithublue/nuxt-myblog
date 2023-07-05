<template>
  <article class="flex flex-col shadow my-4">
    <!-- Article Image -->
    <span class="hover:opacity-75">
        <img v-if="post.featuredImage" :src="post.featuredImage.node.sourceUrl">
      </span>
    <div class="bg-white flex flex-col justify-start p-6">
      <template v-if="post.categories">
        <NuxtLink v-for="(category,k) in post.categories.nodes" :to="'/category/' + category.slug" class="text-blue-700 text-sm font-bold uppercase pb-4">
          {{ category.name }}
        </NuxtLink>
      </template>
      <h1 href="#" class="text-3xl font-bold hover:text-gray-700 pb-4">{{ post.title }}</h1>
      <p href="#" class="text-sm pb-8">
        By <NuxtLink :to="'/author/' + post.author.node.slug"
                     class="font-semibold hover:text-gray-800">{{ post.author.node.firstname }} {{ post.author.node.lastname }}</NuxtLink>, Published on
        {{ post.date }}
      </p>
      <div v-html="post.content">
      </div>
    </div>
  </article>
</template>
<script setup>
const props = defineProps({
  post: {
    type: Object,
    default: {}
  }
})
</script>
