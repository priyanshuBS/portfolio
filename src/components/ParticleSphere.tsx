import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const noise = /* glsl */ `
vec3 mod289(vec3 x){return x - floor(x * (1.0/289.0)) * 289.0;}
vec4 mod289(vec4 x){return x - floor(x * (1.0/289.0)) * 289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`

const vertex = /* glsl */ `
uniform float uTime;
uniform float uPixel;
uniform float uSize;
uniform float uPulse;
attribute float aRand;
varying float vMix;
varying float vAlpha;
${noise}
void main() {
  vec3 p = position;
  vec3 dir = normalize(p);
  float n = snoise(p * 0.85 + vec3(uTime * 0.12));
  float n2 = snoise(p * 2.4 - vec3(uTime * 0.08));
  p += dir * (n * (0.32 + uPulse * 0.25) + n2 * 0.07);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * uPixel * (0.5 + aRand) / -mv.z;
  vMix = clamp(n * 0.6 + 0.5, 0.0, 1.0);
  vAlpha = 0.25 + 0.75 * smoothstep(-0.5, 0.7, n);
}
`

const fragment = /* glsl */ `
uniform vec3 uC1;
uniform vec3 uC2;
uniform vec3 uC3;
varying float vMix;
varying float vAlpha;
void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float a = smoothstep(0.5, 0.05, d);
  vec3 col = mix(uC1, uC2, vMix);
  col = mix(col, uC3, smoothstep(0.7, 1.0, vMix));
  gl_FragColor = vec4(col, a * vAlpha);
}
`

function fibonacciSphere(count: number, radius: number) {
  const pos = new Float32Array(count * 3)
  const rand = new Float32Array(count)
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const t = golden * i
    const jitter = radius * (0.96 + Math.random() * 0.08)
    pos[i * 3] = Math.cos(t) * r * jitter
    pos[i * 3 + 1] = y * jitter
    pos[i * 3 + 2] = Math.sin(t) * r * jitter
    rand[i] = Math.random()
  }
  return { pos, rand }
}

export default function ParticleSphere({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'high-performance' })
    } catch {
      return // WebGL unavailable: the CSS glow behind still looks fine
    }

    const small = innerWidth < 768
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    const pixel = Math.min(devicePixelRatio, 1.75)
    renderer.setPixelRatio(pixel)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100)
    camera.position.z = small ? 6.4 : 5

    const group = new THREE.Group()
    scene.add(group)

    // main sphere
    const { pos, rand } = fibonacciSphere(small ? 4000 : 9000, 1.7)
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    geo.setAttribute('aRand', new THREE.BufferAttribute(rand, 1))
    const uniforms = {
      uTime: { value: 0 },
      uPixel: { value: pixel },
      uSize: { value: small ? 26 : 30 },
      uPulse: { value: 0 },
      uC1: { value: new THREE.Color('#5b3df5') },
      uC2: { value: new THREE.Color('#a78bfa') },
      uC3: { value: new THREE.Color('#67e8f9') },
    }
    const mat = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    group.add(new THREE.Points(geo, mat))

    // distant star dust
    const starCount = small ? 500 : 1200
    const stars = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i++) {
      stars[i * 3] = (Math.random() - 0.5) * 18
      stars[i * 3 + 1] = (Math.random() - 0.5) * 12
      stars[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2
    }
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.BufferAttribute(stars, 3))
    const starMat = new THREE.PointsMaterial({ size: 0.018, color: '#c4b5fd', transparent: true, opacity: 0.55, depthWrite: false })
    const starField = new THREE.Points(starGeo, starMat)
    scene.add(starField)

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas
      if (!w || !h) return
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // mouse
    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }
    let pulse = 0
    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / innerWidth - 0.5) * 2
      target.y = (e.clientY / innerHeight - 0.5) * 2
    }
    const onDown = () => (pulse = 1)
    addEventListener('pointermove', onMove, { passive: true })
    addEventListener('pointerdown', onDown, { passive: true })

    // only render while visible
    let visible = true
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(canvas)

    const clock = new THREE.Clock()
    let raf = 0
    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!visible) return
      const t = clock.getElapsedTime()
      uniforms.uTime.value = t
      pulse *= 0.95
      uniforms.uPulse.value = pulse
      current.x += (target.x - current.x) * 0.04
      current.y += (target.y - current.y) * 0.04
      group.rotation.y = t * 0.08 + current.x * 0.6
      group.rotation.x = current.y * 0.35
      group.position.x = current.x * 0.15
      starField.rotation.y = t * 0.01 + current.x * 0.08
      starField.rotation.x = current.y * 0.05
      renderer.render(scene, camera)
    }
    if (reduced) renderer.render(scene, camera)
    else tick()

    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('pointermove', onMove)
      removeEventListener('pointerdown', onDown)
      ro.disconnect()
      io.disconnect()
      geo.dispose()
      mat.dispose()
      starGeo.dispose()
      starMat.dispose()
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className={`block size-full ${className}`} aria-hidden="true" />
}
