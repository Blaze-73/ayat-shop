import dynamic from "next/dynamic"
import IntroAnimation from "@/components/intro-animation"
import Hero from "@/components/hero"
import Navbar from "@/components/navbar"

const Shop = dynamic(() => import("@/components/shop"), { loading: () => <div className="h-96" /> })
const Testimonials = dynamic(() => import("@/components/testimonials"), { loading: () => <div className="h-80" /> })
const Footer = dynamic(() => import("@/components/footer"), { loading: () => <div className="h-64" /> })

export default function Home() {
  return (
    <>
      <IntroAnimation />
      <Navbar />
      <main>
        <Hero />
        <Shop />
        <Testimonials />
      </main>
      <Footer />
    </>
  )
}
