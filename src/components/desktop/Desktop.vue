<script setup lang="ts">
import { videoCategories } from '@/data/videos'
import { useWindowManager } from '@/composables/useWindowManager'
import DesktopIcon from '@/components/desktop/DesktopIcon.vue'
import Taskbar from '@/components/desktop/Taskbar.vue'
import AppWindow from '@/components/windows/AppWindow.vue'
import FolderWindow from '@/components/windows/FolderWindow.vue'
import VideoPlayer from '@/components/windows/VideoPlayer.vue'
import AboutWindow from '@/components/windows/AboutWindow.vue'
import type { FolderPayload, VideoPlayerPayload } from '@/types'

const { windows, openWindow } = useWindowManager()

function openCategory(categoryId: string, label: string) {
  openWindow({
    type: 'folder',
    title: label,
    payload: { categoryId } satisfies FolderPayload,
    width: 400,
    height: 300,
  })
}

function openAbout() {
  openWindow({
    type: 'about',
    title: 'About Me',
    width: 380,
    height: 280,
  })
}
</script>

<template>
  <div class="desktop">
    <div class="desktop__icons">
      <DesktopIcon
        v-for="cat in videoCategories"
        :key="cat.id"
        :icon="cat.icon"
        :label="cat.label"
        @open="openCategory(cat.id, cat.label)"
      />
      <DesktopIcon icon="person" label="About Me" @open="openAbout" />
    </div>

    <AppWindow v-for="win in windows" :key="win.id" :window="win">
      <FolderWindow
        v-if="win.type === 'folder'"
        :payload="(win.payload as FolderPayload)"
      />
      <VideoPlayer
        v-else-if="win.type === 'video-player'"
        :payload="(win.payload as VideoPlayerPayload)"
      />
      <AboutWindow v-else-if="win.type === 'about'" />
    </AppWindow>

    <div class="desktop__watermark">
      <span>Doormats OS</span>
    </div>

    <Taskbar :windows="windows" />
  </div>
</template>

<style scoped>
.desktop {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  background-color: #008080;
}

.desktop__icons {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 8px;
  position: absolute;
  top: 0;
  left: 0;
}

.desktop__watermark {
  position: absolute;
  bottom: 44px; /* just above the taskbar */
  right: 12px;
  text-align: right;
  pointer-events: none;
  user-select: none;
  line-height: 1.3;
}

.desktop__watermark span {
  font-family: 'MS Sans Serif', 'Tahoma', sans-serif;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.4);
}
</style>
