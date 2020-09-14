<template>

<td>{{ tender.id }}</td>
</template>

<script>
export default {
name: "tenderItem",
  props: {
    tender: Object,
    required: true
  }
}
</script>

<style scoped>

</style>