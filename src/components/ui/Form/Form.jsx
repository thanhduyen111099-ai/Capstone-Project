import "./Form.css";

export default function Form({ className = ``, title, children }) {
    return (
        <div className="form">
            <div className="container">
                <h6 className={`title ${!title ? "hidden" : ""}`}>{title}</h6>
                <div className={`content ${className}`}>{children}</div>
            </div>
        </div>
    );
}
