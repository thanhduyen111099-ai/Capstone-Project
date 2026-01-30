import "./TabMenu.css";
import TabButton from "./TabButton";
import Greeting from "./Greeting";
import menuItems from "../../../constants/menuItems";
import { CardItems } from "../../ui/Card/CardItems";

import { useState } from "react";

import allImg from "../../../assets/images/food_pasta.jpg";
import lunchImg from "../../../assets/images/food_greek-salad.jpg";
import mainImg from "../../../assets/images/food_bruchetta.jpg";
import dessertsImg from "../../../assets/images/food_chocolate-cake.jpg";
import aLaCarteImg from "../../../assets/images/food_grilled-fish.jpg";
import specialsImg from "../../../assets/images/food_tasting-platter.jpg";

export default function TabMenu() {
    const [selectedSection, setSelectedSection] = useState("All");

    const itemsToDisplay =
        selectedSection === "All"
            ? menuItems.sort((a, b) => {
                  let x = a.category.toLowerCase();
                  let y = b.category.toLowerCase();
                  if (x < y) {
                      return -1;
                  }
                  if (y > y) {
                      return 1;
                  }
                  return 0;
              })
            : menuItems.filter((item) => item.category === selectedSection);

    function handleSelect(selectedButton) {
        return setSelectedSection(selectedButton);
    }

    return (
        <>
            <menu className="container">
                <div className="tab-buttons">
                    <TabButton isSelected={selectedSection === "All"} onClick={() => handleSelect("All")} image={allImg}>
                        All
                    </TabButton>
                    <TabButton isSelected={selectedSection === "Lunch"} onClick={() => handleSelect("Lunch")} image={lunchImg}>
                        Lunch
                    </TabButton>
                    <TabButton isSelected={selectedSection === "Main"} onClick={() => handleSelect("Main")} image={mainImg}>
                        Main
                    </TabButton>
                    <TabButton isSelected={selectedSection === "Desserts"} onClick={() => handleSelect("Desserts")} image={dessertsImg}>
                        Desserts
                    </TabButton>
                    <TabButton isSelected={selectedSection === "A La Carte"} onClick={() => handleSelect("A La Carte")} image={aLaCarteImg}>
                        A La Carte
                    </TabButton>
                    <TabButton isSelected={selectedSection === "Specials"} onClick={() => handleSelect("Specials")} image={specialsImg}>
                        Specials
                    </TabButton>
                </div>

                <Greeting />
                <div className="menu-items">
                    <CardItems data={itemsToDisplay} />
                </div>
            </menu>
        </>
    );
}
