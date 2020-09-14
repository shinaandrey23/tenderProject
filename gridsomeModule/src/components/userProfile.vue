<template>
  <div>
    <p>User: {{ username }}</p>
    <p>Role: {{ role }}</p>
    <b-button variant="outline-danger" size="sm" @click="logout">Logout</b-button>
<!--    <button type="button" @click="logout" class="logout">Logout</button>-->
    <fieldList
        v-if="role==='Farmer'"
        v-bind:fieldList="fieldList"
    />
    <hiveList
        v-if="role==='Beekeeper'"
        v-bind:hiveList="hiveList"
    />
  </div>
</template>

<script>
import { bus } from '../main.js'
import axios from "axios";
import fieldList from "./fieldList";
import hiveList from "./hiveList";

export default {
  name: "profile",
  components: {fieldList, hiveList},
  data: function () {
    return {
      username: sessionStorage.getItem('username'),
      role: sessionStorage.getItem('role'),
      hiveList: [],
      fieldList: []
    }
  },
  mounted() {
    this.getHives()
    this.getTenders()
    this.getFields()
    const that = this
    bus.$on('sellField', data =>{
      that.getFields()
    })
    bus.$on('sellHive', data => {
      that.getHives()
    })
    bus.$on('buyField', data => {
      that.getFields()
    })
    bus.$on('buyHive', data => {
      that.getHives()
    })
  },
  methods: {
    logout() {
      bus.$emit('logout')
    },
    getTenders(){
      const that = this;
      axios({
        method: 'get',
        url: 'http://localhost:1337/tenders',
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token')
        }
      }).then(response => {
        // console.log(response.data)
        that.tenderList = response.data
      })
    },
    getFields() {
      if(this.role==='Farmer') {
        const that = this
        axios({
          method: 'post',
          url: 'http://localhost:1337/farmer/',
          data: {
            email: sessionStorage.getItem('email')
          },
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token')
          }
        }).then(response => {
          axios({
            method: 'get',
            url: 'http://localhost:1337/userFields/' + response.data.id,
            headers: {
              Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
          }).then(response => {
            // console.log(response.data)
            that.fieldList = response.data
          })
        })

      }
    },
    getHives() {
      if(this.role==='Beekeeper') {
        const that = this
        axios({
          method: 'post',
          url: 'http://localhost:1337/beekeeper/',
          data: {
            email: sessionStorage.getItem('email')
          },
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token')
          }
        }).then(response => {
          axios({
            method: 'get',
            url: 'http://localhost:1337/userHives/' + response.data.id,
            headers: {
              Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
          }).then(response => {
            // console.log(response.data)
            that.hiveList = response.data
          })
        })
      }
    }
}
}
</script>

<style scoped>
  p {
    display: inline-block;
    margin-right: 10px;
    padding: 0px;
  }




</style>