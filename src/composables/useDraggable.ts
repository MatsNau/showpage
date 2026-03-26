import { onUnmounted } from 'vue'

type MoveCallback = (x: number, y: number) => void

export function useDraggable(onMove: MoveCallback) {
  let dragging = false
  let originX = 0
  let originY = 0
  let startWinX = 0
  let startWinY = 0

  function onMouseMove(e: MouseEvent) {
    if (!dragging) return
    onMove(startWinX + (e.clientX - originX), startWinY + (e.clientY - originY))
  }

  function onMouseUp() {
    dragging = false
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }

  function startDrag(e: MouseEvent, currentX: number, currentY: number) {
    // Only drag on left mouse button
    if (e.button !== 0) return

    dragging = true
    originX = e.clientX
    originY = e.clientY
    startWinX = currentX
    startWinY = currentY

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  onUnmounted(() => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  })

  return { startDrag }
}
