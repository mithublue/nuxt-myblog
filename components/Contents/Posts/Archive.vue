<script setup>
const route = useRoute();
const config = useRuntimeConfig();//route.params.category
function get_query( after,before ) {
  let first,last;
  if ( after ) {
    first = 10;
  } else if ( before ) {
    last = 10;
  }
  const queryhead = `posts(` + ( before ? `before: "` + before + `", last: ` + last : `` ) + ( after ? ` after: "` + after + `", first: 10 ` : `` ) + (route.params.category ? `, where: {categoryName: "` + route.params.category +`"}` : ``) +` )`
  let query = `query NewQuery {
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
  return query;
}
/*const {data : maindata} = await useFetch(config.public.wordpressUrl,{
  method: 'post',
  body: {
    query: query
  },
  transform(data) {
    return data.data;
  }
});*/
let { data: maindata } = await useAsyncData(
    'maindata',
    () => $fetch(config.public.wordpressUrl, {
      method: 'post',
      body: {
        query: get_query('q')
      },
      transform(data) {
        return maindata.data;
      }
    })/*, {
      watch: [after]
    }*/
)

async function next( endcursor,startcursor ) {
  let response = await useAsyncData(
      'maindata',
      () => $fetch(config.public.wordpressUrl, {
        method: 'post',
        body: {
          query: get_query(endcursor,startcursor)
        },
        transform(data) {
          return maindata.data;
        }
      })/*, {
        watch: [after]
      }*/
  );
}
</script>
<template>
  <!-- Posts Section -->
  <section class="w-full md:w-2/3 flex flex-col items-center px-3">
    <template v-for="post in maindata.data.posts.nodes">
      <ContentsPostsLoop :post="post"></ContentsPostsLoop>
    </template>
    <!-- Pagination -->
    <div class="flex items-center py-8">
      <NuxtLink v-if="maindata.data.posts.pageInfo.hasPreviousPage"
                @click="next(null,maindata.data.posts.pageInfo.startCursor)"
                to="javascript:" class="h-10 w-10 font-semibold text-gray-800 hover:text-gray-900 text-sm flex items-center justify-center ml-3">Previous <i class="fas fa-arrow-left ml-2"></i></NuxtLink>
      <NuxtLink v-if="maindata.data.posts.pageInfo.hasNextPage"
                @click="next(maindata.data.posts.pageInfo.endCursor,null)"
                to="javascript:" class="h-10 w-10 font-semibold text-gray-800 hover:text-gray-900 text-sm flex items-center justify-center ml-3">Next <i class="fas fa-arrow-right ml-2"></i></NuxtLink>
    </div>
  </section>
  <Sidebar></Sidebar>
</template>
