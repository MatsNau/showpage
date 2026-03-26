<script setup lang="ts">
import type { WindowInstance } from '@/types'
import { useWindowManager } from '@/composables/useWindowManager'
import { useDraggable } from '@/composables/useDraggable'
import WindowTitleBar from '@/components/ui/WindowTitleBar.vue'

const props = defineProps<{ window: WindowInstance }>()

const { closeWindow, focusWindow, toggleMinimize, toggleMaximize, updatePosition } =
  useWindowManager()

const { startDrag } = useDraggable((x, y) => {
  updatePosition(props.window.id, x, y)
})
</script>

<template>
  <div
    v-show="!window.isMinimized"
    class="app-window window"
    :class="{ 'app-window--maximized': window.isMaximized }"
    :style="
      window.isMaximized
        ? { zIndex: window.zIndex }
        : {
            left: `${window.x}px`,
            top: `${window.y}px`,
            width: `${window.width}px`,
            height: `${window.height}px`,
            zIndex: window.zIndex,
          }
    "
    @mousedown="focusWindow(window.id)"
  >
    <WindowTitleBar
      :title="window.title"
      :is-maximized="window.isMaximized"
      @dragstart="startDrag($event, window.x, window.y)"
      @minimize="toggleMinimize(window.id)"
      @maximize="toggleMaximize(window.id)"
      @close="closeWindow(window.id)"
    />

    <div class="window-body app-window__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.app-window {
  position: absolute;
  display: flex;
  flex-direction: column;
  user-select: none;
}

.app-window--maximized {
  position: fixed !important;
  left: 0 !important;
  top: 0 !important;
  width: 100vw !important;
  height: calc(100vh - 36px) !important;
}

.app-window__body {
  flex: 1;
  overflow: hidden;
  padding: 0;
  /* Content components handle their own padding */
}
</style>
