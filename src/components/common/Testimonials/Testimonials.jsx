import "./Testimonials.css";
import Reviews from "../../ui/Review/Review";
import { review } from "../../../constants/review";

export default function Testimonials() {
    return (
        <section className="testimonials">
            <div className="container">
                <h2>Testimonials</h2>

                <Reviews data={review} />
            </div>
        </section>
    );
}
