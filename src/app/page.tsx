import IntroAnimation from "@/components/intro-animation"
import Hero from "@/components/hero"
import Shop from "@/components/shop"
import Testimonials from "@/components/testimonials"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"

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
