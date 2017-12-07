<template v-if="!logged">
  <div class="Grid Grid--alignCenter">
        <div class="Grid-cell u-md-size6of12">
          <div class="Login">
            <div class="LoginForm">
              <div>
                <form class="Form" @submit.prevent="onSubmit">
                  <fieldset>
                    <div class="Form-group">
                      <label for="username" class="Form-label">{{userLabels.name}}</label>
                      <input
                        type="username"
                        name="username"
                        id="username"
                        class="Form-field"
                        autoComplete="on"
                        v-model="userInfo.name"
                      />
                    </div>
                    <div class="Form-group">
                      <label for="password" class="Form-label">{{userLabels.password}}</label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        class="Form-field"
                        autoComplete="off"
                        v-model="userInfo.password"
                      />
                    </div>
                    <button type="submit" name="button" class="Button Button--primary Button--medium Button--block">{{userLabels.getIn}}</button>
                  </fieldset>
                </form>
                <p class="u-center u-divider-top"><router-link class="Button Button--link" to="/users/sign_up">{{userLabels.noAccount}}</router-link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
  import { postLogin } from '../../utils/api/index';
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
          getIn: 'Entrar en tu cuenta',
          noAccount: '¿Todavía no tienes cuenta? ¡Regístrate!'
        },
        userInfo:{
          name: '',
          password: ''
        }
      }
    },
    methods: {
      async onSubmit (){
        const formData = {
          username: this.userInfo.name,
          password: this.userInfo.password,
        }

        const {data, err} = await postLogin(formData.username, formData.password);
        
        if (err) {
          return this.$emit('loginError', err)
        }

        const { token } = data;

        const { userDetail } = data;

        localStorage.setItem('token', token);

        this.$bus.anyToken(token, userDetail); // Share in the event Bus

        if(userDetail){
          this.$router.push('movies');
        }
        
      }
    }
    
  }
</script>

<style>

  @import "../../assets/css/do-css-framework.css";

</style>