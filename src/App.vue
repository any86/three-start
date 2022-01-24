<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from "vue";
import useThree from "./three.hook";
export default defineComponent({
  setup() {
    const wrapRef = ref<HTMLElement>();

    onMounted(() => {
      useThree(wrapRef as Ref<HTMLElement>);
    });
    return { wrapRef };
  },
});
</script>

<template>
  <div ref="wrapRef"></div>
</template>

<style>
* {
  padding: 0;
  margin: 0;
}
</style>
