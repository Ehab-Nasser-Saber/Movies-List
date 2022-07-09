<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="movie.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="Genre">Genre</label>
        <input
          class="form-control"
          id="Genre"
          required
          v-model="movie.Genre"
          name="Genre"
        />
      </div>

      <button @click="saveMovie" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newMovie">Add</button>
    </div>
  </div>
</template>

<script>
import MovieDataService from "../services/MovieDataService";

export default {
  name: "add-movie",
  data() {
    return {
      movie: {
        title: "",
        Genre: "",
        published: false,
      },
      submitted: false,
    };
  },
  methods: {
    saveMovie() {
      const data = {
        title: this.movie.title,
        Genre: this.movie.Genre,
        published: false,
      };

      MovieDataService.create(data)
        .then(() => {
          console.log("Created new item successfully!");
          this.submitted = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    newMovie() {
      this.submitted = false;
      this.movie = {
        title: "",
        Genre: "",
        published: false,
      };
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
