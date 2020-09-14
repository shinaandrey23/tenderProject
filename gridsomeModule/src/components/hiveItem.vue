<template>
<tr>
  <td>{{ tender.id }}</td>

</tr>
</template>

<script>
export default {
  name: "tenderItem",
  props: {
    tender: Object,
    required: true
  },
  data: function() {
    return {

    }
  }
}
</script>

<style scoped>

</style>