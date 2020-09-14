<template>
<div>
  <b-button variant="success" size="sm" @click="buyField">Buy field</b-button>
  <table>
    <tr>
      <th>Filed id</th>
      <th>Tender</th>
      <th>Hive</th>
      <th>Function</th>
    </tr>
    <fieldItem
        v-for="field of fieldList"
        v-bind:field="field"
    />

  </table>
</div>
</template>

<script>
import fieldItem from "./fieldItem";
import axios from "axios";
import { bus } from '../main.js'

export default {
  name: "fieldList",
  props: ['fieldList'],
  components: {fieldItem},
  methods: {
    buyField() {
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
          method: 'post',
          url: 'http://localhost:1337/fields/',
          data: {
            farmer: response.data,
          },
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token')
          }
        }).then(response => {
          bus.$emit('buyField')
          console.log('Field bought')
        })
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