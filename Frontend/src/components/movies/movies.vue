<template>
  <div>
    <div v-if="loading">
      Loading...
    </div>
    <div v-if="error">
      <p class=".Notification--error.Notification--icon">{{ error }}</p>
    </div>
    <ul class="list" v-if="!error && !loading">
      <li class="list-item" v-for="movie in movies">
        <div class="list-content">
          <h1>{{movie.original_title}}</h1>
          <figure><img :src="`${baseUrlWithSize}${movie.poster_path}`"/></figure>
          <details><p>{{movie.overview}}</p></details>
          <button
              v-if="!isAlreadySave(movie.id)"
              class="Button Button--primary Button--medium Button--block"
              @click.prevent="addToFavourites(movie.id)">Save it!</button>
        </div>
      </li>  
    </ul>
  </div>
</template>

<script>
  import { topMovies } from '../../utils/api';
  import { movieConfig } from '../../utils/api';
  import { addFavourites } from '../../utils/api';
  export default {
    props: {
      movieSearched: {
        type: Array,
        require: false,
      }
    },
    data(){
      return {
        movies: [],
        loading: false,
        error: null,
        imageConfig: {},
        defaultSize: '',
        baseUrlWithSize: '',
        noFavMovies: false,
        movies: [],
        userFavoriteMovies: [],
        user: '',
      }
    },
    created(){
      this.fetchTopMovies();
      this.getMovieConfig();
      this.$bus.$on('favMovies',  (payload)=>{
        this.userFavoriteMovies = payload.movies;
        console.log(payload.movies);
        this.movies = payload.movies;
      });
      this.user = JSON.parse(localStorage.getItem('user'));
    },
    watch: {
      // call again the method if the route changes
      '$route': 'fetchTopMovies',
      'movies': function(newValue){ 
          this.movies = newValue;
        },
      'movieSearched': function(newValue){
          this.movies = newValue;
      }
    },
    methods: {
      async fetchTopMovies(){
        this.loading = true

        const {data, err} = await topMovies();
        
        if (err) {
          this.error = err;
        }

        this.movies = data.movies;
      },

      async getMovieConfig(){
        
       const {data, err} = await movieConfig();

        if (err) {
          console.log(err);
        }

        Object.assign(this.imageConfig, data.images)

        this.defaultSize = this.imageConfig.poster_sizes[1]; // Default size to w154
        this.baseUrlWithSize = `${this.imageConfig.base_url}${this.defaultSize}/`;
        this.loading = false;
      },
      async addToFavourites(movieId){
        const user = this.user;
        const {message, err} = await addFavourites(user, movieId);
        
        if (err) {
          console.log(err);
        }

        
      },
      isAlreadySave(movieId){
        return this.userFavoriteMovies.some(movie => { return movie.id === movieId});
      }
    },
  }
</script>

<style>
  .list {
    display: flex;
    flex-wrap: wrap;
  }
  .list-item {
    display: flex; 
    padding: 0.5em;
    width: 100%;
  }
  @media all and (min-width: 40em) {
    .list-item {
      width: 50%;
    }
  }
  @media all and (min-width: 60em) {
    .list-item {
      width: 33.33%;
    }
  }
  .list-content {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    padding: 1em;
    width: 100%;
  }
  .list-content p {
    flex: 1 0 auto;
    margin-top: 16px;
    margin-bottom: 16px;
  }

  ul, li {
    margin: 0;
    padding: 0;
    list-style: none;
  } 
  img {
    width: 100%;
  }
  h1 {
    margin-top: 0;
    margin-bottom: 9.6px !important;
  }
  details {
    margin-top: 16px !important;
    outline: none !important;
  }
</style>