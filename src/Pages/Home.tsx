import styled from "styled-components";
import Slider from "../Components/HomeSlider";
import datas from "../data.json";
import Discount from "../Components/Discount";
import HomeShoppingItems from "../Components/HomeShoppingItems";
export default function Home() {
  return (
    <>
      <Slider />
      <OfferCardsParent className="offerCards">
        {datas.Offers.map((item, index) => {
          return (
            <OfferCard key={index} color={item.bgColor}>
              <img src={item.icon} alt="offer icon" />
              <p>{item.offerText}</p>
            </OfferCard>
          );
        })}
      </OfferCardsParent>
      <HomeShoppingItems />
      <Discount />
    </>
  );
}

const OfferCardsParent = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(4, 1fr);
  justify-content: center;
  gap: 10px;
  max-width: 1350px;
  margin: 50px auto 0 auto;

  @media screen and (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 580px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const OfferCard = styled.div<{ color: string }>`
  text-align: center;

  padding: 50px;
  background-color: ${(props) => props.color};
  border-radius: 5px;

  img {
    height: 43px;
    border-radius: 50%;
    margin-bottom: 20px;
  }
`;
