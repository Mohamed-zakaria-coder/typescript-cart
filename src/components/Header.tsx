import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { product } from "./ProductType";


type HeaderProps = {
  filterProducts: product[];
};

export default function Header({filterProducts}: HeaderProps) {

  const location = useLocation();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);

  useEffect(() => {
    const cartFromLocal: string | null = localStorage.getItem("filteredItems");
    if (cartFromLocal) {
      try {
        const parsedItems = JSON.parse(cartFromLocal);
        const newTotalPrice = parsedItems.reduce(
          (acc: number, product: product) => {
            if (typeof product.price === "number") {
              return (acc + (product.price * product.quantity)) ;
            } else {
              return acc;
            }
          },
          0
        );
        setTotalPrice(newTotalPrice);
        console.log(totalPrice)
        console.log("Total Price:", newTotalPrice);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    } else {
      console.log("No data found in localStorage");
    }
  }, [filterProducts, totalPrice]);
  useEffect(() => {
    const cartFromLocal: string | null = localStorage.getItem("filteredItems");
    if(cartFromLocal){
      try {
        const parsedItems = JSON.parse(cartFromLocal);
        const totalQuantity = parsedItems.reduce((curr: number, acc: product) => {
          if(typeof curr === "number"){
            return curr + acc.quantity
          }
        }, 0)
        setTotalQuantity(totalQuantity)
      } catch (err){
        console.log(err)
      }

    }
  }, [totalQuantity, filterProducts])
  let isCartLocation = location.pathname === "/cart";

  return (
    <div className="header">
      <h1>Shop.Co</h1>
      <div className="products-info">
        <div>Total Items: {totalQuantity} </div>
        <div>Total Price: {totalPrice}</div> 
        {isCartLocation ? (
          <Link to="/">
            <button>View Home</button>
          </Link>
        ) : (
          <Link to="/cart">
            <button>View Cart</button>
          </Link>
        )}
      </div>
    </div>
  );
}
