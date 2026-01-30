import { useEffect, useState } from "react";
import icon from "../../../assets/icons/icon_logo-2.png";

export default function Greeting() {
    const [greeting, setGreeting] = useState("");

    function updateGreeting() {
        const currentHour = new Date().getHours();

        if (currentHour >= 6 && currentHour < 11) {
            setGreeting("Good Morning!");
        } else if (currentHour >= 11 && currentHour < 17) {
            setGreeting("Good Afternoon!");
        } else if (currentHour >= 17 && currentHour < 24) {
            setGreeting("Good Evening!");
        } else {
            setGreeting("Good Night!");
        }
    }

    useEffect(() => {
        updateGreeting();
        const interval = setInterval(updateGreeting, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="greeting">
            <div>
                <img src={icon} alt="icon" />
            </div>
            <p>{greeting}</p>
        </div>
    );
}
