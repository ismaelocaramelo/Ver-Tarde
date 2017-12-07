<template>
  <div>
    <form class="Form" @submit.prevent>
      <fieldset>
        <div class="Form-group">
          <input 
            type="search" 
            placeholder="Enter your search movie ..." 
            name="search" 
            class="Form-field"
            autoComplete="off"
            @keyup.enter="onEnter" 
            v-model="searchTitle"
            required 
          />
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        searchTitle: ''
      }
    },
    methods: {
      onEnter() {
        if(this.searchTitle){
          this.$bus.movieToSearch(this.searchTitle);
        }
      }
    }

  }

</script>