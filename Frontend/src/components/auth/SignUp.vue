<template v-if="!logged">
  <div class="Panel">
    <div class="Grid Grid--alignCenter">
      <div class="Grid-cell u-md-size6of12">
        <div class="Login">
          <div class="LoginForm">
            <div>
              <form class="Form" @submit.prevent="onSubmit">
                <fieldset>
                  <div class="Form-group">
                    <label for="username" class="Form-label">{{ userLabels.name }}</label>
                    <input 
                          type="username" 
                          name="username" 
                          id="username" 
                          class="Form-field" 
                          autoComplete="on" 
                          v-model="userInfo.name"/>
                  </div>
                  <div class="Form-group">
                    <label for="password" class="Form-label">{{ userLabels.password }}</label>
                    <input 
                          type="password" 
                          name="password" 
                          id="password" 
                          class="Form-field" 
                          autoComplete="off" 
                          v-model="userInfo.password"/>
                  </div>
                  <div class="Form-group">
                    <label for="password" class="Form-label">{{ userLabels.passwordConfirm }}</label>
                    <input 
                          type="password" 
                          name="password" 
                          id="password" 
                          class="Form-field" 
                          autoComplete="off" 
                          v-model="userInfo.passwordConfirm"
                          />
                  </div>
                  <button type="submit" name="button" class="Button Button--primary Button--medium Button--block">{{ userLabels.send }}</button>
                </fieldset>
              </form>
              <p class="u-center u-divider-top" ><router-link class="Button Button--link" to="/login">{{userLabels.withAccount}}</router-link></p> 
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { signUp } from '../../utils/api/index'; 
  export default {
    props: {
      logged: {
        type: Boolean,
        required: false
      }
    },
    data(){
      return {
        userLabels: {
          name: 'Nombre de usuario',
          password: 'Contraseña',
          passwordConfirm: 'Repetir Contraseña',
          send: 'Enviar',
          withAccount: '¿Ya tienes cuenta? Entra'
        },
        userInfo:{
          username: '',
          password: '',
          passwordConfirm: ''
        },
        userErrors: {
          notMatch: 'Las constraseñas no coinciden'
        }
      }
    },
    methods: {
      async onSubmit (){
        const formData = {
          username: this.userInfo.username,
          password: this.userInfo.password,
        }

        const {data, err} = await signUp(formData.username, formData.password);
        
        if (err) {
          return this.$emit('loginError', err)
        }

      }
    }
  }

</script>


<style>
  @import "../../assets/css/do-css-framework.css";
</style>