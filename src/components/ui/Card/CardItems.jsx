import "./Card.css";
import { Link } from "react-router-dom";
import icon from "../../../assets/icons/icon_delivery.jpg";

function Card({ image, descImg, name, price, description, className = "" }) {
    const style = `card ${className}`;

    return (
        <div className={style}>
            <div className="card-image">
                <img src={image} alt={descImg} className="image" />
            </div>

            <div className="card-header">
                <h3>{name}</h3>
                <span>${price}</span>
            </div>

            <p className="card-desc">{description}</p>

            <Link className="card-link" to="/order-online">
                Order a delivery <img src={icon} />
            </Link>
        </div>
    );
}

function CardItems({ data }) {
    return (
        <div className="card-items">
            {data.map((item) => (
                <Card key={item.id} image={item.image} descImg={item.name} name={item.name} price={item.price} description={item.description} />
            ))}
        </div>
    );
}

export { CardItems };
