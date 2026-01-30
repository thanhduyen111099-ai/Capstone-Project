import "./Highlight.css";
import menuItems from "../../../constants/menuItems";
import Button from "../../ui/Button/Button";
import { CardItems } from "../../ui/Card/CardItems";

const Highlight = () => {
    const specialDishes = menuItems.filter((item) => item.isSpecial);

    return (
        <section className="highlight container">
            <div className="highlight-container">
                <div className="highlight-header">
                    <h2>Specials</h2>
                    <span>
                        <Button to="/menu">Online Menu</Button>
                    </span>
                </div>

                <CardItems data={specialDishes} />
            </div>
        </section>
    );
};

export default Highlight;
