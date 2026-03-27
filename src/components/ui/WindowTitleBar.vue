<script setup lang="ts">
defineProps<{
  title: string
  isMaximized?: boolean
}>()

defineEmits<{
  minimize: []
  maximize: []
  close: []
  dragstart: [e: MouseEvent]
  touchdragstart: [e: TouchEvent]
}>()
</script>

<template>
  <div
    class="title-bar"
    @mousedown="$emit('dragstart', $event)"
    @touchstart.passive="$emit('touchdragstart', $event)"
  >
    <div class="title-bar-text">{{ title }}</div>
    <div class="title-bar-controls">
      <button aria-label="Minimize" @click.stop="$emit('minimize')" @touchend.stop.prevent="$emit('minimize')" />
      <button
        :aria-label="isMaximized ? 'Restore' : 'Maximize'"
        @click.stop="$emit('maximize')"
        @touchend.stop.prevent="$emit('maximize')"
      />
      <button aria-label="Close" @click.stop="$emit('close')" @touchend.stop.prevent="$emit('close')" />
    </div>
  </div>
</template>

<style scoped>
/* Larger tap targets on touch devices */
@media (pointer: coarse) {
  .title-bar {
    height: 36px !important;
    min-height: 36px !important;
    display: flex !important;
    align-items: center !important;
  }

  .title-bar-controls {
    display: flex !important;
    align-items: center !important;
    gap: 4px !important;
  }

  .title-bar-controls button {
    width: 28px !important;
    height: 28px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }
}
</style>
