import React, { useEffect, useRef } from 'react'

export default function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let animationId
    let w, h
    const COUNT = 120

    // Each particle: x, y, z (simulated depth), vx, vy, size, opacity
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random(),         // 0 = far, 1 = close
      vx: (Math.random() - 0.5) * 0.00015,
      vy: (Math.random() - 0.5) * 0.00015,
      baseY: Math.random(),
      phase: Math.random() * Math.PI * 2,
    }))

    // Two "orbs" (soft glow blobs)
    const orbs = [
      { xr: 0.75, yr: 0.45, r: 0.18, phase: 0 },
      { xr: 0.22, yr: 0.65, r: 0.12, phase: Math.PI },
    ]

    function resize() {
      w = canvas.width  = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    let t = 0

    function draw() {
      t += 0.008
      ctx.clearRect(0, 0, w, h)

      // --- Orbs ---
      orbs.forEach((orb) => {
        const cx = orb.xr * w
        const cy = orb.yr * h + Math.sin(t * 0.4 + orb.phase) * h * 0.04
        const r  = Math.min(w, h) * orb.r
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
        grad.addColorStop(0, 'rgba(0,255,163,0.045)')
        grad.addColorStop(1, 'rgba(0,255,163,0)')
        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      })

      // --- Particles ---
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy + Math.sin(t + p.phase) * 0.00008

        if (p.x < 0) p.x = 1
        if (p.x > 1) p.x = 0
        if (p.y < 0) p.y = 1
        if (p.y > 1) p.y = 0

        const px = p.x * w
        const py = p.y * h
        const size   = 0.8 + p.z * 1.6
        const alpha  = 0.15 + p.z * 0.4

        ctx.beginPath()
        ctx.arc(px, py, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,255,163,${alpha.toFixed(2)})`
        ctx.fill()
      })

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.85,
      }}
    />
  )
}
