<template>
  <div v-if="currentMovie" class="edit-form">
    <h4>Movie</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="currentMovie.title"
        />
      </div>

      <div class="form-group">
        <label for="Genre">Genre</label>
        <input
          type="text"
          class="form-control"
          id="Genre"
          v-model="currentMovie.Genre"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentMovie.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button
      class="badge badge-primary mr-2"
      v-if="currentMovie.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button
      v-else
      class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2" @click="deleteMovie">Delete</button>

    <button type="submit" class="badge badge-success" @click="updateMovie">
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Movie...</p>
  </div>
</template>

<script>
import MovieDataService from "../services/MovieDataService";

export default {
  name: "movie",
  props: ["movie"],
  data() {
    return {
      currentMovie: null,
      message: "",
    };
  },
  watch: {
    movie: function (movie) {
      this.currentMovie = { ...movie };
      this.message = "";
    },
  },
  methods: {
    updatePublished(status) {
      MovieDataService.update(this.currentMovie.key, {
        published: status,
      })
        .then(() => {
          this.currentMovie.published = status;
          this.message = "The status was updated successfully!";
        })
        .catch((error) => {
          console.log(error);
        });
    },

    updateMovie() {
      const data = {
        title: this.currentMovie.title,
        Genre: this.currentMovie.Genre,
      };

      MovieDataService.update(this.currentMovie.key, data)
        .then(() => {
          this.message = "The movie was updated successfully!";
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deleteMovie() {
      MovieDataService.delete(this.currentMovie.key)
        .then(() => {
          this.$emit("refreshList");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.message = "";
    this.currentMovie = { ...this.movie };
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
