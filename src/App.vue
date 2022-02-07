<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from "vue";
import useThree from "./three.hook";
export default defineComponent({
  setup() {
    const wrapRef = ref<HTMLElement>();
    const x = ref(0);
    const y = ref(0);
    const z = ref(0);

    const rotationX = ref(0);
    const rotationY = ref(0);
    const rotationZ = ref(0);

    const scaleX = ref(1);
    const scaleY = ref(1);
    const scaleZ = ref(1);

    onMounted(() => {
      useThree(
        wrapRef as Ref<HTMLElement>,
        [x, y, z],
        [scaleX, scaleY, scaleZ],
        [rotationX,rotationY,rotationZ]
      );
    });
    return {
      wrapRef,
      x,
      y,
      z,
      scaleX,
      scaleY,
      scaleZ,
      rotationX,
      rotationY,
      rotationZ,
    };
  },
});
</script>

<template>
  <div ref="wrapRef"></div>

  <div class="pos-a bg-white w-512" style="top: 0; left: 0">
    <p>
      distance
      <input v-model="x" type="range" />
      <input v-model="y" type="range" />
      <input v-model="z" type="range" />
    </p>

    <p>
      rotation
      <input v-model="rotationX" type="range" />
      <input v-model="rotationY" type="range" />
      <input v-model="rotationZ" type="range" />
    </p>

    <p>
      scale
      <input
        v-model="scaleX"
        type="range"
        name="sx"
        min="0"
        max="2"
        step="0.1"
      />
      <input
        v-model="scaleY"
        type="range"
        name="sy"
        min="0"
        max="2"
        step="0.1"
      />
      <input
        v-model="scaleZ"
        type="range"
        name="sz"
        min="0"
        max="2"
        step="0.1"
      />
    </p>
  </div>
</template>

<style>
* {
  padding: 0;
  margin: 0;
}
</style>
