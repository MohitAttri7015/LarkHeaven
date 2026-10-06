import TechStackGallery from './TechStackGallery'


const images1 = [
    'https://ik.imagekit.io/hvgxiwqfcy/Byte%20Forge/techStackImage2.jpg',
    'https://ik.imagekit.io/hvgxiwqfcy/Byte%20Forge/techStackImage11.jpg'
]

const images2 = [
    'https://ik.imagekit.io/hvgxiwqfcy/Byte%20Forge/techStackImage4.jpg',
    'https://ik.imagekit.io/hvgxiwqfcy/Byte%20Forge/techStackImage10.jpg'
]

const images3 = [
    'https://ik.imagekit.io/hvgxiwqfcy/Byte%20Forge/techStackImage1.jpg',
    'https://ik.imagekit.io/hvgxiwqfcy/Byte%20Forge/techStackImage9.jpg'
]

const images4 = [
    'https://ik.imagekit.io/hvgxiwqfcy/Byte%20Forge/techStackImage3.jpg',
    'https://ik.imagekit.io/hvgxiwqfcy/Byte%20Forge/techStackImage8.jpg'
]

const images5 = [
    'https://ik.imagekit.io/hvgxiwqfcy/Byte%20Forge/techStackImage5.jpg',
    'https://ik.imagekit.io/hvgxiwqfcy/Byte%20Forge/techStackImage14.jpg'
]

const images6 = [
    'https://ik.imagekit.io/hvgxiwqfcy/Byte%20Forge/techStackImage6.jpg',
    'https://ik.imagekit.io/hvgxiwqfcy/Byte%20Forge/techStackImage13.jpg'
]

const images7 = [
    'https://ik.imagekit.io/hvgxiwqfcy/Byte%20Forge/techStackImage7.jpg',
    'https://ik.imagekit.io/hvgxiwqfcy/Byte%20Forge/techStackImage12.jpg'
]


const TechStack = () => {



    return (
        <div className="w-full bg-black text-white md:px-8! px-4! md:py-25! py-15!">
            <div className="md:text-6xl sm:text-4xl text-2xl md:leading-20 sm:leading-15 leading-10 select-none font-light uppercase">Web Design & Development,<TechStackGallery images={images1} delay={1500} /> React / Next.js, UI / UX,<TechStackGallery images={images2} delay={500} /> Custom Software,<TechStackGallery images={images7} delay={900} /> BaaS (Supabase & Firebase),<TechStackGallery images={images3} delay={1800} /> SEO, Animation (GSAP),<TechStackGallery images={images4} delay={2000} /> 3D (Three.js),<TechStackGallery images={images5} delay={700} /> R3F, Vibe Code<TechStackGallery images={images6} delay={2500} />, MongoDB, SQL</div>
        </div>
    )
}

export default TechStack