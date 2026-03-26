<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import type { VideoItem } from '@/types'

const props = defineProps<{ video: VideoItem }>()
const emit = defineEmits<{ close: [] }>()

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <div class="crt-overlay" @click.self="emit('close')">
      <div class="crt-tv">

        <!-- Top antenna detail -->
        <div class="crt-tv__antenna">
          <div class="crt-tv__antenna-left" />
          <div class="crt-tv__antenna-right" />
        </div>

        <!-- Main TV body -->
        <div class="crt-tv__body">

          <!-- Screen + effects -->
          <div class="crt-tv__screen-wrap">
            <div class="crt-tv__screen">
              <iframe
                class="crt-tv__iframe"
                :src="props.video.src + '?autoplay=1'"
                :title="props.video.title"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              />
              <!-- Scanlines overlay -->
              <div class="crt-tv__scanlines" aria-hidden="true" />
              <!-- Vignette overlay -->
              <div class="crt-tv__vignette" aria-hidden="true" />
              <!-- Moving scanline -->
              <div class="crt-tv__beam" aria-hidden="true" />
            </div>
          </div>

          <!-- Side panel with knobs -->
          <div class="crt-tv__side-panel">
            <div class="crt-tv__knob crt-tv__knob--power" title="Close" @click="emit('close')">
              <div class="crt-tv__knob-dot" />
            </div>
            <div class="crt-tv__knob" />
            <div class="crt-tv__knob" />
            <div class="crt-tv__vents">
              <span v-for="i in 6" :key="i" class="crt-tv__vent" />
            </div>
          </div>
        </div>

        <!-- Bottom info bar -->
        <div class="crt-tv__footer">
          <span class="crt-tv__brand">VIDTRON 2000</span>
          <span class="crt-tv__title">{{ props.video.title }}</span>
          <span class="crt-tv__channel">CH 01</span>
        </div>

        <p class="crt-tv__hint">[ ESC or click outside to close ]</p>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
/* ── Overlay ──────────────────────────────────────────────── */
.crt-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  animation: fadeIn 0.15s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* ── TV chassis ───────────────────────────────────────────── */
.crt-tv {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  animation: powerOn 0.4s ease;
}

@keyframes powerOn {
  0%   { transform: scaleY(0.02) scaleX(1);   opacity: 0.4; }
  40%  { transform: scaleY(0.02) scaleX(1);   opacity: 1; }
  70%  { transform: scaleY(1.02) scaleX(0.99); }
  100% { transform: scaleY(1)    scaleX(1); }
}

/* ── Antennas ─────────────────────────────────────────────── */
.crt-tv__antenna {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 40px;
  padding-bottom: 4px;
}

.crt-tv__antenna-left,
.crt-tv__antenna-right {
  width: 4px;
  height: 40px;
  background: #555;
  border-radius: 2px;
  box-shadow: 0 0 4px #000;
}
.crt-tv__antenna-left  { transform: rotate(-20deg); transform-origin: bottom center; }
.crt-tv__antenna-right { transform: rotate(20deg);  transform-origin: bottom center; }

/* ── TV body ──────────────────────────────────────────────── */
.crt-tv__body {
  display: flex;
  background: #2a2a2a;
  border-radius: 16px 16px 8px 8px;
  padding: 20px 16px 20px 20px;
  gap: 16px;
  box-shadow:
    inset 0 2px 0 #444,
    inset 0 -2px 0 #111,
    inset 2px 0 0 #383838,
    inset -2px 0 0 #111,
    0 8px 32px rgba(0, 0, 0, 0.8),
    0 0 0 2px #111;
}

/* ── Screen container ─────────────────────────────────────── */
.crt-tv__screen-wrap {
  /* inset / depth effect for screen bezel */
  background: #111;
  border-radius: 6px;
  padding: 8px;
  box-shadow:
    inset 2px 2px 6px rgba(0, 0, 0, 0.9),
    inset -1px -1px 2px rgba(255, 255, 255, 0.05);
}

.crt-tv__screen {
  position: relative;
  width: min(660px, 72vw);
  aspect-ratio: 16 / 9;
  background: #000;
  border-radius: 4px;
  overflow: hidden;
  /* Subtle screen curvature illusion */
  box-shadow:
    inset 0 0 40px rgba(0, 0, 0, 0.6),
    0 0 16px rgba(50, 255, 100, 0.07);
}

.crt-tv__iframe {
  width: 100%;
  height: 100%;
  display: block;
  border: none;
}

/* Scanlines */
.crt-tv__scanlines {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.25) 2px,
    rgba(0, 0, 0, 0.25) 4px
  );
  pointer-events: none;
  z-index: 2;
}

/* Edge vignette */
.crt-tv__vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0, 0, 0, 0.55) 100%);
  pointer-events: none;
  z-index: 3;
}

/* Moving beam */
.crt-tv__beam {
  position: absolute;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(255, 255, 255, 0.025);
  pointer-events: none;
  z-index: 4;
  animation: beam 8s linear infinite;
}

@keyframes beam {
  0%   { top: -4px; }
  100% { top: 100%; }
}

/* ── Side knob panel ──────────────────────────────────────── */
.crt-tv__side-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
}

.crt-tv__knob {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #555, #222);
  border: 2px solid #111;
  box-shadow: 0 2px 4px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1);
  cursor: default;
}

.crt-tv__knob--power {
  cursor: pointer;
  background: radial-gradient(circle at 35% 35%, #883333, #330000);
  border-color: #550000;
  box-shadow: 0 2px 4px rgba(0,0,0,0.6), 0 0 6px rgba(255, 60, 60, 0.3);
  transition: box-shadow 0.1s;
  position: relative;
}

.crt-tv__knob--power:hover {
  box-shadow: 0 2px 4px rgba(0,0,0,0.6), 0 0 12px rgba(255, 80, 80, 0.6);
}

.crt-tv__knob-dot {
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  width: 3px;
  height: 8px;
  background: #ff9999;
  border-radius: 2px;
}

/* Ventilation slots */
.crt-tv__vents {
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-top: 4px;
}

.crt-tv__vent {
  display: block;
  width: 20px;
  height: 2px;
  background: #111;
  border-radius: 1px;
  box-shadow: inset 0 1px 0 #1a1a1a;
}

/* ── Footer strip ─────────────────────────────────────────── */
.crt-tv__footer {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #1e1e1e;
  border-radius: 0 0 8px 8px;
  padding: 8px 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.5);
}

.crt-tv__brand {
  font-family: monospace;
  font-size: 0.65rem;
  color: #555;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.crt-tv__title {
  font-family: monospace;
  font-size: 0.75rem;
  color: #33ff66;
  letter-spacing: 1px;
  text-shadow: 0 0 8px rgba(50, 255, 100, 0.6);
  max-width: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.crt-tv__channel {
  font-family: monospace;
  font-size: 0.65rem;
  color: #555;
  letter-spacing: 2px;
}

/* ── Hint text ────────────────────────────────────────────── */
.crt-tv__hint {
  margin: 8px 0 0;
  font-family: monospace;
  font-size: 0.6rem;
  color: #444;
  letter-spacing: 1px;
  text-align: center;
}
</style>
