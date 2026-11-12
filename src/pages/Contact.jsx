import Seo from '../components/Seo'
import LarkHeavenFluidHero from '../components/Contact/LarkHeavenFluidHero'
import ContactDetail from '../components/Contact/ContactDetail'

const Contact = () => {
  return (
    <>
      <Seo path="/contact" />
      <h1 className="sr-only">Contact Lark Heaven</h1>
      <LarkHeavenFluidHero />
      <ContactDetail />
    </>
  )
}

export default Contact