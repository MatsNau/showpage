<script setup lang="ts">
defineProps<{
  name: 'clapper' | 'tv' | 'film-reel' | 'camera' | 'person'
  size?: number
}>()
</script>

<template>
  <svg
    :width="size ?? 32"
    :height="size ?? 32"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    shape-rendering="crispEdges"
  >
    <!-- ── Clapperboard (Showreel) ───────────────────────── -->
    <template v-if="name === 'clapper'">
      <!-- body -->
      <rect x="2" y="10" width="28" height="20" fill="#c0c0c0" stroke="#000" stroke-width="1"/>
      <!-- body highlight top-left -->
      <rect x="3" y="11" width="26" height="1" fill="#fff"/>
      <rect x="3" y="11" width="1" height="18" fill="#fff"/>
      <!-- body shadow bottom-right -->
      <rect x="3" y="28" width="26" height="1" fill="#808080"/>
      <rect x="29" y="11" width="1" height="18" fill="#808080"/>
      <!-- lines on body -->
      <rect x="4" y="15" width="24" height="2" fill="#000080"/>
      <rect x="4" y="20" width="24" height="2" fill="#000080"/>
      <rect x="4" y="25" width="24" height="2" fill="#000080"/>
      <!-- top clapper bar base -->
      <rect x="2" y="5" width="28" height="6" fill="#1a1a1a" stroke="#000" stroke-width="1"/>
      <!-- diagonal stripes on clapper bar -->
      <rect x="4"  y="6" width="3" height="4" fill="#fff"/>
      <rect x="9"  y="6" width="3" height="4" fill="#fff"/>
      <rect x="14" y="6" width="3" height="4" fill="#fff"/>
      <rect x="19" y="6" width="3" height="4" fill="#fff"/>
      <rect x="24" y="6" width="3" height="4" fill="#fff"/>
      <!-- clapper hinge -->
      <rect x="2" y="4" width="4" height="3" fill="#808080" stroke="#000" stroke-width="1"/>
    </template>

    <!-- ── Old TV (Commercials) ──────────────────────────── -->
    <template v-else-if="name === 'tv'">
      <!-- outer bezel -->
      <rect x="1" y="2" width="26" height="22" rx="2" fill="#c0c0c0" stroke="#000" stroke-width="1"/>
      <!-- bezel highlight -->
      <rect x="2" y="3" width="24" height="1" fill="#fff"/>
      <rect x="2" y="3" width="1" height="20" fill="#fff"/>
      <!-- bezel shadow -->
      <rect x="2" y="22" width="24" height="1" fill="#808080"/>
      <rect x="25" y="3" width="1" height="20" fill="#808080"/>
      <!-- screen inset -->
      <rect x="4" y="5" width="16" height="14" fill="#000820" stroke="#444" stroke-width="1"/>
      <!-- screen scanline highlight -->
      <rect x="5" y="6" width="14" height="1" fill="#2a2a5a" opacity="0.8"/>
      <!-- screen reflection dot -->
      <rect x="6" y="7" width="2" height="1" fill="#5555aa" opacity="0.5"/>
      <!-- right side: knob 1 -->
      <rect x="22" y="6" width="4" height="4" rx="2" fill="#808080" stroke="#000" stroke-width="1"/>
      <rect x="23" y="7" width="2" height="2" fill="#c0c0c0"/>
      <!-- right side: knob 2 -->
      <rect x="22" y="13" width="4" height="4" rx="2" fill="#808080" stroke="#000" stroke-width="1"/>
      <rect x="23" y="14" width="2" height="2" fill="#c0c0c0"/>
      <!-- stand neck -->
      <rect x="10" y="24" width="8" height="4" fill="#a0a0a0" stroke="#000" stroke-width="1"/>
      <!-- stand base -->
      <rect x="6" y="27" width="16" height="3" fill="#a0a0a0" stroke="#000" stroke-width="1"/>
      <rect x="7" y="28" width="14" height="1" fill="#fff"/>
    </template>

    <!-- ── Film Reel (Short Films) ───────────────────────── -->
    <template v-else-if="name === 'film-reel'">
      <!-- outer reel rim -->
      <circle cx="16" cy="16" r="14" fill="#1a1a1a" stroke="#000" stroke-width="1"/>
      <!-- rim highlight -->
      <path d="M6 8 A11 11 0 0 1 22 6" fill="none" stroke="#555" stroke-width="1.5"/>
      <!-- spokes -->
      <rect x="15" y="5"  width="2" height="8"  fill="#444"/>
      <rect x="15" y="19" width="2" height="8"  fill="#444"/>
      <rect x="5"  y="15" width="8" height="2"  fill="#444"/>
      <rect x="19" y="15" width="8" height="2"  fill="#444"/>
      <!-- diagonal spokes -->
      <line x1="9"  y1="9"  x2="14" y2="14" stroke="#444" stroke-width="2"/>
      <line x1="23" y1="9"  x2="18" y2="14" stroke="#444" stroke-width="2"/>
      <line x1="9"  y1="23" x2="14" y2="18" stroke="#444" stroke-width="2"/>
      <line x1="23" y1="23" x2="18" y2="18" stroke="#444" stroke-width="2"/>
      <!-- hub ring -->
      <circle cx="16" cy="16" r="5" fill="#333" stroke="#555" stroke-width="1"/>
      <!-- hub center -->
      <circle cx="16" cy="16" r="2" fill="#666" stroke="#888" stroke-width="0.5"/>
      <!-- sprocket holes -->
      <rect x="14" y="3"  width="4" height="2" rx="1" fill="#555"/>
      <rect x="14" y="27" width="4" height="2" rx="1" fill="#555"/>
      <rect x="3"  y="14" width="2" height="4" rx="1" fill="#555"/>
      <rect x="27" y="14" width="2" height="4" rx="1" fill="#555"/>
    </template>

    <!-- ── Camera (alternative video icon) ──────────────── -->
    <template v-else-if="name === 'camera'">
      <!-- body -->
      <rect x="1" y="8" width="24" height="18" rx="1" fill="#333" stroke="#000" stroke-width="1"/>
      <!-- body highlight -->
      <rect x="2" y="9" width="22" height="1" fill="#555"/>
      <!-- viewfinder hump -->
      <rect x="7" y="4" width="9" height="5" rx="1" fill="#333" stroke="#000" stroke-width="1"/>
      <!-- lens barrel outer -->
      <circle cx="12" cy="18" r="7" fill="#222" stroke="#000" stroke-width="1"/>
      <!-- lens barrel inner -->
      <circle cx="12" cy="18" r="5" fill="#111" stroke="#444" stroke-width="1"/>
      <!-- lens glass -->
      <circle cx="12" cy="18" r="3" fill="#0a0a2a"/>
      <circle cx="11" cy="17" r="1" fill="#3333aa" opacity="0.6"/>
      <!-- flash/hotshoe -->
      <rect x="18" y="9" width="5" height="3" fill="#dfb317" stroke="#000" stroke-width="0.5"/>
      <!-- film advance wheel -->
      <rect x="22" y="8" width="5" height="7" fill="#444" stroke="#000" stroke-width="1"/>
      <rect x="23" y="9" width="3" height="5" fill="#222"/>
    </template>

    <!-- ── Person / About ────────────────────────────────── -->
    <template v-else-if="name === 'person'">
      <!-- head -->
      <circle cx="16" cy="8" r="5" fill="#ffcc99" stroke="#000" stroke-width="1"/>
      <!-- hair -->
      <rect x="11" y="3" width="10" height="4" fill="#4a3000" stroke="#000" stroke-width="1"/>
      <rect x="11" y="5" width="2" height="3" fill="#4a3000"/>
      <rect x="19" y="5" width="2" height="3" fill="#4a3000"/>
      <!-- neck -->
      <rect x="14" y="13" width="4" height="3" fill="#ffcc99" stroke="#000" stroke-width="1"/>
      <!-- shirt body -->
      <rect x="7" y="16" width="18" height="12" rx="1" fill="#000080" stroke="#000" stroke-width="1"/>
      <!-- shirt highlight -->
      <rect x="8" y="17" width="16" height="1" fill="#0000c0"/>
      <!-- collar left -->
      <rect x="12" y="16" width="4" height="5" fill="#fff" stroke="#000" stroke-width="0.5"/>
      <!-- tie -->
      <rect x="14" y="16" width="4" height="6" fill="#800000" stroke="#000" stroke-width="0.5"/>
      <rect x="15" y="22" width="2" height="3" fill="#800000"/>
    </template>
  </svg>
</template>
