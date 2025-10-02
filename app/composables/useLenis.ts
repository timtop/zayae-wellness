import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenis: Lenis

export const useLenis = () => {
  const lockScroll = () => {
    lenis.stop()
  }

  const resumeScroll = () => {
    lenis.start()
  }

  const initSmoothScroll = () => {
    lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      touchMultiplier: 2
    })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)
  }

  const killSmoothScroll = () => {
    lenis.destroy()
  }

  const updateScroll = () => {
    ScrollTrigger.refresh(true)
    setTimeout(() => {
      lenis.resize()
    }, 1000)
  }

  const _scrollTo = (target: number, options?: any) => {
    lenis.scrollTo(target, options)
  }

  const getLenisInstance = () => lenis

  return reactive({
    initSmoothScroll,
    killSmoothScroll,
    getLenisInstance,
    updateScroll,
    lockScroll,
    resumeScroll,
    _scrollTo
  })
}
