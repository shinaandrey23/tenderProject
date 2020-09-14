<template>
  <div>
    <b-button variant="success" size="sm" @click="buyHive">Buy hive</b-button>
    <table>
      <tr>
        <th>Hive id</th>
        <th>Available tenders</th>
        <th>Function</th>
      </tr>
      <hiveItem
          v-for="hive of hiveList"
          v-bind:hive="hive"
          v-bind:tendersList="tendersList"
      />
    </table>
  </div>
</template>

<script>
import hiveItem from "./hiveItem";
import axios from "axios";
import {bus} from "../main";

export default {
  name: "hiveList",
  props: ['hiveList'],
  components: {hiveItem},
  data: function ()
  {
    return {
      tendersList: []
    }
  },
  mounted() {
    const that = this
    this.availableTenders()
    bus.$on('acceptTender', data => {
      that.availableTenders()
    })
    bus.$on('cancelTender', data => {
      that.availableTenders()
    })
  },
  methods: {
    buyHive() {
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
          method: 'post',
          url: 'http://localhost:1337/hives/',
          data: {
            beekeeper: response.data,
          },
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token')
          }
        }).then(response => {
          bus.$emit('buyHive')
          console.log('Hive bought')
        })
      })
    },
    availableTenders() {
      const that = this
      axios({
        method: 'get',
        url: 'http://localhost:1337/availableTenders/',
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token')
        }
      }).then(response => {
        // console.log(response.data)
        that.tendersList = response.data
      })
    }
  }
}
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 760px;
  margin-top: 10px;
}

th {
  text-align: center;
  border: 2px solid #000;
}
</style>