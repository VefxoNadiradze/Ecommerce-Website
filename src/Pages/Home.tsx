import styled from "styled-components";
import Slider from "../Components/HomeSlider";
import datas from "../data.json";
import Discount from "../Components/Discount";
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
      <Discount />
    </>
  );
}

const OfferCardsParent = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  max-width: 1350px;
  margin: 50px auto 0 auto;
`;

const OfferCard = styled.div<{ color: string }>`
  text-align: center;
  width: 330px;
  padding: 50px;
  background-color: ${(props) => props.color};
  border-radius: 5px;

  img {
    height: 43px;
    border-radius: 50%;
    margin-bottom: 20px;
  }
`;
