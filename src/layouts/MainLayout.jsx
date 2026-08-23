import MainNav from "../components/Navbar/MainNav.jsx"
import Footer from "../components/Footer/Footer.jsx"

function MainLayout({ children }) {
    return (
        <>
            <MainNav />
            <main>{children}</main>
            <Footer />
        </>
    );
}

export default MainLayout;