export default function TabButton({ children, isSelected, image, ...props }) {
    return (
        <li>
            <button className={isSelected ? "active" : undefined} {...props}>
                <div className="image">
                    <img src={image} alt={children} />
                </div>
                <p>{children}</p>
            </button>
        </li>
    );
}
