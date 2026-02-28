import Nav from './components/Nav'
import Hero from './components/Hero'
import Tools from './components/Tools'
import Instructor from './components/Instructor'
import Waitlist from './components/Waitlist'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <Nav />
      <main>
        <Hero />
        <Tools />
        <Instructor />
        <Waitlist />
      </main>
      <Footer />
    </div>
  )
}
