<template>
  <div>
    <p>User: {{ username }}</p>
    <p>Role: {{ role }}</p>
    <button type="button" @click="logout" class="logout">Logout</button>
    <button type="button" @click="createFarmer">Create farmer</button>
    <button type="button" @click="createTender">Create tender</button>

  </div>
</template>

<script>
import { bus } from '../main.js'
import axios from "axios";
export default {
  name: "profile",
  data: function () {
    return {
      username: sessionStorage.getItem('username'),
      role: sessionStorage.getItem('role')
    }
  },
  methods: {
   logout() {
     bus.$emit('logout')
   },
   createTender() {
     axios.post('http://localhost:1337/tenders', {
       farmer: {
        email:'test@test.com'
       },
       headers: {
         'Authorization': 'Bearer ' + sessionStorage.getItem('token')
       }
     }).then(response => {
       console.log(response.data)
     })

   },
   createFarmer () {
     axios.post('http://localhost:1337/farmers', {
       email: sessionStorage.getItem('email'),
       headers: {
         'Authorization': 'Bearer ' + sessionStorage.getItem('token')
       }
     }).then(response => {
       console.log('Farmer create')
     }).catch(error => {
       console.log('An error occurred:', error.response)
     })
   }
  }
}
</script>

<style scoped>
  p {
    margin: 0px;
    padding: 0px;
  }
</style>