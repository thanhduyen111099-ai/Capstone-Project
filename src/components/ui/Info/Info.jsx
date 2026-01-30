import "./Info.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Info({ className = ``, icon, children }) {
    return (
        <div className={`info ps-8 flex gap-4 ${className}`}>
            <div className="info-icon">
                <FontAwesomeIcon icon={icon} className="sm:text-xl" />
            </div>
            <p>{children}</p>
        </div>
    );
}
