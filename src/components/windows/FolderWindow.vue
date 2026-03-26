<script setup lang="ts">
import type { FolderPayload, VideoItem, VideoPlayerPayload } from '@/types'
import { computed } from 'vue'
import { videoCategories } from '@/data/videos'
import { useWindowManager } from '@/composables/useWindowManager'

const props = defineProps<{ payload: FolderPayload }>()

const { openWindow } = useWindowManager()

const category = computed(() =>
  videoCategories.find((c) => c.id === props.payload.categoryId),
)

function openVideo(video: VideoItem) {
  openWindow({
    type: 'video-player',
    title: video.title,
    payload: { video } satisfies VideoPlayerPayload,
    isMaximized: true,
  })
}
</script>

<template>
  <div v-if="category" class="folder-window">
    <div
      v-for="video in category.videos"
      :key="video.id"
      class="folder-window__item"
      @dblclick="openVideo(video)"
    >
      <span class="folder-window__icon">🎞️</span>
      <span class="folder-window__label">{{ video.title }}</span>
    </div>

    <p v-if="category.videos.length === 0" class="folder-window__empty">
      This folder is empty.
    </p>
  </div>
</template>

<style scoped>
.folder-window {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-content: flex-start;
  height: 100%;
  padding: 8px;
}

.folder-window__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 80px;
  padding: 8px 4px;
  cursor: pointer;
  border: 2px solid transparent;
  text-align: center;
}

.folder-window__item:hover {
  background: #000080;
  border-color: #000080;
}

.folder-window__item:hover .folder-window__label {
  color: #fff;
}

.folder-window__icon {
  font-size: 2rem;
  pointer-events: none;
}

.folder-window__label {
  font-size: 0.7rem;
  word-break: break-word;
  color: #000;
  pointer-events: none;
}

.folder-window__empty {
  color: #808080;
  font-size: 0.75rem;
}
</style>
