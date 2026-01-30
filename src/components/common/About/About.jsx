import "./About.css";
import img1 from "../../../assets/images/Mario-and-Adrian-1.jpg";
import img2 from "../../../assets/images/Mario-and-Adrian-2.jpg";

export default function About() {
    return (
        <div className="about container">
            <div className="about-content">
                <h1>Little Lemon</h1>
                <h2>Chicago</h2>
                <p>
                    Little Lemon is owned by two Italian brothers, Mario and Adrian, who moved to the United States to pursue their shared dream of owning a restaurant. To craft
                    the menu, Mario relies on family recipes and his experience as a chef in Italy. Adrian does all the marketing for the restaurant and led the effort to expand
                    the menu beyond classic Italian to incorporate additional cuisines from the Mediterranean region.
                </p>
            </div>

            <div className="about-images ">
                <img src={img1} alt="" className="about-img" />
                <img src={img2} alt="" className="about-img" />
            </div>
        </div>
    );
}
