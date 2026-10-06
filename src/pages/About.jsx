import Seo from '../components/Seo'
import AboutHero from '../components/About/AboutHero'
import Process from '../components/About/Process'
import AboutMe from '../components/About/AboutMe'
import Vision from '../components/About/Vision'

const About = () => {
  return (
    <>
      <Seo path="/about" />
      <h1 className="sr-only">About Lark Heaven — Full-Stack Architect & Creative Developer</h1>
      <AboutHero />
      <Process />
      <AboutMe />
      <Vision />
    </>
  )
}

export default About