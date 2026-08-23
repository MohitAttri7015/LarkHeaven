import PageTitle from '../utils/PageTitle'
import AboutHero from '../components/About/AboutHero'
import Process from '../components/About/Process'
import AboutMe from '../components/About/AboutMe'
import Vision from '../components/About/Vision'

const About = () => {
  return (
    <>
      <PageTitle title="About Me" />
      <AboutHero />
      <Process />
      <AboutMe />
      <Vision />
    </>
  )
}

export default About