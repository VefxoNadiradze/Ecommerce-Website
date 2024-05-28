import { ChangeEvent, FormEvent, useState } from "react";
import data from "../data.json";
import { IoIosSearch } from "react-icons/io";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import {
  FilterByBrands,
  FilterByCategoryBtn,
  filterByInputCategory,
} from "../Redux/dataSlice";

export default function ProductOptions() {
  const { page } = useParams();
  let dispatch = useDispatch();
  const categoriesFilter = data.products.filter((filterItem) => {
    return page === filterItem.page;
  });

  const uniqueCategories = Array.from(
    new Set(categoriesFilter.map((item) => item.category))
  );

  const uniqueBrands = Array.from(
    new Set(categoriesFilter.map((item) => item.seller))
  );

  const [FilterByInput, setFilterByInput] = useState<string>("");

  const onSubmitFilterItem = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(filterByInputCategory(FilterByInput));
  };

  const onchangeFilterItems = (e: ChangeEvent<HTMLInputElement>) => {
    let Event = e.target as HTMLInputElement;
    setFilterByInput(Event.value);

    if (FilterByInput.trim() !== "") {
      dispatch(filterByInputCategory(FilterByInput));
    }
  };

  return (
    <OptionComponent>
      <form onSubmit={onSubmitFilterItem} className="filterProductInput">
        <input
          onChange={onchangeFilterItems}
          type="text"
          placeholder="Filter..."
        />
        <button type="submit">
          <IoIosSearch />
        </button>
      </form>

      <div className="FilterByPrice">
        <input type="range" />
      </div>

      {uniqueCategories.length > 1 && <p>Categories</p>}
      <div className="filterBycategories">
        {uniqueCategories.length > 1 && (
          <button onClick={() => dispatch(FilterByCategoryBtn("All"))}>
            {" "}
            All{" "}
          </button>
        )}

        {uniqueCategories.map((filterItem, index) => {
          return (
            uniqueCategories.length > 1 && (
              <button
                onClick={() => {
                  dispatch(FilterByCategoryBtn(filterItem));
                }}
                key={index}
              >
                {filterItem}
              </button>
            )
          );
        })}
      </div>

      {uniqueBrands.length > 1 && <p>Brands</p>}

      <div className="filterByBrand">
        {uniqueBrands.length > 1 && (
          <button onClick={() => dispatch(FilterByBrands("All"))}>All</button>
        )}
        {uniqueBrands.map((filterItem, index) => {
          return (
            uniqueBrands.length > 1 && (
              <button
                key={index}
                onClick={() => dispatch(FilterByBrands(filterItem))}
              >
                {filterItem}
              </button>
            )
          );
        })}
      </div>
    </OptionComponent>
  );
}

const OptionComponent = styled.div`
  padding: 20px;
  max-width: 250px;

  .filterProductInput {
    position: relative;
    width: 100%;

    input {
      padding: 5px;
      width: 100%;
      outline: none;
    }

    button {
      position: absolute;
      top: 50%;
      height: 80%;
      width: 20px;
      transform: translateY(-50%);
      right: 2px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background-color: transparent;
    }
  }

  .FilterByPrice {
    margin: 20px;
  }

  .filterBycategories {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin: 20px;

    button {
      font-size: 12px;
      cursor: pointer;
      background-color: transparent;
      border-radius: 5px;
      color: green;
      border: 2px solid green;
      transition: 0.5s ease;
      padding: 5px;

      &:hover {
        background-color: green;
        color: white;
      }
    }
  }

  .filterByBrand {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin: 20px;

    button {
      font-size: 12px;
      cursor: pointer;
      background-color: transparent;
      border-radius: 5px;
      color: green;
      border: 2px solid green;
      transition: 0.5s ease;
      padding: 5px;

      &:hover {
        background-color: green;
        color: white;
      }
    }
  }
`;
