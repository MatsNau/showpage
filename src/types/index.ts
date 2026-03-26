export type VideoSourceType = 'youtube' | 'vimeo' | 'file'

export interface VideoItem {
  id: string
  title: string
  description?: string
  sourceType: VideoSourceType
  src: string
  thumbnail?: string
  tags?: string[]
}

export type IconName = 'clapper' | 'tv' | 'film-reel' | 'camera' | 'person'

export interface VideoCategory {
  id: string
  label: string
  icon: IconName
  videos: VideoItem[]
}

// ── Window system ──────────────────────────────────────────────

export type WindowContentType = 'folder' | 'video-player' | 'about'

export interface FolderPayload {
  categoryId: string
}

export interface VideoPlayerPayload {
  video: VideoItem
}

export type WindowPayload = FolderPayload | VideoPlayerPayload | null

export interface WindowInstance {
  id: string
  type: WindowContentType
  title: string
  x: number
  y: number
  width: number
  height: number
  zIndex: number
  isMinimized: boolean
  isMaximized: boolean
  payload: WindowPayload
}
