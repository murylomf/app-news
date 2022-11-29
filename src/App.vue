<script setup>
import { onMounted, ref } from "@vue/runtime-core";
import { getEverything, getTopHeadlines } from "./services/news.js";

let news = ref([]);
let headlines = ref([]);
let search = ref([]);
onMounted(async () => {
  const topHeadlines = await getTopHeadlines();
  headlines.value = topHeadlines.articles;
  news.value = topHeadlines.articles.filter(
    (item) => item.source.id != "globo"
  );
});

async function defineHeadlines() {
  news.value = headlines.value.filter((item) => item.source.id != "globo");
}

async function searchNews() {
  const value = search.value;

  if (!search.value || search.value == "") {
    defineHeadlines();
    return;
  }
  const everything = await getEverything(search.value);
  news.value = everything.articles;
}
</script>

<template>
  <div>
    <header>
      <input
        type="search"
        class="input--search"
        v-model="search"
        placeholder="Buscar noticia"
      />
      <input type="button" value="Buscar" @click="searchNews" />
    </header>
    <div class="band">
      <div v-for="item in news" :key="item.id">
        <div v-if="item.urlToImage">
          <a :href="item.url" class="card">
            <div
              class="thumb"
              :style="{
                'background-image': item.urlToImage
                  ? `url(${item.urlToImage})`
                  : 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/users-2.png)',
              }"
            ></div>
            <article>
              <h1>{{ item.title }}</h1>
              <span>{{ item.author }}</span>
            </article>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
