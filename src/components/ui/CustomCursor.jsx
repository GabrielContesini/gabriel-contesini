import React, { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef   = useRef(null)
  const ringRef  = useRef(null)
  const posRef   = useRef({ x: -100, y: -100 })
  const ringPos  = useRef({ x: -100, y: -100 })
  const rafRef   = useRef(null)
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches
    if (isTouchDevice) return

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      if (!visible) setVisible(true)
    }

    const onEnter = () => setHovering(true)
    const onLeave = () => setHovering(false)

    window.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    const animate = () => {
      const lerpFactor = 0.12
      ringPos.current.x += (posRef.current.x - ringPos.current.x) * lerpFactor
      ringPos.current.y += (posRef.current.y - ringPos.current.y) * lerpFactor

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${posRef.current.x - 4}px, ${posRef.current.y - 4}px)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px) scale(${hovering ? 2.2 : 1})`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [visible, hovering])

  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return null

  return (
    <>
      <style>{`
        .cursor-dot {
          position: fixed;
          top: 0; left: 0;
          width: 8px; height: 8px;
          background: var(--accent);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transition: opacity 300ms;
          will-change: transform;
        }
        .cursor-ring {
          position: fixed;
          top: 0; left: 0;
          width: 36px; height: 36px;
          border: 1px solid rgba(0, 255, 163, 0.5);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          will-change: transform;
          transition: transform 0ms, border-color 200ms, opacity 300ms;
        }
        .cursor-ring.hovering {
          border-color: var(--accent);
          background: rgba(0, 255, 163, 0.05);
        }
      `}</style>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ opacity: visible ? 1 : 0 }}
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${hovering ? 'hovering' : ''}`}
        style={{ opacity: visible ? 1 : 0 }}
      />
    </>
  )
}
