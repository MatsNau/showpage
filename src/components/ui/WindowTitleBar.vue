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
}>()
</script>

<template>
  <div class="title-bar" @mousedown="$emit('dragstart', $event)">
    <div class="title-bar-text">{{ title }}</div>
    <div class="title-bar-controls">
      <button aria-label="Minimize" @click.stop="$emit('minimize')" />
      <button
        :aria-label="isMaximized ? 'Restore' : 'Maximize'"
        @click.stop="$emit('maximize')"
      />
      <button aria-label="Close" @click.stop="$emit('close')" />
    </div>
  </div>
</template>
