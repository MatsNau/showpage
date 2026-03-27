<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'

const canvas = ref<HTMLCanvasElement | null>(null)
let animationId: number
let mixer: THREE.AnimationMixer | null = null
const clock = new THREE.Clock()

// CRT retro shader: vignette + RGB chromatic aberration + scanline flicker
const CRTShader = {
  uniforms: {
    tDiffuse: { value: null },
    time: { value: 0.0 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float time;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;

      // Subtle CRT screen curvature
      vec2 curved = uv * 2.0 - 1.0;
      vec2 offset = curved.yx / 6.0;
      curved += curved * offset * offset;
      curved = curved * 0.5 + 0.5;

      // Out-of-bounds → black
      if (curved.x < 0.0 || curved.x > 1.0 || curved.y < 0.0 || curved.y > 1.0) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        return;
      }

      // Chromatic aberration (RGB split)
      float aberration = 0.002;
      float r = texture2D(tDiffuse, curved + vec2( aberration, 0.0)).r;
      float g = texture2D(tDiffuse, curved).g;
      float b = texture2D(tDiffuse, curved - vec2( aberration, 0.0)).b;
      vec3 color = vec3(r, g, b);

      // Scanlines
      float scanline = sin(curved.y * 800.0) * 0.04;
      color -= scanline;

      // Vignette
      vec2 vig = curved * (1.0 - curved.yx);
      float vignette = pow(vig.x * vig.y * 15.0, 0.3);
      color *= vignette;

      // Subtle flicker
      color *= 0.97 + 0.03 * sin(time * 8.0);

      gl_FragColor = vec4(color, 1.0);
    }
  `,
}

onMounted(() => {
  if (!canvas.value) return

  // Scene
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x008080)

  // Camera
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.set(0, 1.5, 3)
  camera.lookAt(0, 0, 0)

  // Renderer
  const renderer = new THREE.WebGLRenderer({ canvas: canvas.value, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  // Lighting
  const ambient = new THREE.AmbientLight(0xffffff, 1.5)
  scene.add(ambient)
  const dirLight = new THREE.DirectionalLight(0x00ffcc, 2.5)
  dirLight.position.set(2, 3, 2)
  scene.add(dirLight)
  const rimLight = new THREE.DirectionalLight(0xff0088, 1.2)
  rimLight.position.set(-3, -1, -2)
  scene.add(rimLight)
  const frontLight = new THREE.DirectionalLight(0xffffff, 1.5)
  frontLight.position.set(0, 0, 5)
  scene.add(frontLight)

  // Load GLB
  let modelRef: THREE.Group | null = null
  const loader = new GLTFLoader()
  loader.load(`${import.meta.env.BASE_URL}3DModel/3dHead.glb`, (gltf) => {
    const model = gltf.scene

    // Auto-scale
    const box = new THREE.Box3().setFromObject(model)
    const size = box.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    model.scale.setScalar(1.6 / maxDim)

    // Center the model using its bounding box center
    box.setFromObject(model)
    const center = box.getCenter(new THREE.Vector3())
    model.position.sub(center)

    scene.add(model)
    modelRef = model

    if (gltf.animations.length > 0) {
      mixer = new THREE.AnimationMixer(model)
      gltf.animations.forEach((clip) => mixer!.clipAction(clip).play())
    }
  })

  // Post-processing
  const composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))

  const filmPass = new FilmPass(0.25)
  composer.addPass(filmPass)

  const crtPass = new ShaderPass(CRTShader)
  composer.addPass(crtPass)

  // Resize
  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    composer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', onResize)

  // Animation loop
  function animate() {
    animationId = requestAnimationFrame(animate)
    const delta = clock.getDelta()
    if (mixer) mixer.update(delta)
    crtPass.uniforms['time'].value += delta
    composer.render()
  }
  animate()

  onUnmounted(() => {
    cancelAnimationFrame(animationId)
    window.removeEventListener('resize', onResize)
    renderer.dispose()
  })
})
</script>

<template>
  <canvas ref="canvas" class="desktop-bg" />
</template>

<style scoped>
.desktop-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  display: block;
}
</style>
