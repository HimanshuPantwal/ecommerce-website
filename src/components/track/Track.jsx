import { useContext } from "react";
import myContext from "../../context/myContext";
import Card from "./Card"; 

const Track = () => {
  const context = useContext(myContext);
  const { mode } = context;

  const cardData = [
    {
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 13l4 4L19 7"
        />
      ),
      title: "Quality Products",
      description: "Our products are crafted with the finest materials, ensuring top-notch quality.",
    },
    {
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 7l8 8 8-8"
        />
      ),
      title: "Fast Delivery",
      description: "We ensure fast and reliable delivery to get your products to you on time.",
    },
    {
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 10l-7 7-7-7"
        />
      ),
      title: "No Extra Charge on Return",
      description: "Enjoy hassle-free returns without any additional charges.",
    },
  ];
  

  return (
    <section>
      <div className="container mx-auto px-5 py-10 md:py-14">
        <div className="flex flex-wrap -m-4 text-center">
          {cardData.map((card, index) => (
            <Card
              key={index}
              icon={card.icon}
              title={card.title}
              description={card.description}
              mode={mode}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Track;
