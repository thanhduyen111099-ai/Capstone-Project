import "./Review.css";
import star from "../../../assets/icons/icon_star.png";

function RatingStars({ rating = 0, max = 5 }) {
    const valid = Math.max(0, Math.min(max, Math.floor(Number(rating) || 0)));

    return (
        <ul className="rating">
            {Array.from({ length: valid }).map((_, i) => (
                <li key={i} className="star">
                    <img src={star} alt="star" />
                </li>
            ))}
        </ul>
    );
}

function Review({ rating, avatar, name, user, comment }) {
    return (
        <div className="review">
            <RatingStars rating={rating} />
            <div className="review-user">
                <img className="review-user_avt" src={avatar} alt="" />
                <p className="review-user_name">{name}</p>
                <p className="review-user_user">{user}</p>
            </div>
            <p className="review-comment">"{comment}"</p>
        </div>
    );
}

export default function Reviews({ data }) {
    return (
        <div className="reviews-grid">
            <div className="reviews ">
                {data.map((item) => (
                    <Review key={item.id} rating={item.rating} avatar={item.avatar} name={item.name} user={item.user} comment={item.comment} />
                ))}
            </div>
        </div>
    );
}
