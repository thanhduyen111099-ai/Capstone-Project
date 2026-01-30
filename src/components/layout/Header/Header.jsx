import "./Header.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { navItems } from "../../../constants/navItems";
import iconMenu from "../../../assets/icons/icon_menu.svg";
import logo from "../../../assets/images/logo_header.png";
import iconClose from "../../../assets/icons/icon_close.svg";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;

            if (currentScroll > lastScrollY && currentScroll > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            setLastScrollY(currentScroll);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <header className={`header ${isVisible ? "show" : "hide"}`}>
            <div className="container grid grid-cols-[auto_1fr] gap-14">
                <Link to="/">
                    <img src={logo} className="header_logo" alt="Little Lemon Restaurant Logo"></img>
                </Link>

                <nav className="hidden lg:flex header_nav">
                    {navItems.map((e) =>
                        e.scrollTo ? (
                            <button
                                key={e.item}
                                className="header_link"
                                onClick={() => {
                                    navigate(e.path, { state: { scrollTo: e.scrollTo } });
                                }}
                            >
                                {e.item}
                            </button>
                        ) : (
                            <Link key={e.item} to={e.path} className="header_link">
                                {e.item}
                            </Link>
                        )
                    )}
                </nav>

                <button className="lg:hidden justify-self-end" onClick={() => setIsOpen(!isOpen)}>
                    <img src={iconMenu} alt="" />
                </button>
            </div>

            {isOpen && (
                <>
                    <div className="drawer_overlay" onClick={() => setIsOpen(false)}></div>

                    <div className="drawer-menu lg:hidden">
                        <button className="flex justify-self-end" onClick={() => setIsOpen(false)}>
                            <img src={iconClose} alt="" />
                        </button>
                        <nav className="flex flex-col p-4 space-y-3 ">
                            {navItems.map((e) =>
                                e.scrollTo ? (
                                    <button
                                        key={e.item}
                                        className="header_link"
                                        onClick={() => {
                                            navigate(e.path, { state: { scrollTo: e.scrollTo } });
                                            setIsOpen(false);
                                        }}
                                    >
                                        {e.item}
                                    </button>
                                ) : (
                                    <Link key={e.item} className="header_link" to={e.path} onClick={() => setIsOpen(false)}>
                                        {e.item}
                                    </Link>
                                )
                            )}
                        </nav>
                    </div>
                </>
            )}
        </header>
    );
};

export default Header;
