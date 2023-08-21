
import { useState } from "react";
import { product } from "./ProductType";

type setFilter = {
  setFilterProducts: React.Dispatch<React.SetStateAction<product[]>>; // Assuming setFilterProducts is a setter function for updating filterProducts

}

export default function Cart({setFilterProducts}: setFilter) {
  const cartFromLocal: string | null = localStorage.getItem("filteredItems");
  const [parsingCartItems, setParsingCartItems] = useState<product[]>(cartFromLocal ? JSON.parse(cartFromLocal) : [])
  
  function deleteItem(id: number): void{
  let updatedItem = parsingCartItems.filter(product => product.id !== id)
  setParsingCartItems(updatedItem)
  setFilterProducts(updatedItem)
    localStorage.setItem("filteredItems", JSON.stringify(updatedItem))
  }
  function increaseQuantity(id: number): void {
    const updatedItems = parsingCartItems.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          quantity: product.quantity + 1,
        };
      }
      return product;
    });
  
    setParsingCartItems(updatedItems);
    setFilterProducts(updatedItems);
    localStorage.setItem("filteredItems", JSON.stringify(updatedItems));
  }
  function decreaseQuantity(id: number):void{
    let updatedItems = parsingCartItems.map(product => {
      if(product.id === id  && product.quantity > 1){
        return {
          ...product,
          quantity: product.quantity - 1 
        }
      }
      return product
    })
    setFilterProducts(updatedItems)
    setParsingCartItems(updatedItems)
    localStorage.setItem("filteredItems", JSON.stringify(updatedItems))

  }

  return (
    <div className='cart-parent'>
      {parsingCartItems.length > 0 && <table>
        <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Delete</th>
          <th>Quantity</th>
        </tr>
        </thead>
        <tbody>
      {parsingCartItems && parsingCartItems.map((product: product) => (
        <tr key={product.id}>
          <td>
            <img src={product.image} alt="product" />
          </td>
          <td>
            {product.name}
          </td>
          <td>
            {product.price * product.quantity}
          </td>
          <td>
            <button className="delete-item" onClick={() => deleteItem(product.id)}>Delete</button>
          </td> 
          <td>
            <button className="plus-item" onClick={() => increaseQuantity(product.id)}>+</button>
            <span className="product-quantity">{product.quantity}</span>
            <button className="minus-item" onClick={() => decreaseQuantity(product.id)}>-</button>

          </td>
        </tr>
      ))}
      </tbody>
      </table>}
    </div>
  );
}
