import { createWebHistory, createRouter } from "vue-router";

import MoviesList from './components/MoviesList.vue'
import AddMovie from './components/AddMovie.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [

  {
    path: "/",
    alias: "/movies",
    name: "movies",
    component:MoviesList
  },
  {
    path: "/add",
    name: "add",
    component:AddMovie
  }
]

});

export default router;