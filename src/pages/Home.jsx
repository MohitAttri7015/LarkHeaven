import Seo from '../components/Seo'
import Hero from '../components/Home/Hero'
import WhatWeDo from '../components/Home/WhatWeDo'
import SelectedWork from '../components/Home/SelectedWork'
import TechStack from '../components/Home/TechStack'
import SAbout from '../components/Home/SAbout'

const Home = () => {
  return (
    <>
      <Seo path="/" />
      <h1 className="sr-only">Lark Heaven — Web Development, UI/UX Design & Full-Stack Digital Experiences</h1>
      <Hero />
      <WhatWeDo />
      <SelectedWork />
      <TechStack />
      <SAbout />
    </>
  )
}

export default Home