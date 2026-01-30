import greekSalad from "../assets/images/food_greek-salad.jpg";
import bruchetta from "../assets/images/food_bruchetta.jpg";
import grilledFish from "../assets/images/food_grilled-fish.jpg";
import pasta from "../assets/images/food_pasta.jpg";
import lemonDesert from "../assets/images/food_lemon-dessert.jpg";
import beefSteak from "../assets/images/food_beef-steak.jpg";
import caesarSalad from "../assets/images/food_caesar-salad.jpg";
import avocadoToast from "../assets/images/food_avocado-toast.jpg";
import chocolateCake from "../assets/images/food_chocolate-cake.jpg";
import cheeseCake from "../assets/images/food_cheesecake.jpg";
import risotto from "../assets/images/food_risotto.jpg";
import garlicBread from "../assets/images/food_garlic-bread.jpg";
import tastingPlatter from "../assets/images/food_tasting-platter.jpg";
import lobsterTail from "../assets/images/food_lobster-tail.jpg";
import truffleBurger from "../assets/images/food_truffle-burger.jpg";

const menuItems = [
    {
        id: 1,
        name: "Greek salad",
        category: "Lunch",
        price: 12.99,
        description: "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.",
        image: greekSalad,
        isSpecial: true,
    },
    {
        id: 2,
        name: "Bruchetta",
        category: "Main",
        price: 5.99,
        description: "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil. ",
        image: bruchetta,
        isSpecial: true,
    },
    {
        id: 3,
        name: "Grilled Fish",
        category: "Main",
        price: 20.0,
        description: "Our Grilled Fish is perfectly cooked over an open flame and served with seasoned vegetables and lemon butter sauce.",
        image: grilledFish,
        isSpecial: false,
    },
    {
        id: 4,
        name: "Pasta",
        category: "A La Carte",
        price: 18.99,
        description: "Classic Italian pasta tossed in a rich tomato sauce with herbs, garlic, and a sprinkle of parmesan cheese.",
        image: pasta,
        isSpecial: false,
    },
    {
        id: 5,
        name: "Lemon Desert",
        category: "Desserts",
        price: 6.99,
        description: "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
        image: lemonDesert,
        isSpecial: true,
    },
    {
        id: 6,
        name: "Beef Steak",
        category: "Main",
        price: 24.99,
        description: "Juicy sirloin steak grilled to perfection and served with garlic mashed potatoes.",
        image: beefSteak,
        isSpecial: false,
    },
    {
        id: 7,
        name: "Caesar Salad",
        category: "Lunch",
        price: 10.99,
        description: "Fresh romaine lettuce with creamy dressing, croutons, and shaved parmesan cheese.",
        image: caesarSalad,
        isSpecial: false,
    },
    {
        id: 8,
        name: "Avocado Toast",
        category: "Lunch",
        price: 9.49,
        description: "Toasted sourdough topped with smashed avocado, olive oil, lemon juice, and chili flakes.",
        image: avocadoToast,
        isSpecial: false,
    },
    {
        id: 9,
        name: "Chocolate Cake",
        category: "Desserts",
        price: 7.99,
        description: "Moist chocolate sponge with dark chocolate ganache and a hint of espresso.",
        image: chocolateCake,
        isSpecial: false,
    },
    {
        id: 10,
        name: "Cheesecake",
        category: "Desserts",
        price: 8.49,
        description: "Creamy vanilla cheesecake with buttery crust and fresh strawberry topping.",
        image: cheeseCake,
        isSpecial: false,
    },
    {
        id: 11,
        name: "Risotto",
        category: "A La Carte",
        price: 17.49,
        description: "Creamy arborio rice with wild mushrooms and a sprinkle of truffle oil.",
        image: risotto,
        isSpecial: false,
    },
    {
        id: 12,
        name: "Garlic Bread",
        category: "A La Carte",
        price: 4.99,
        description: "Freshly baked baguette slices with garlic butter and parsley, toasted until golden.",
        image: garlicBread,
        isSpecial: false,
    },
    {
        id: 13,
        name: "Chef's Tasting Platter",
        category: "Specials",
        price: 28.99,
        description: "A curated selection of our best dishes, perfect for sharing or trying something new.",
        image: tastingPlatter,
        isSpecial: false,
    },
    {
        id: 14,
        name: "Lobster Tail",
        category: "Specials",
        price: 32.99,
        description: "Butter-grilled lobster tail served with garlic lemon butter and seasonal greens.",
        image: lobsterTail,
        isSpecial: false,
    },
    {
        id: 15,
        name: "Truffle Burger",
        category: "Specials",
        price: 19.99,
        description: "Premium beef patty topped with truffle aioli, caramelized onions, and aged cheddar.",
        image: truffleBurger,
        isSpecial: false,
    },
];

export default menuItems;
