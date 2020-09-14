<template>
  <div>
    <table>
      <tr>
        <th>Hive number</th>
        <th>Tender</th>
        <th>Function</th>
      </tr>
      <tenderItem
          v-for="tender of tenderList"
          v-bind:tender="tender"
      />
    </table>
  </div>
</template>

<script>
import tenderItem from "./hiveItem";
import axios from "axios";
import {bus} from "../main";

export default {
  name: "tenderList",
  props: ['tenderList'],
  components: {tenderItem},
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
          bus.$emit('hiveField')
          console.log('Hive bought')
        })
      })
    }
  }
}
</script>

<style scoped>
table {
  border: 2px;
  width: 760px;
}
</style>