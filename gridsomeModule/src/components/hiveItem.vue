<template>
<tr>
  <td>{{ hive.id }}</td>
  <td v-if="acceptTender===false">
    <b-form-select v-model="selectedTender" class="mb-3">
      <b-form-select-option disabled selected :value="null">Choose a free tender</b-form-select-option>
      <b-form-select-option v-for="tender of tendersList" v-bind:value="{ id: tender.id }">{{ tender.id }}</b-form-select-option>
    </b-form-select>
<!--    <select v-model="selectedTender">-->
<!--      <option disabled selected>Choose a free tender</option>-->
<!--      <option v-for="tender of tendersList" v-bind:value="{ id: tender.id }">{{ tender.id }}</option>-->
<!--    </select>-->
    <b-button variant="success" size="sm"  @click="getTenderIdFromTenderList">Accept</b-button>
  </td>
  <td v-else>
    Accepted tender: {{ selectedTender}}
    <b-button variant="danger" size="sm"  @click="cancelTender">Cancel tender</b-button>
<!--    <button type="button" @click="cancelTender">Cancel tender</button>-->
  </td>
  <td>
    <b-button variant="warning" size="sm"  @click="sellHive">Sell Hive</b-button>
<!--    <button type="button" @click="sellHive">Sell Hive</button>-->
  </td>
</tr>
</template>

<script>
import axios from "axios";
import {bus} from "../main";

export default {
  name: "hiveItem",
  props: {
    tendersList: Array,
    hive: Object,
    required: true
  },
  data: function() {
    return {
      selectedTender: null,
      acceptTender: false
    }
  },mounted() {
    this.checkHiveTender()
  },
  methods: {
    getTenderIdFromTenderList() {
      const that = this
      axios({
        method: 'put',
        url: 'http://localhost:1337/tenders/' + that.selectedTender.id,
        data: {
          hive: that.hive,
        },
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token')
        }
      }).then(response => {
        bus.$emit('acceptTender')
        that.acceptTender = true
        that.selectedTender = response.data.id
        console.log('Tender accepted')
      })
    },
    checkHiveTender() {
      const that = this
      axios({
        method: 'get',
        url: 'http://localhost:1337/tender/hive'+ that.hive.id,
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token')
        }
      }).then(response => {
        // console.log(response.data)
        if(response.data === null) {
          that.acceptTender = false
        } else {
          that.selectedTender = response.data.id
          that.acceptTender = true
        }
      }).catch(err => {
        that.acceptTender = false
      })
    },
    cancelTender() {
      const that = this
      axios({
        method: 'put',
        url: 'http://localhost:1337/tenders/'+ that.selectedTender,
        data:{
          hive: null
        },
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token')
        }
      }).then(response => {
        console.log('Tender cancel')
        that.selectedTender = null
        that.acceptTender = false
        bus.$emit('cancelTender')
      })
    },
    sellHive() {
      this.cancelTender()
      const that = this
      axios({
        method: 'delete',
        url: 'http://localhost:1337/hives/'+ that.hive.id,
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token')
        }
      }).then(response => {
        bus.$emit('sellHive')
        console.log('Hive sold')
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

  .mb-3 {
    margin-bottom: 0 !important;
    padding: 0;
  }

  button {
    margin-left: 5px;
  }

  .custom-select {
    width: 40%;
  }
</style>