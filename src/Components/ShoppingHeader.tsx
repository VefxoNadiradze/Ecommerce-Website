import styled from "styled-components";
import data from "../data.json";
import { useParams } from "react-router-dom";

export default function ShoppingHeader() {
  const { page } = useParams();
  const filteredBrands = data.products.filter((item) => item.page === page);

  const ununiqueBrand = Array.from(
    new Set(filteredBrands.map((item) => item.seller))
  );
  return (
    <ShopingHeader>
      <div className="sortByBrand">
        <select>
          {ununiqueBrand.map((item, index) => {
            return <option key={index}>{item}</option>;
          })}
        </select>
      </div>
    </ShopingHeader>
  );
}

const ShopingHeader = styled.div`
  margin-top: 20px;
  padding: 20px 20px 0px 20px;
`;
