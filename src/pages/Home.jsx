import PageTitle from '../utils/PageTitle'
import Hero from '../components/Home/Hero'
import WhatWeDo from '../components/Home/WhatWeDo'
import SelectedWork from '../components/Home/SelectedWork'
import TechStack from '../components/Home/TechStack'
import SAbout from '../components/Home/SAbout'

const Home = () => {
  return (
    <>
      <PageTitle title="Digital Experiences That Matter" />
      <Hero />
      <WhatWeDo />
      <SelectedWork />
      <TechStack />
      <SAbout />
    </>
  )
}

export default Home