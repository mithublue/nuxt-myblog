<script setup>
const params = useRoute().params;
const config = useRuntimeConfig();
const query = `query MyQuery {
  page(id: "` + params.slug + `", idType: URI) {
    id
    slug
    content
    author {
      node {
        firstName
        lastName
        slug
      }
    }
    date
    databaseId
    commentCount
    comments(first: 10) {
      nodes {
        author {
          node {
            avatar {
              default
            }
            name
            email
            url
          }
        }
        date
        content
        replies {
          nodes {
            author {
              node {
                avatar {
                  default
                }
                email
                name
                url
              }
            }
            content
            date
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
    featuredImage {
      node {
        sourceUrl
      }
    }
  }
}`;
const {data:single} = await useFetch(config.public.wordpressUrl,{
  method: 'post',
  body: {
    query: query
  },
  transform(data) {
    return data.data;
  }
});
console.log(query);
</script>
<template>
  <!-- Post Section -->
  <section class="w-full md:w-2/3 flex flex-col items-center px-3">
    <template v-if="single.page">
      <ContentsPostSingle :post="single.page"></ContentsPostSingle>
      <template v-if="single.page.commentCount">
        <div v-for="(comment,c) in single.page.comments.nodes" class="w-full flex flex-col text-center md:text-left md:flex-row shadow bg-white mt-10 mb-10 p-6">
          <div class="w-full md:w-1/5 flex justify-center md:justify-start pb-4">
            <img :src="comment.author.node.avatar ? comment.author.node.avatar.default : '~/assets/images/avatar.jpg'" class="rounded-full shadow h-32 w-32">
          </div>
          <div class="flex-1 flex flex-col justify-center md:justify-start">
            <p class="font-semibold text-2xl"><NuxtLink :to="comment.author.node.url">{{ comment.author.node.name }}</NuxtLink></p>
            <div class="pt-2" v-html="comment.content"></div>
          </div>
        </div>
      </template>
    </template>
    <template v-else>
      No Post Found !
    </template>
  </section>

  <!-- Sidebar Section -->
  <Sidebar></Sidebar>
</template>
