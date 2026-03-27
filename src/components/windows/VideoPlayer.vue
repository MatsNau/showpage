<script setup lang="ts">
import { computed } from 'vue'
import type { VideoPlayerPayload } from '@/types'

const props = defineProps<{ payload: VideoPlayerPayload }>()

const embedSrc = computed(() => {
  const { sourceType, src } = props.payload.video

  if (sourceType === 'vimeo') {
    const params = new URLSearchParams({
      badge: '0',
      autopause: '0',
      player_id: '0',
      app_id: '58479',
      autoplay: '1',
      byline: '0',
      portrait: '0',
      title: '0',
    })
    return `${src}?${params.toString()}`
  }

  if (sourceType === 'youtube') {
    const params = new URLSearchParams({
      autoplay: '1',
      rel: '0',
      vq: 'hd1080',
    })
    return `${src}?${params.toString()}`
  }

  return src
})
</script>

<template>
  <div class="wmp">
    <!-- Video area -->
    <div class="wmp__screen">
      <video
        v-if="props.payload.video.sourceType === 'file'"
        class="wmp__iframe"
        :src="props.payload.video.src"
        controls
        autoplay
      />
      <iframe
        v-else
        class="wmp__iframe"
        :src="embedSrc"
        :title="props.payload.video.title"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      />
    </div>

    <!-- WMP status bar -->
    <div class="wmp__bar">
      <div class="wmp__bar-left">
        <span class="wmp__logo">▶ WMP</span>
        <span class="wmp__divider" />
        <span class="wmp__now-playing">Now Playing:</span>
        <span class="wmp__title">{{ props.payload.video.title }}</span>
      </div>
      <div class="wmp__bar-right">
        <span
          v-for="tag in props.payload.video.tags"
          :key="tag"
          class="wmp__tag"
        >{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wmp {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #000;
}

/* ── Video screen ─────────────────────────────────────────── */
.wmp__screen {
  flex: 1;
  min-height: 0;
  background: #000;
  position: relative;
}

.wmp__iframe {
  width: 100%;
  height: 100%;
  display: block;
  border: none;
}

/* ── Bottom status bar ────────────────────────────────────── */
.wmp__bar {
  flex-shrink: 0;
  height: 28px;
  background: linear-gradient(to bottom, #1c1c1c, #111);
  border-top: 1px solid #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  gap: 8px;
  font-family: 'MS Sans Serif', 'Tahoma', sans-serif;
  font-size: 0.7rem;
}

.wmp__bar-left {
  display: flex;
  align-items: center;
  gap: 6px;
  overflow: hidden;
}

.wmp__logo {
  color: #4db8ff;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 0.65rem;
  flex-shrink: 0;
}

.wmp__divider {
  display: inline-block;
  width: 1px;
  height: 14px;
  background: #444;
  flex-shrink: 0;
}

.wmp__now-playing {
  color: #666;
  flex-shrink: 0;
}

.wmp__title {
  color: #d0d0d0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.wmp__bar-right {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
}

.wmp__tag {
  background: #1e3a1e;
  color: #4dcc4d;
  font-size: 0.6rem;
  padding: 1px 5px;
  border: 1px solid #2a5a2a;
  border-radius: 2px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
</style>
