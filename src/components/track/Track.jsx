import { useContext,useEffect } from "react";
import myContext from "../../context/myContext";
import Card from "./Card"; 
import AOS from 'aos';
const Track = () => {
  const context = useContext(myContext);
  const { mode } = context;

  const cardData = [
    {
      icon:"https://img.freepik.com/free-vector/product-quality-concept-illustration_114360-7301.jpg?t=st=1729508512~exp=1729512112~hmac=ae428640eece804dcdec27ae9fc6734237048cd11f231b4a7a91712b84770d91&w=740"
      ,
      title: "Quality Products",
      description: "Our products are crafted with the finest materials, ensuring top-notch quality.",
    },
    {
      icon:"https://img.freepik.com/free-vector/way-concept-illustration_114360-1191.jpg?t=st=1729508448~exp=1729512048~hmac=5a4bc9f42c2afbb7ccf546306caeef8a2168975b96914a2dc729dc91a8fc5af8&w=996",
      title: "Fast Delivery",
      description: "We ensure fast and reliable delivery to get your products to you on time.",
    },
    {
      icon:"https://img.freepik.com/free-vector/red-free-promotional-badge-vector_53876-40850.jpg?t=st=1729508666~exp=1729512266~hmac=17b092f0b0f59f2f45dcc6e704c32a17416203d85d563317f552aa08f7c77dd7&w=740",
      title: "No Extra Charge on Return",
      description: "Enjoy hassle-free returns without any additional charges.",
    },
  ];
  useEffect(() => {
        
    AOS.init({ duration: 1000 });
}, []);

  return (
    <section>
      <div className="container mx-auto px-5 py-10 md:py-14" data-aos='fade-right'>
        <div className="flex flex-wrap -m-4 text-center" >
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
