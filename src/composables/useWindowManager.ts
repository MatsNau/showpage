import { ref } from 'vue'
import type { WindowInstance, WindowContentType, WindowPayload } from '@/types'

// Shared singleton state — all components share the same window list.
const windows = ref<WindowInstance[]>([])
let zCounter = 100

type OpenWindowOptions = {
  type: WindowContentType
  title: string
  payload?: WindowPayload
  width?: number
  height?: number
  isMaximized?: boolean
}

function isMobileDevice(): boolean {
  return window.innerWidth < 768
}

export function useWindowManager() {
  function openWindow(options: OpenWindowOptions): string {
    const id = `win-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
    const offset = windows.value.length * 24

    windows.value.push({
      id,
      type: options.type,
      title: options.title,
      payload: options.payload ?? null,
      x: 80 + offset,
      y: 60 + offset,
      width: options.width ?? 480,
      height: options.height ?? 360,
      zIndex: ++zCounter,
      isMinimized: false,
      isMaximized: options.isMaximized ?? isMobileDevice(),
    })

    return id
  }

  function closeWindow(id: string): void {
    const index = windows.value.findIndex((w) => w.id === id)
    if (index !== -1) windows.value.splice(index, 1)
  }

  function focusWindow(id: string): void {
    const win = windows.value.find((w) => w.id === id)
    if (win) win.zIndex = ++zCounter
  }

  function toggleMinimize(id: string): void {
    const win = windows.value.find((w) => w.id === id)
    if (win) win.isMinimized = !win.isMinimized
  }

  function toggleMaximize(id: string): void {
    const win = windows.value.find((w) => w.id === id)
    if (win) win.isMaximized = !win.isMaximized
  }

  function updatePosition(id: string, x: number, y: number): void {
    const win = windows.value.find((w) => w.id === id)
    // Maximized windows don't move
    if (win && !win.isMaximized) {
      win.x = x
      win.y = y
    }
  }

  return {
    windows,
    openWindow,
    closeWindow,
    focusWindow,
    toggleMinimize,
    toggleMaximize,
    updatePosition,
  }
}
