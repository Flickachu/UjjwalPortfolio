import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'

let lenis

export function initScroll() {
  if (typeof window === 'undefined') return
  if (lenis) return lenis

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    direction: 'vertical',
    gestureDirection: 'vertical',
  })

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  // make GSAP ScrollTrigger use Lenis as a scroller when present
  if (gsap && gsap.registerPlugin) {
    try {
      const ScrollTrigger = gsap.ScrollTrigger
      if (ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger)
        ScrollTrigger.scrollerProxy(document.documentElement, {
          scrollTop(value) {
            return arguments.length ? lenis.scrollTo(value) : lenis.scroll.instance.scroll.y
          },
          getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
          },
        })

        lenis.on('scroll', ScrollTrigger.update)
        ScrollTrigger.defaults({ scroller: document.documentElement })
      }
    } catch (e) {
      // ignore if ScrollTrigger not present
    }
  }

  return lenis
}

export function destroyScroll() {
  if (!lenis) return
  lenis.destroy()
  lenis = null
}

export default initScroll
