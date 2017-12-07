<template>
  <div>
   <h2>{{user.username}}</h2>
    <button class="Button Button--primary Button--medium Button--block" 
      @click.prevent="showFavMovies">
      USER FAV</button>
  </div>
</template>

<script>
  import {getFavourites} from '../../utils/api/index';

  export default {
    data(){
      return {
        userFavMovies: '',
        user: {}
      }
    },
    created(){
      // TODO: Listen to tokenIn but somehow is not reachable yet
      this.user = JSON.parse(localStorage.getItem('user'));
    },
    methods: {
      async getUserFavMovies(user){
        
        const {data, err} = await getFavourites(user);
        
        if (err) {
          return err;
        }

        this.userFavMovies = data

        this.$bus.userMovies(this.userFavMovies);
      },
      showFavMovies(){
        return this.getUserFavMovies(this.user);
      }
    },
    beforeDestroy() {
      this.$bus.$off('favMovies');
    },
  }
</script>


<style scoped>
  h2 {
    height: 45px;
    font-size: 33px;
    margin-bottom: 20px !important;
  }
  button {
    float: right !important;
    margin-bottom: 20px;
  }
</style>