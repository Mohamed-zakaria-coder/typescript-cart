import Data from "../data/products.json";
import React, { useState } from 'react';
import { product } from "./ProductType";

type ProductsProps = {
  filterProducts: product[]; // Assuming filterProducts is an array of Product objects
  setFilterProducts: React.Dispatch<React.SetStateAction<product[]>>; // Assuming setFilterProducts is a setter function for updating filterProducts
};

export default function Products({ filterProducts, setFilterProducts }: ProductsProps) {
  const [success, setSuccess] = useState(false);

  
  function handleCheck(): void {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  }
  
  function filteredItems(id: number) {
    const itemExists =  filterProducts.some((item: { id: number }) => item.id === id);
    console.log(itemExists)
    if (!itemExists) {
      const myItem: product[] = Data.products.filter((item) => item.id === id);
      setFilterProducts((prev: any) => [...prev, ...myItem]);
      
  
      // Add the filtered item to local storage
      const storedItems = localStorage.getItem('filteredItems');
      if (storedItems) {
        const parsedItems: product[] = JSON.parse(storedItems);
        localStorage.setItem('filteredItems', JSON.stringify([...parsedItems, ...myItem]));
      } else {
        localStorage.setItem('filteredItems', JSON.stringify(myItem));
      }
    }
  }
  

  return (
    <div className="products">
      {Data.products.map((product) => {
        return (
          <div className="product" key={product.id}>
            <img src={product.image} alt="product" />
            <h3>Name: {product.name}</h3>
            <div className="price">Price: {product.price}</div>
            <button
              onClick={() => {
                handleCheck();
                filteredItems(product.id);
              }}
              className="add-item"
            >
              Add Item
            </button>
            
          </div>
        );
      })}
      {success && (
        <div className="success-item">
          The Item Has Been Added <span className="check-sign">√</span>
        </div>
      )}
    </div>
  );
}
