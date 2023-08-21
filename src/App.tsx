import './App.css';
import Header from './components/Header';
import Products from './components/Products';
import Cart from './components/Cart';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { product } from './components/ProductType';



function App() {
  
  const [filterProducts, setFilterProducts] = useState<product[]>([]);

  return ( 
    <div className="App"> 
        <Header filterProducts={filterProducts} />
        <hr />
        <Routes>
          <Route path='/' element= {<Products filterProducts={filterProducts} setFilterProducts={setFilterProducts} />} />
          <Route path='/cart' element= {<Cart setFilterProducts={setFilterProducts}/>} />
        </Routes>
        <Footer />
    </div> 
  );
}

export default App;
