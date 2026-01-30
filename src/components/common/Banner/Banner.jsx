import "./Banner.css";

export default function Banner({ heading, content, className = "" }) {
    const style = `banner ${className}`;
    return (
        <div className={style}>
            <h2 className="banner-heading">{heading}</h2>
            <h3 className="banner-content">{content}</h3>
        </div>
    );
}
