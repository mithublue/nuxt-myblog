<script setup>
const route = useRoute();
const config = useRuntimeConfig();//route.params.category
const queryhead = `posts(first: 10 ` + (route.params.category ? `, where: {categoryName: "` + route.params.category +`"}` : ``) +` )`
const query = `query NewQuery {
  ` + queryhead + ` {
    nodes {
      id
      databaseId
      title
      excerpt
      slug
      categories {
        edges {
          node {
            id
            databaseId
            name
            link
          }
        }
      }
      author {
        node {
          id
          name
        }
      }
      date
      link
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
  categories {
    edges {
      node {
        id
        name
      }
    }
  }
  comments(last: 5) {
    edges {
      node {
        id
        content
        author {
          node {
            id
            name
          }
        }
      }
    }
  }
}`;
const {data : maindata} = await useFetch(config.public.wordpressUrl,{
  method: 'post',
  body: {
    query: query
  },
  transform(data) {
    return data.data;
  }
});
</script>
<template>
  <!-- Posts Section -->
  <section class="w-full md:w-2/3 flex flex-col items-center px-3">
    <template v-for="post in maindata.posts.nodes">
      <ContentsPostsLoop :post="post"></ContentsPostsLoop>
    </template>
    <!-- Pagination -->
    <div class="flex items-center py-8">
      <NuxtLink v-if="maindata.posts.pageInfo.hasPreviousPage" to="#" class="h-10 w-10 font-semibold text-gray-800 hover:text-gray-900 text-sm flex items-center justify-center ml-3">Previous <i class="fas fa-arrow-left ml-2"></i></NuxtLink>
      <NuxtLink v-if="maindata.posts.pageInfo.hasNextPage" to="#" class="h-10 w-10 font-semibold text-gray-800 hover:text-gray-900 text-sm flex items-center justify-center ml-3">Next <i class="fas fa-arrow-right ml-2"></i></NuxtLink>
    </div>
  </section>
  <Sidebar></Sidebar>
</template>
