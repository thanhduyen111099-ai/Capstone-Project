import SectionHero from "../../components/common/SectionHero/SectionHero";
import Highlight from "../../components/common/Highlight/Highlight";
import Testimonials from "../../components/common/Testimonials/Testimonials";
import About from "../../components/common/About/About";
import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

const Homepage = () => {
    const aboutRef = useRef(null);
    const { state } = useLocation();

    useEffect(() => {
        if (state?.scrollTo === "about") {
            aboutRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [state]);

    return (
        <>
            <SectionHero />
            <Highlight />
            <Testimonials />
            <div ref={aboutRef}>
                <About />
            </div>
        </>
    );
};

export default Homepage;
