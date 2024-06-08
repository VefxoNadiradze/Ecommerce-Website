import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import data from "../data.json";
import { IoIosSearch } from "react-icons/io";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { IoSearch } from "react-icons/io5";
import { filterItemsByprice, sortItems } from "../Redux/dataSlice";
import {
  FilterByBrands,
  FilterByCategoryBtn,
  filterByInputCategory,
} from "../Redux/dataSlice";

export default function ProductOptions() {
  const { page } = useParams();
  let dispatch = useDispatch();

  // Reset filters when the page changes
  useEffect(() => {
    dispatch(FilterByCategoryBtn("All"));
    dispatch(FilterByBrands("All"));
    setFilterByInput("");
    dispatch(sortItems("High to Low"));
  }, [page, dispatch]);

  const categoriesFilter = data.products.filter((filterItem) => {
    return page === filterItem.page;
  });

  // get unique category brand btns
  const uniqueCategories = Array.from(
    new Set(categoriesFilter.map((item) => item.category))
  );

  // get unique brand btns
  const uniqueBrands = Array.from(
    new Set(categoriesFilter.map((item) => item.seller))
  );

  const [FilterByInput, setFilterByInput] = useState<string>("");

  const onSubmitFilterItem = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(filterByInputCategory(FilterByInput));
  };

  const onchangeFilterItems = (event: ChangeEvent<HTMLInputElement>) => {
    let Event = event.target as HTMLInputElement;
    setFilterByInput(Event.value);

    if (FilterByInput.trim() !== "") {
      dispatch(filterByInputCategory(FilterByInput));
    }
  };

  // min price
  const [minPrice, setMinPrice] = useState<number>(0);
  // max price
  const [maxPrice, setMaxPrice] = useState<number>(0);

  // filterByPrice
  const onSubmitFilterByPrice = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (minPrice > 0 && maxPrice > 0) {
      dispatch(filterItemsByprice({ maxPrice, minPrice }));
    }
  };

  return (
    <OptionComponent>
      <form onSubmit={onSubmitFilterItem} className="filterProductInput">
        <input
          onChange={onchangeFilterItems}
          type="text"
          value={FilterByInput}
          placeholder="Filter..."
        />
        <button type="submit">
          <IoIosSearch />
        </button>
      </form>

      <div className="FilterByPrice">
        <p>Price</p>
        <form onSubmit={onSubmitFilterByPrice} className="priceInputs">
          <input
            onChange={(e) => setMinPrice(Number(e.target.value))}
            type="number"
            placeholder="Min."
            min={0}
          />
          <input
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            type="number"
            placeholder="Max."
            min={0}
          />
          <button type="submit">
            <IoSearch />
          </button>
        </form>
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
      border-radius: 5px;
      outline: none;
      border: 2px solid gray;

      &::placeholder {
        color: gray;
      }

      &:focus {
        border: 2px solid green;
        color: green;
        font-weight: bold;
      }
      &:focus::placeholder {
        color: green;
      }
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
    font-size: 15px;
    font-weight: bold;
    width: 100%;

    .priceInputs {
      margin-top: 8px;
      display: flex;
      justify-content: left;
      gap: 5px;

      input {
        padding: 5px;
        max-width: 70px;
        border: 2px solid gray;
        border-radius: 5px;
        outline: none;

        &::placeholder {
          color: gray;
        }

        &:focus {
          border: 2px solid green;
          color: green;
          font-weight: bold;
        }
        &:focus::placeholder {
          color: green;
        }
      }
      button {
        padding: 5px 8px;
        font-size: 14px;
        background-color: green;
        border: none;
        color: white;
        cursor: pointer;
        border-radius: 5px;
      }
    }
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
