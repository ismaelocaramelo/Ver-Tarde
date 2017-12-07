<template>
  <div id="app">
    <appheader></appheader>
    <router-view/>
  </div>
</template>

<script>
import Header from './components/header/Header';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';


export default {
  name: 'app',
  data(){
    return {
      dashboard: 'Dashboard',
      logged: false,
      user: {},
    }
  },
  components: {
    appheader: Header,
  },
  created(){
    this.$bus.$on('tokenIn', (token,user) =>{
      console.log('LOGGEDIN')
      localStorage.setItem('user', JSON.stringify(user));
      this.user = user;
      this.logged = true;
    });
    this.$bus.$on('tokenOut', () =>{
      console.log('LOGGEOUT');
      this.logged = false
    });

    this.$bus.testBus();
  }
};
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .Panel--centered {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

</style>
