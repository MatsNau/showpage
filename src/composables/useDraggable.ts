import { onUnmounted } from 'vue'

type MoveCallback = (x: number, y: number) => void

export function useDraggable(onMove: MoveCallback) {
  let dragging = false
  let originX = 0
  let originY = 0
  let startWinX = 0
  let startWinY = 0

  // ── Mouse ──────────────────────────────────────────────────

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
    if (e.button !== 0) return
    dragging = true
    originX = e.clientX
    originY = e.clientY
    startWinX = currentX
    startWinY = currentY
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  // ── Touch ──────────────────────────────────────────────────

  function onTouchMove(e: TouchEvent) {
    if (!dragging || e.touches.length !== 1) return
    const touch = e.touches[0]!
    onMove(startWinX + (touch.clientX - originX), startWinY + (touch.clientY - originY))
  }

  function onTouchEnd() {
    dragging = false
    window.removeEventListener('touchmove', onTouchMove)
    window.removeEventListener('touchend', onTouchEnd)
  }

  function startTouchDrag(e: TouchEvent, currentX: number, currentY: number) {
    if (e.touches.length !== 1) return
    const touch = e.touches[0]!
    dragging = true
    originX = touch.clientX
    originY = touch.clientY
    startWinX = currentX
    startWinY = currentY
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd)
  }

  onUnmounted(() => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
    window.removeEventListener('touchmove', onTouchMove)
    window.removeEventListener('touchend', onTouchEnd)
  })

  return { startDrag, startTouchDrag }
}
