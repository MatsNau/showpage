import { ref } from 'vue'
import type { VideoItem } from '@/types'

// Shared singleton — any component can trigger the CRT player
const activeVideo = ref<VideoItem | null>(null)

export function useVideoPlayer() {
  function playVideo(video: VideoItem) {
    activeVideo.value = video
  }

  function closeVideo() {
    activeVideo.value = null
  }

  return { activeVideo, playVideo, closeVideo }
}
