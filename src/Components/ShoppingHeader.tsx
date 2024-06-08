import styled from "styled-components";
import { ChangeEvent } from "react";
import { sortItems } from "../Redux/dataSlice";
import { useDispatch } from "react-redux";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { HandleArrangement } from "../Redux/arrangementSlice";

export default function ShoppingHeader() {
  const dispatch = useDispatch();

  const handleBrandSelectValue = (event: ChangeEvent<HTMLElement>) => {
    let Event = event.target as HTMLInputElement;

    dispatch(sortItems(Event.value));
  };

  return (
    <ShopingHeader>
      <div className="sortByBrand">
        <select onChange={handleBrandSelectValue}>
          <option>High to Low</option>
          <option>Low to High</option>
          <option>A-Z</option>
          <option>Z-A</option>
        </select>
      </div>

      <div className="Productarrangement">
        <button
          onClick={() => dispatch(HandleArrangement("grid"))}
          className="grid"
        >
          <BsFillGrid3X3GapFill />
        </button>
        <button
          onClick={() => dispatch(HandleArrangement("list"))}
          className="list"
        >
          <FaThList />
        </button>
      </div>
    </ShopingHeader>
  );
}

const ShopingHeader = styled.div`
  margin-top: 20px;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  max-width: 1210px;
  .Productarrangement {
    display: flex;
    align-items: center;
    gap: 10px;

    button {
      cursor: pointer;
      display: flex;
      padding: 3px;
      background-color: transparent;
      border: none;
      color: #c0c0c0;
    }
  }
`;
