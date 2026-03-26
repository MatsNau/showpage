<script setup lang="ts">
// Replace the content below with your own bio / contact details.
</script>

<template>
  <div class="about-window">
    <div class="about-window__avatar">🎬</div>

    <div class="about-window__content">
      <p><strong>Mats Naujoks</strong></p>
      <p>Filmmaker.</p>
      <hr />
      <p>
          Hello! I really like to film stuff.
      </p>
      <hr />
      <p>mail: <a href="mailto:furtiscoo@googlemail.com">furtiscoo@googlemail.com</a></p>
      <p>instagram: <a href="https://instagram.com/d00r_mats" target="_blank">@d00r_mats</a></p>
      <p>tiktok: <a href="https://tiktok.com/@clipmatsch" target="_blank">@clipmatsch</a></p>
      <p>youtube: <a href="https://www.youtube.com/channel/UCnbYoQbslhLMxgaCGlbvIyg" target="_blank">coldicefresh</a></p>
    </div>
  </div>
</template>

<style scoped>
.about-window {
  display: flex;
  gap: 16px;
  height: 100%;
}

.about-window__avatar {
  font-size: 4rem;
  padding: 8px;
}

.about-window__content {
  flex: 1;
  font-size: 0.8rem;
  line-height: 1.6;
}

.about-window__content p {
  margin: 4px 0;
}

.about-window__content hr {
  margin: 8px 0;
}

.about-window__content a {
  color: #000080;
}
</style>
