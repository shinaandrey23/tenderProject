<template>
<tr>
  <td>{{ field.id }}</td>
  <td>
    <b-button variant="success" size="sm" v-if="tenderCreate===false" @click="createTender">Create tender</b-button>
    <b-button variant="danger" size="sm" v-else @click="deleteTender">Delete tender</b-button>
  </td>
  <td v-if="tenderCreate===false">no created tender</td>
  <td v-else>{{ hiveId }}</td>
  <td>
    <b-button size="sm" variant="warning" @click="sellField">Sell Field</b-button>
  </td>
</tr>
</template>

<script>
import axios from "axios";
import { bus } from '../main.js'

export default {
  name: "fieldItem",
  tenderId: null,
  props: {
    field: Object,
    required: true
  },
  data: function() {
    return {
      tenderCreate: false,
      hiveId: 'no hive'
    }
  },
  mounted() {
    this.checkTender()
    this.checkHiveId()
  },
  methods: {
    createTender() {
      const that = this
      axios({
        method: 'get',
        url: 'http://localhost:1337/fields/'+ that.field.id,
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token')
        }
      }).then(response => {
        // console.log(response.data)
        axios({
          method: 'post',
          url: 'http://localhost:1337/tenders',
          data: {
            field: response.data.id,
            hive: {}
          },
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token')
          }
        }).then(response => {
          console.log('Tender created')
          that.tenderId = response.data.id
          that.tenderCreate = true
        })
      })
    },
    checkTender() {
      const that = this
      axios({
        method: 'get',
        url: 'http://localhost:1337/tender/field'+ that.field.id,
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token')
        }
      }).then(response => {
        // console.log(response.data)
        that.tenderId = response.data.id
        if(response.data === null) {
          that.tenderCreate = false
        } else {
          that.tenderCreate = true
        }
      }).catch(err => {
        that.tenderCreate = false
      })
    },
    deleteTender() {
      const that = this
      axios({
        method: 'delete',
        url: 'http://localhost:1337/tenders/'+ that.tenderId,
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token')
        }
      }).then(response => {
        that.tenderCreate = false
        that.tenderId = null
        that.hiveId = 'no hive'
        console.log('Tender delete')
      })

    },
    sellField() {
      this.deleteTender()
      const that = this
      axios({
        method: 'delete',
        url: 'http://localhost:1337/fields/'+ that.field.id,
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token')
        }
      }).then(response => {
        bus.$emit('sellField')
        console.log('Field sold')
      })
    },
    checkHiveId() {
      const that = this
      axios({
        method: 'get',
        url: 'http://localhost:1337/tender/field'+ that.field.id,
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token')
        }
      }).then(response => {
        if(response.data.hive === null || !response.data.hive) {
          that.hiveId = 'no hive'
        } else {
          that.hiveId = response.data.hive.id
        }
      }).catch(err => {
        that.hiveId = 'no hive'
      })
    }
  }
}

</script>

<style scoped>
  td {
    text-align: center;
    border: 2px solid #000;
  }
</style>