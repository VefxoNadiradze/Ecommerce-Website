import { useParams } from "react-router-dom";
import styled from "styled-components";
import Productdata from "../data.json";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

export default function Discount() {
  const { page } = useParams();
  const product = Productdata.products.filter((item) => item.page === page);

  return (
    <ProductsPar>
      {product.map((item) => {
        return (
          <ShoppingItem key={item.id}>
            <div className="itemHead">
              <button className="wishlistBtn">
                <FaRegHeart />
              </button>
            </div>
            <Link to={"/"}>
              <img
                src={item.img.img1}
                alt="product item img"
                className="ItemImg"
              />
            </Link>
            <div className="productOptions">
              <h3>{item.name}</h3>
              <div className="price-addCartBtn">
                <span>${item.price}</span>

                <button className="addCartBtn">
                  <FaCartShopping />
                </button>
              </div>
            </div>
          </ShoppingItem>
        );
      })}
    </ProductsPar>
  );
}

const ProductsPar = styled.div`
  background-color: #f6f9fc;
  padding: 50px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;
const ShoppingItem = styled.div`
  box-shadow: 0px 0px 10px gray;
  padding: 10px;
  border-radius: 5px;
  &:hover .itemHead .wishlistBtn {
    opacity: 1;
  }
  .itemHead {
    text-align: right;

    .wishlistBtn {
      background-color: transparent;
      border: none;
      padding: 5px;
      cursor: pointer;
      font-size: 17px;
      opacity: 0;
      transition: 0.5s ease;
    }
  }

  .ItemImg {
    display: block;
    margin: 0 auto;
    height: 200px;
    padding: 20px;
    transition: 0.5s ease;

    &:hover {
      transform: scale(1.2);
    }
  }

  .productOptions {
    padding: 20px 10px 5px 10px;

    .price-addCartBtn {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;
    }
  }
`;
