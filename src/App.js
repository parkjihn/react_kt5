import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css'; // Подключение стилей

const App = () => {
    const products = useSelector(state => state.products);
    const dispatch = useDispatch();

    const addProduct = () => {
        const name = prompt('Enter product name:');
        if (name) {
            const id = Date.now(); // Уникальный ID
            dispatch({ type: 'ADD_PRODUCT', id, name });
        }
    };

    return (
        <div className="container">
            <div className="header">Shopping Cart</div>
            <button onClick={addProduct}>Add Product</button>
            {products.map(product => (
                <div key={product.id} className="product">
                    <span className="product-name">{product.name}: {product.count}</span>
                    <div className="controls">
                        <button onClick={() => dispatch({ type: 'INCREMENT', id: product.id })}>+</button>
                        <button onClick={() => dispatch({ type: 'DECREMENT', id: product.id })}>-</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default App;
