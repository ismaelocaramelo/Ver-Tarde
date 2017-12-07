// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

const EventBus = new Vue({
  data: {
    data: 'jolines',
  },
  methods: {
    testBus() {
      return this.$emit('testbus', this.data);
    },
    anyToken(token, user) {
      return !token ? this.$emit('tokenOut') : this.$emit('tokenIn', token, user);
    },
    movieToSearch(title) {
      return this.$emit('movieToSearch', title);
    },
    userMovies(movies) {
      return (movies) ? this.$emit('favMovies', movies) : this.$emit('noFavMovies');
    },
  },
});
// Add to Vue properties by exposing a getter for $bus
Object.defineProperties(Vue.prototype, {
  $bus: {
    get() {
      return EventBus;
    },
  },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
