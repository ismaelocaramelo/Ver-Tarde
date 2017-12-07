<template>
  <div>
    <div class="Panel">
      <div class="Grid Grid--alignCenter">
        <div class="Grid-cell u-md-size6of12">
          {{dashboard}}
          <appUserFav></appUserFav> 
          <movieSearch></movieSearch>
          <div v-if="message"class="Notification--success Notification-text">
            <strong>Success!</strong> {{message}}
          </div>  
          <appmovies :movieSearched="movieSearched"></appmovies>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Movies from '../movies/movies';
  import movieSearch from '../movies/movieSearch.vue';
  import userFavMovies from '../user/userFavMovies';

  import { searchMovie } from '../../utils/api/index';

  export default {
    props: {
      dashboard: {
        type: String,
        required: false
      },
      user: {
        type: Object,
      }
    },
    data(){
      return {
        movieSearched: [],
      }
    },
    created(){
      this.$bus.$on('movieToSearch', (payload)=>{
        this.getMovie(payload);
      });
      // console.log(this.$router)
      console.log(this.user)
    },
    methods: {
      async getMovie (title){

        const {data, err} = await searchMovie(title);
        
        if (err) {
          console.log(err);
        }

        if(data.movies.length){
          this.movieSearched = data.movies;
        }
      }
    },
    components: {
      appmovies: Movies,
      movieSearch,
      appUserFav: userFavMovies
    },
  }
</script>

<style>
  @import "../../assets/css/do-css-framework.css";
</style>