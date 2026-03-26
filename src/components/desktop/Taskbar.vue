<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { WindowInstance } from '@/types'
import { useWindowManager } from '@/composables/useWindowManager'

defineProps<{ windows: WindowInstance[] }>()

const { focusWindow, toggleMinimize } = useWindowManager()

const time = ref('')

function updateTime() {
  time.value = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

let interval: ReturnType<typeof setInterval>
onMounted(() => {
  updateTime()
  interval = setInterval(updateTime, 1000)
})
onUnmounted(() => clearInterval(interval))
</script>

<template>
  <div class="taskbar">
    <div class="taskbar__start-area">
      <button class="taskbar__start">
        <span>▶</span> Start
      </button>

      <div class="taskbar__separator" />

      <button
        v-for="win in windows"
        :key="win.id"
        class="taskbar__task-btn"
        :class="{ 'taskbar__task-btn--minimized': win.isMinimized }"
        @click="win.isMinimized ? (focusWindow(win.id), toggleMinimize(win.id)) : toggleMinimize(win.id)"
      >
        {{ win.title }}
      </button>
    </div>

    <div class="taskbar__clock window" role="status" aria-live="polite">
      {{ time }}
    </div>
  </div>
</template>

<style scoped>
.taskbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 36px;
  background: #c0c0c0;
  border-top: 2px solid #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4px;
  box-shadow: inset 0 1px 0 #dfdfdf;
  z-index: 9999;
}

.taskbar__start-area {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
  overflow: hidden;
}

.taskbar__start {
  font-weight: bold;
  padding: 2px 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.taskbar__separator {
  width: 2px;
  height: 26px;
  background: #808080;
  border-right: 1px solid #fff;
  flex-shrink: 0;
}

.taskbar__task-btn {
  font-size: 0.75rem;
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 2px 8px;
}

.taskbar__task-btn--minimized {
  font-style: italic;
  box-shadow: inset 1px 1px 0 #808080;
}

.taskbar__clock {
  font-size: 0.75rem;
  padding: 2px 8px;
  flex-shrink: 0;
  border: inset 2px;
}
</style>
