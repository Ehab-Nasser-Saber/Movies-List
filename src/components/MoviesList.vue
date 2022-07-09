<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Movies List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(movie, index) in movies"
          :key="index"
          @click="setActiveMovie(movie, index)"
        >
          {{ movie.title }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllMovies">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentMovie">
        <movie-details :movie="currentMovie" @refreshList="refreshList" />
      </div>
      <div v-else>
        <br />
        <p>Please click on a Movie...</p>
      </div>
    </div>
  </div>
</template>

<script>
import MovieDataService from "../services/MovieDataService";
import MovieDetails from "./Movie";

export default {
  name: "movies-list",
  components: { MovieDetails },
  data() {
    return {
      movies: [],
      currentMovie: null,
      currentIndex: -1,
    };
  },
  methods: {
    onDataChange(items) {
      let _movies = [];

      items.forEach((item) => {
        let key = item.key;
        let data = item.val();
        _movies.push({
          key: key,
          title: data.title,
          Genre: data.Genre,
          published: data.published,
        });
      });

      this.movies = _movies;
    },

    refreshList() {
      this.currentMovie = null;
      this.currentIndex = -1;
    },

    setActiveMovie(movie, index) {
      this.currentMovie = movie;
      this.currentIndex = index;
    },

    removeAllMovies() {
      MovieDataService.deleteAll()
        .then(() => {
          this.refreshList();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    MovieDataService.getAll().on("value", this.onDataChange);
  },
  beforeUnmount() {
    MovieDataService.getAll().off("value", this.onDataChange);
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
