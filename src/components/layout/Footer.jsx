import { Link } from "react-router-dom";
import { footerContent } from "../../../data";
import logo from "../../assets/images/logo_footer.png";

const Footer = () => {
    return (
        <footer className="bg-(--color-highlight-2) flex flex-col divide-y divide-black">
            <div className="p-12 flex items-center justify-evenly">
                <div className="w-full grid grid-cols-1 justify-between gap-y-12 sm:grid-cols-2 sm:gap-6 sm:gap-y-8 lg:grid-cols-[8rem_1fr_1fr_1fr] lg:gap-x-12 ">
                    <img src={logo} alt="Logo Little Lemon Restaurant" className="w-32 max-sm:w-24" />

                    {footerContent.map((section, index) => (
                        <div key={index} className=" lg:justify-self-center">
                            <h3 className="font-[karla-xb] text-xl text-(--color-primary-1)">{section.title}</h3>

                            <ul className="text-(--color-highlight-3) font-[karla-reg] mt-1 sm:mt-4 grid gap-0">
                                {section.content.map((item, idx) => {
                                    if (item.path !== undefined) {
                                        return (
                                            <li key={idx}>
                                                <Link className="hover:underline" to={item.path}>
                                                    {item.item}
                                                </Link>
                                            </li>
                                        );
                                    } else {
                                        return (
                                            <li key={idx}>
                                                {item.label}: {item.value}
                                            </li>
                                        );
                                    }
                                })}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-7 text-center">
                <p className="font-[karla-reg]">
                    Copyright © {new Date().getFullYear()} Little Lemon Restaurant <br />
                    Designed and developed by ThanhDuyen Tran for the capstone project of the Meta front-end developer professional certificate.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
