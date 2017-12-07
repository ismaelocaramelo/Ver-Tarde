<template>
  <div class="HeaderLogin">
    <div class="HeaderLogin-content">
      <div class="HeaderLogin-logo">
        <figure><img class="Header-logoImage" :src="logoImage.urlLogo" :alt="logoImage.alt" /></figure>
      </div>
      <h1 class="HeaderLogin-title">{{ allUpperCase }}</h1>
    </div>
  </div>
</template>

<script>
import urlLogo from '../../assets/ver-mas-tarde.svg';

  export default {
    data() {
      return {
        title: 'Ver+Tarde',
        logoImage: {
          urlLogo,
          alt: 'Ver+Tarde'
        }
      };
    },
    computed: {
      allUpperCase() {
        return this.title.toUpperCase();
      },
    },
  }

</script>

<style scoped>
  .HeaderLogin {
    width: 100%;
    height: 90px;
    background-color: #e1eef0;
    margin-bottom: 40px;
  }

  @media (min-width: 768px) {
    .HeaderLogin {
      height: 120px
    }
  }

  .HeaderLogin-title {
    display: none
  }

  .HeaderLogin-content {
    margin: 0 auto;
    padding: 20px 10px;
    height: 100%
  }

  @media (min-width: 768px) {
    .HeaderLogin-content {
      display: -ms-flexbox;
      display: flex;
      -ms-flex-align: center;
      align-items: center;
      padding: 20px 40px;
      max-width: 1200px
    }
  }

  .HeaderLogin-logo {
    margin: 0 auto;
    text-align: center
  }

  .HeaderLogin-logo .Header-logoImage {
    height: 50px
  }

  @media (min-width: 768px) {
    .HeaderLogin-logo .Header-logoImage {
      width: 136px;
      height: 82px
    }
  }
</style>