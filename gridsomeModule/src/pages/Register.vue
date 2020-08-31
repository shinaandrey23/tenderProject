<template>
  <Layout>
    <form @submit.prevent="reg">
      <label for="login">Login:</label><br>
      <input type="text" id="login" v-model="username"><br>
      <label for="email">Email:</label><br>
      <input type="email" id="email" v-model="email"><br>
      <label for="password">Password:</label><br>
      <input type="password" id="password" v-model="password"><br>
      <label>Role:</label>
      <input type="radio" id="Farmer" name="role" value="farmer" v-model="role" checked>
      <label for="Farmer">Farmer</label>
      <input type="radio" id="Beekeeper" name="role" value="beekeeper" v-model="role">
      <label for="Beekeeper">Beekeeper</label><br><hr>
      <button type="submit">Register</button>
    </form>
  </Layout>

</template>

<script>
import axios from "axios";

export default {
  name: "Register.vue",
  data() {
    return {
      username: '',
      email: '',
      password: '',
      role: ''
    }
  },
  plugins: [
    {
      use: '@gridsome/source-strapi',
      options: {
        apiURL: `http://localhost:1337`,
        queryLimit: 1000, // Defaults to 100
        contentTypes: [`user`, `farmer`, `beekeeper`, `hive`, `field`, `tender`],
        plural: true, // pluralizes names of Content Types in API
        // Possibility to login with a Strapi user, when content types are not publicly available (optional).
        loginData: {
          identifier: 'shinaandrey23@gmail.com',
          password: 'ShinShila23',
        },
      }
    }
  ],
  methods: {
  reg(key, value) {
    axios.post('http://localhost:1337/auth/local/register', {
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role,
    }).then(response => {
      // Handle success.
      console.log('Well done!')
      console.log('User profile', response.data.user)
      console.log('User token', response.data.jwt)
      sessionStorage.setItem('email', response.data.user.email)
    }).catch(error => {
      // Handle error.
      console.log('An error occurred:', error.response)
    })

    // sessionStorage.clear()
    // location.href = '/'
  }
}
}
</script>

<style scoped>

</style>