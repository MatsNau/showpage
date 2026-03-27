import type { VideoCategory } from '@/types'

// Replace the src values with your actual YouTube/Vimeo IDs or file paths.
// YouTube embed URL format: https://www.youtube.com/embed/VIDEO_ID
// Vimeo embed URL format:   https://player.vimeo.com/video/VIDEO_ID

export const videoCategories: VideoCategory[] = [
  {
    id: 'concerts',
    label: 'Concerts',
    icon: 'clapper',
    videos: [
      {
        id: 'adept-2025',
        title: 'adept.MP4',
        description: 'ADEPT LIVE',
        sourceType: 'file',
        src: '/videos/adept.mp4',
        tags: ['concert'],
      },
      {
        id: 'counterparts-2026',
        title: 'counterparts.MP4',
        description: 'COUNTERPARTS LIVE',
        sourceType: 'file',
        src: '/videos/counterparts.mp4',
        tags: ['concert'],
      },
      {
        id: 'cotton-2026',
        title: 'jazz.mov',
        description: 'LIVE MUSIC IN COTTON CLUB',
        sourceType: 'file',
        src: '/videos/jazz.mov',
        tags: ['concert'],
      },
      {
        id: 'malevolence-2025',
        title: 'malevolence.mov',
        description: 'COMPILATION OF SOME CONCERTS FROM 2025',
        sourceType: 'file',
        src: '/videos/malevolence.mov',
        tags: ['concert'],
      },
    ],
  },
  {
    id: 'private-projects',
    label: 'Private Projects',
    icon: 'tv',
    videos: [
      {
        id: 'commercial-01',
        title: 'Brand Spot — Example',
        description: 'A 30-second brand spot.',
        sourceType: 'youtube',
        src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        tags: ['commercial', 'brand'],
      },
    ],
  },
  {
    id: 'short-films',
    label: 'Short Films',
    icon: 'film-reel',
    videos: [
      {
        id: 'short-01',
        title: 'Short Film — Example',
        description: 'An example short film entry.',
        sourceType: 'youtube',
        src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        tags: ['short', 'film'],
      },
    ],
  },
]
