import { useLocation } from "react-router-dom"
import MainNav from "../components/Navbar/MainNav.jsx"
import Footer from "../components/Footer/Footer.jsx"

function MainLayout({ children }) {
    const { pathname } = useLocation()

    const hideFooter =
        pathname === "/work"

    return (
        <>
            <MainNav />

            <main>{children}</main>

            {!hideFooter && <Footer />}
        </>
    )
}

export default MainLayout