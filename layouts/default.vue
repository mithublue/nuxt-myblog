<template>
  <div class="bg-white font-family-karla" v-cloak>
<!--    <nav class="w-full py-4 bg-blue-800 shadow">
      <div class="w-full container mx-auto flex flex-wrap items-center justify-between">
        <nav>
          <ul class="flex items-center justify-between font-bold text-sm text-white uppercase no-underline">
            <li><a class="hover:text-gray-200 hover:underline px-4" href="#">Shop</a></li>
            <li><a class="hover:text-gray-200 hover:underline px-4" href="#">About</a></li>
          </ul>
        </nav>

        <div class="flex items-center text-lg no-underline text-white pr-6">
          <a class="" href="#">
            <i class="fab fa-facebook"></i>
          </a>
          <a class="pl-6" href="#">
            <i class="fab fa-instagram"></i>
          </a>
          <a class="pl-6" href="#">
            <i class="fab fa-twitter"></i>
          </a>
          <a class="pl-6" href="#">
            <i class="fab fa-linkedin"></i>
          </a>
        </div>
      </div>

    </nav>-->

    <!-- Text Header -->
    <header class="w-full container mx-auto">
      <div class="flex flex-col items-center py-12">
        <a class="font-bold text-gray-800 uppercase hover:text-gray-700 text-5xl" href="#">
          {{ global.allSettings.generalSettingsTitle }}
        </a>
        <p class="text-lg text-gray-600">
          {{ global.allSettings.generalSettingsDescription }}
        </p>
      </div>
    </header>

    <!-- Topic Nav -->
    <nav class="w-full py-4 border-t border-b bg-gray-100" x-data="{ open: false }">
      <div class="block sm:hidden">
        <a
            href="#"
            class="block md:hidden text-base font-bold uppercase text-center flex justify-center items-center"
            @click="open = !open"
        >
          Topics <i :class="open ? 'fa-chevron-down': 'fa-chevron-up'" class="fas ml-2"></i>
        </a>
      </div>
      <div :class="open ? 'block': 'hidden'" class="w-full flex-grow sm:flex sm:items-center sm:w-auto">
        <div class="w-full container mx-auto flex flex-col sm:flex-row items-center justify-center text-sm font-bold uppercase mt-0 px-6 py-2">
          <NuxtLink v-if="global.menuItems.edges !== 'undefined'" v-for="(menuitem,m) in global.menuItems.edges" :to="menuitem.node.uri" class="hover:bg-gray-400 rounded py-2 px-4 mx-2">
            {{ menuitem.node.label }}
          </NuxtLink>
        </div>
      </div>
    </nav>

    <div class="container mx-auto flex flex-wrap py-6">
      <NuxtLoadingIndicator color="#1D4ED8"/>
      <slot/>
    </div>
<!--    <footer class="w-full border-t bg-white pb-12">
      <div
          class="relative w-full flex items-center invisible md:visible md:pb-12"
          x-data="getCarouselData()"
      >
        <button
            class="absolute bg-blue-800 hover:bg-blue-700 text-white text-2xl font-bold hover:shadow rounded-full w-16 h-16 ml-12"
            x-on:click="decrement()">
          &#8592;
        </button>
        <template x-for="image in images.slice(currentIndex, currentIndex + 6)" :key="images.indexOf(image)">
          <img class="w-1/6 hover:opacity-75" :src="image">
        </template>
        <button
            class="absolute right-0 bg-blue-800 hover:bg-blue-700 text-white text-2xl font-bold hover:shadow rounded-full w-16 h-16 mr-12"
            x-on:click="increment()">
          &#8594;
        </button>
      </div>
      <div class="w-full container mx-auto flex flex-col items-center">
        <div class="flex flex-col md:flex-row text-center md:text-left md:justify-between py-6">
          <a href="#" class="uppercase px-3">About Us</a>
          <a href="#" class="uppercase px-3">Privacy Policy</a>
          <a href="#" class="uppercase px-3">Terms & Conditions</a>
          <a href="#" class="uppercase px-3">Contact Us</a>
        </div>
        <div class="uppercase pb-6">&copy; myblog.com</div>
      </div>
    </footer>-->
  </div>
</template>
<style>
@import url('https://fonts.googleapis.com/css?family=Karla:400,700&display=swap');

.font-family-karla {
  font-family: karla;
}
[v-cloak] {
  display: none;
}
</style>
<script>
function getCarouselData() {
  return {
    currentIndex: 0,
    images: [
      'https://source.unsplash.com/collection/1346951/800x800?sig=1',
      'https://source.unsplash.com/collection/1346951/800x800?sig=2',
      'https://source.unsplash.com/collection/1346951/800x800?sig=3',
      'https://source.unsplash.com/collection/1346951/800x800?sig=4',
      'https://source.unsplash.com/collection/1346951/800x800?sig=5',
      'https://source.unsplash.com/collection/1346951/800x800?sig=6',
      'https://source.unsplash.com/collection/1346951/800x800?sig=7',
      'https://source.unsplash.com/collection/1346951/800x800?sig=8',
      'https://source.unsplash.com/collection/1346951/800x800?sig=9',
    ],
    increment() {
      this.currentIndex = this.currentIndex === this.images.length - 6 ? 0 : this.currentIndex + 1;
    },
    decrement() {
      this.currentIndex = this.currentIndex === this.images.length - 6 ? 0 : this.currentIndex - 1;
    },
  }
}
</script>
<script setup>
const config = useRuntimeConfig();
const {data:global} = useFetch(config.public.wordpressUrl,{
  method: 'post',
  body: {
    query: `query NewQuery {
  menuItems(where: {location: PRIMARY}) {
    edges {
      node {
        id
        title
        uri
        label
      }
    }
  }
  allSettings {
    generalSettingsTitle
    generalSettingsDescription
  }
}`
  },
  transform(data) {
    return data.data;
  }
});
</script>
