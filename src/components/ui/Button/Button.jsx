import React from "react";
import { useNavigate } from "react-router-dom";
import "./Button.css";

export default function Button({ children, to, onClick, variant = "primary", type = "button", disabled = false, className = "", name = "", ...rest }) {
    const navigate = useNavigate();
    const ref = React.useRef(null);
    const [isInsideForm, setIsInsideForm] = React.useState(false);

    React.useEffect(() => {
        if (ref.current) {
            const formParent = ref.current.closest("form");
            setIsInsideForm(!!formParent);
        }
    }, []);

    const buttonType = type || (isInsideForm ? "submit" : "button");

    const handleClick = (e) => {
        if (onClick) onClick(e);
        if (to && buttonType !== "submit") navigate(to);
    };

    const style = `btn ${variant} ${className}`.trim();

    return (
        <button ref={ref} type={buttonType} disabled={disabled} onClick={handleClick} className={style} name={name} {...rest}>
            {children}
        </button>
    );
}
