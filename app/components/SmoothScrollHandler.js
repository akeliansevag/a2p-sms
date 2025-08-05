'use client'

import { useEffect } from 'react'

export default function SmoothScrollHandler() {
  useEffect(() => {
    const handleClick = (event) => {
      const anchor = event.target.closest('a[href^="#"]')
      if (!anchor) return

      const targetId = anchor.getAttribute('href').slice(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        event.preventDefault()

        const offset = 100 // your offset in pixels
        const elementPosition = targetElement.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - offset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })

        history.pushState(null, '', `#${targetId}`) // optional URL update
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return null
}