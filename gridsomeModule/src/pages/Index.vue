<template>
  <Layout>
    <loginForm
        v-if="username === null"
    />
    <userProfile
        v-else
    />
  </Layout>
</template>

<script>
import axios from 'axios'
import loginForm from "../components/loginForm"
import { bus } from '../main.js'
import userProfile from "../components/userProfile";

export default {
  components: {loginForm, userProfile},
  data: function () {
    return {
      username: null,
      role: null
    }
  },
  metaInfo: {
    title: 'Login'
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
  mounted() {
    this.username = sessionStorage.getItem('username')
    this.role = sessionStorage.getItem('role')
  }
  ,
  created() {
    bus.$on('login', data => {
      sessionStorage.setItem('token', data[1])
      sessionStorage.setItem('username', data[0].username)
      this.username = data[0].username
      sessionStorage.setItem('email', data[0].email)
      sessionStorage.setItem('role', data[0].role.name)
      this.role = data[0].role.name
      sessionStorage.setItem('id', data[0].id)
    })
    bus.$on('logout', () => {
      sessionStorage.clear()
      this.username = null
      this.role = null
    })
  }
}
</script>

<style scoped>

</style>

