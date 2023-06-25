<script setup>
const params = useRoute().params;
const config = useRuntimeConfig();
const {data:single} = useFetch(config.public.wordpressUrl,{
  method: 'post',
  body: {
    query: `query NewQuery {
  post(
    id: "` + params.id + `"
    idType: DATABASE_ID
  ) {
    id
    content
    categories {
      nodes {
        name
        link
        slug
      }
    }
    author {
      node {
        firstName
        lastName
        slug
      }
    }
    date
    databaseId
    next {
      title
      slug
    }
    slug
    title
    previous {
      title
      slug
    }
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
}`
  },
  transform(data) {
    return data.data;
  }
});
</script>
<template>
  <!-- Post Section -->
  <section class="w-full md:w-2/3 flex flex-col items-center px-3">
    <template v-if="single.post">
      <ContentsPostSingle :post="single.post"></ContentsPostSingle>
      <div class="w-full flex pt-6">
        <NuxtLink v-if="single.post.previous" :to="single.post.previous.slug" class="w-1/2 bg-white shadow hover:shadow-md text-left p-6">
          <p class="text-lg text-blue-800 font-bold flex items-center"><i class="fas fa-arrow-left pr-1"></i> Previous</p>
          <p class="pt-2">{{ single.post.previous.title }}</p>
        </NuxtLink>
        <NuxtLink v-if="single.post.next" :to="single.post.next.slug" class="w-1/2 bg-white shadow hover:shadow-md text-right p-6">
          <p class="text-lg text-blue-800 font-bold flex items-center justify-end">Next <i class="fas fa-arrow-right pl-1"></i></p>
          <p class="pt-2">{{ single.post.next.title }}</p>
        </NuxtLink>
      </div>
      <template v-if="single.post.commentCount">
        <div v-for="(comment,c) in single.post.comments.nodes" class="w-full flex flex-col text-center md:text-left md:flex-row shadow bg-white mt-10 mb-10 p-6">
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
