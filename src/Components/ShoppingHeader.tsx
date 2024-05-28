import styled from "styled-components";
import data from "../data.json";
import { useParams } from "react-router-dom";
import { ChangeEvent } from "react";
import { filterByBrandSelect } from "../Redux/dataSlice";
import { useDispatch } from "react-redux";

export default function ShoppingHeader() {
  const { page } = useParams();
  let displatch = useDispatch();
  const filteredBrands = data.products.filter((item) => item.page === page);

  const ununiqueBrand = Array.from(
    new Set(filteredBrands.map((item) => item.seller))
  );

  const handleBrandSelectValue = (event: ChangeEvent<HTMLElement>) => {
    let Event = event.target as HTMLInputElement;

    displatch(filterByBrandSelect(Event.value));
  };

  return (
    <ShopingHeader>
      <div className="sortByBrand">
        <select onChange={handleBrandSelectValue}>
          <option>All</option>
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
