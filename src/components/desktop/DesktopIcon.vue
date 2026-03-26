<script setup lang="ts">
import type { IconName } from '@/types'
import AppIcon from '@/components/ui/AppIcon.vue'

defineProps<{
  icon: IconName
  label: string
}>()

defineEmits<{
  open: []
}>()
</script>

<template>
  <div class="desktop-icon" @dblclick="$emit('open')">
    <AppIcon :name="icon" :size="40" class="desktop-icon__glyph" />
    <span class="desktop-icon__label">{{ label }}</span>
  </div>
</template>

<style scoped>
.desktop-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 72px;
  padding: 6px 4px;
  cursor: pointer;
  text-align: center;
  border: 2px dotted transparent;
}

.desktop-icon:hover,
.desktop-icon:focus-visible {
  background: rgba(0, 0, 128, 0.5);
  border-color: rgba(160, 160, 255, 0.7);
  outline: none;
}

.desktop-icon__glyph {
  pointer-events: none;
  /* Win95 icon selection: invert filter on hover via parent */
}

.desktop-icon:hover .desktop-icon__glyph {
  filter: brightness(1.3);
}

.desktop-icon__label {
  font-size: 0.68rem;
  color: #fff;
  text-shadow: 1px 1px 2px #000, -1px -1px 2px #000;
  pointer-events: none;
  word-break: break-word;
  line-height: 1.2;
}
</style>
