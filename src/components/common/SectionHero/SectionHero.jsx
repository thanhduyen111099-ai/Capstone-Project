import "./SectionHero.css";
import { heroContents } from "../../../constants/hero";
import Button from "../../ui/Button/Button";

const SectionHero = () => {
    return (
        <section className="hero bg-size-[cover_100px]">
            <div className="container mx-auto grid grid-cols-12 gap-x-5">
                <div className="col-span-12 sm:col-span-7 lg:col-span-5 lg:col-start-2 xl:col-span-4 xl:col-start-3 hero_content">
                    <h1>{heroContents.heading1}</h1>
                    <h2>{heroContents.heading2}</h2>
                    <p>{heroContents.content}</p>
                    <div className="hero_button">
                        <Button to={heroContents.path}>{heroContents.button}</Button>
                    </div>
                </div>

                <div className="hero_img col-span-4 sm:col-end-13 lg:col-end-12 xl:col-end-11 justify-self-end">
                    <img src={heroContents.image} alt={heroContents.alt} />
                </div>

                <div className="hero_bg"></div>
            </div>
        </section>
    );
};

export default SectionHero;
