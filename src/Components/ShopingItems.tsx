import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { addItemsInCart } from "../Redux/cartData";

interface Idatas {
  datas: Product[];
}
interface IState {
  arrangement: string;
}
export default function Discount() {
  let dispatch = useDispatch();
  const dataSelector = useSelector((state: Idatas) => state.datas);
  const arrangementSelector = useSelector((state: IState) => state.arrangement);

  const { page } = useParams();
  let product = dataSelector.filter((item: Product) => item.page === page);

  return (
    <ProductsPar arrangementselector={arrangementSelector}>
      {/* if product length is less then 1 display the error */}
      {product.length < 1 && <ErrorDiv>Product not found</ErrorDiv>}
      {product.map((item: Product) => {
        return (
          <ShoppingItem arrangementselector={arrangementSelector} key={item.id}>
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

                <button
                  className="addCartBtn"
                  onClick={() => {
                    dispatch(addItemsInCart(item.id));
                  }}
                >
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

const ErrorDiv = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 30px;
  color: red;
  font-weight: bold;
`;

const ProductsPar = styled.div<{ arrangementselector: string }>`
  position: relative;
  background-color: #f6f9fc;
  padding: 50px;
  width: 100%;
  display: grid;
  grid-template-columns: ${(props) =>
    props.arrangementselector === "grid" && "repeat(3,1fr)"};
  height: max-content;
  gap: 20px;
`;
const ShoppingItem = styled.div<{ arrangementselector: string }>`
  position: relative;
  display: flex;
  flex-direction: ${(props) =>
    props.arrangementselector === "grid" && "column"};
  align-items: ${(props) => props.arrangementselector === "list" && "center"};
  box-shadow: 0px 0px 10px gray;
  padding: 10px;
  border-radius: 5px;
  &:hover .itemHead .wishlistBtn {
    opacity: 1;
  }
  .itemHead {
    width: ${(props) => props.arrangementselector === "grid" && "100%"};
    margin-top: ${(props) => props.arrangementselector === "list" && "-20px"};
    text-align: right;
    order: ${(props) => props.arrangementselector === "list" && "1"};
    .wishlistBtn {
      background-color: transparent;
      border: none;
      padding: 5px;
      cursor: pointer;
      font-size: 17px;
      opacity: ${(props) => props.arrangementselector === "grid" && "0"};
      transition: 0.5s ease;
    }
  }

  .ItemImg {
    display: block;
    margin: 0 auto;
    height: 200px;
    padding: 20px;
    transition: 0.5s ease;
  }

  .productOptions {
    padding: 20px 10px 5px 10px;
    display: ${(props) => props.arrangementselector === "list" && "flex"};
    justify-content: ${(props) =>
      props.arrangementselector === "list" && "space-between"};
    width: ${(props) => props.arrangementselector === "list" && "58%"};
    align-items: center;

    .price-addCartBtn {
      display: flex;
      flex-direction: ${(props) =>
        props.arrangementselector === "list" && "column"};
      gap: 20px;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;

      button {
        background-color: transparent;
        padding: 5px;
        border: none;
        cursor: pointer;
        font-size: 18px;
      }
    }
  }
`;
