<template>
<div>
  <table>
    <tr>
      <th>Filed number</th>
      <th>Tender</th>
    </tr>
    <tr>
      <tenderItem
          v-for="tender of tenderList"
          v-bind:tender="tender"
      />
    </tr>
  </table>
</div>
</template>

<script>
import tenderItem from "./tenderItem";

export default {
name: "tenderList",
  props: ['tenderList'],
  components: {tenderItem}
}
</script>

<style scoped>
 table {
   border: 2px;
   width: 760px;
 }
</style>