import Seo from '../components/Seo'
import ServiceHero from '../components/Service/ServiceHero'

const Services = () => {
  return (
    <>
      <Seo path="/services" />
      <h1 className="sr-only">Web, Full-Stack & Mobile App Development Services</h1>
      <ServiceHero />
    </>
  )
}

export default Services