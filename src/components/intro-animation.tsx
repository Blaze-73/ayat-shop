"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { easeOut, easeInOut } from "@/lib/eases"

export default function IntroAnimation() {
  const [show, setShow] = useState(true)
  const [letterState, setLetterState] = useState<"hidden" | "revealing" | "complete">("hidden")

  useEffect(() => {
    const revealTimer = setTimeout(() => setLetterState("revealing"), 300)
    const completeTimer = setTimeout(() => setLetterState("complete"), 2200)
    const hideTimer = setTimeout(() => setShow(false), 3800)
    return () => {
      clearTimeout(revealTimer)
      clearTimeout(completeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  const letterVariants = {
    hidden: { y: 80, opacity: 0, rotateX: -30 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        delay: 0.4 + i * 0.25,
        duration: 0.8,
        ease: easeOut,
      },
    }),
    exit: {
      y: -60,
      opacity: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: easeInOut, delay: 0.3 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1a1a1a]"
        >
          <div className="flex items-baseline gap-1 sm:gap-3 overflow-hidden">
            {"AYA".split("").map((letter, i) => (
              <motion.span
                key={`${letter}-${i}`}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate={letterState === "hidden" ? "hidden" : "visible"}
                exit="exit"
                className="font-serif text-[clamp(5rem,25vw,12rem)] leading-none tracking-[-0.04em] text-[#c4956a]"
                style={{ perspective: 800 }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={
              letterState === "complete"
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.8, ease: easeOut }}
            className="mt-4 sm:mt-6 overflow-hidden"
          >
            <p className="font-sans text-[clamp(0.8rem,2vw,1.2rem)] tracking-[0.3em] text-[#f0e6d8]/70 uppercase">
              Artisanale &amp; Élégance
            </p>
          </motion.div>

          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.6 }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: easeInOut }}
              className="w-px h-12 bg-[#c4956a]/40"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
