<template>
  <form @submit.prevent="login">
    <label for="login">Login:</label><br>
    <input type="text" id="login" v-model="username"><br>
    <label for="password">Password:</label><br>
    <input type="password" id="password" v-model="password"><br><br>
    <button type="submit">Login</button>
    <g-link to="/register/" class="register">Register</g-link>
  </form>
</template>

<script>
import axios from "axios"
import { bus } from '../main.js'
export default {
  name: "loginForm",
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    login() {
      const that = this
      axios.post('http://localhost:1337/auth/local', {
        identifier: this.username,
        password: this.password,
      }).then(response => {
        // Handle success.
        console.log('Well done!')
        console.log('User profile', response.data.user)
        console.log('User token', response.data.jwt)
        const user = response.data.user
        const token = response.data.jwt
        bus.$emit('login', [user, token])
      }).catch(error => {
        // Handle error.
        console.log('An error occurred:', error.response)
      })

    }
  }
}
</script>

<style scoped>

</style>