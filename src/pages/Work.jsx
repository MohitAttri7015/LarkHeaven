import Seo from '../components/Seo'
import Projects from '../components/Work/Projects'

const Work = () => {
  return (
    <>
      <Seo path="/work" />
      <h1 className="sr-only">Selected Work & Projects by Lark Heaven</h1>
      <Projects />
    </>
  )
}

export default Work