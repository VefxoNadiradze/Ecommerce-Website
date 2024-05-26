import styled from "styled-components";
import ShopingItems from "../Components/ShopingItems";
import ShoppingHeader from "../Components/ShoppingHeader";
import ProductOptions from "../Components/ProductOptions";

export default function Shopping() {
  return (
    <>
      <ShoppingHeader />
      <Parentcomponent>
        <ShopingItems />
        <ProductOptions />
      </Parentcomponent>
    </>
  );
}

const Parentcomponent = styled.div`
  display: flex;
  justify-content: center;
`;
