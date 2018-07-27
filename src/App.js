import React from 'react';
import { Provider, connect} from 'react-redux'
import { createStore, combineReducers } from 'redux'
import allProducts from './products'



const vendingMachineReducer = (state = [], action) => {  
    switch (action.type) {
        case 'ADDPRODUCTS':
            return [].concat(allProducts)
        case 'GETPRODUCTS':
            const newState = [].concat(state)
            const productBougth = newState.find((product) => action.id === product.id)
            if (!productBougth) return state
            productBougth.bougth =  true  
            return newState
        default:
            return state;
    }
}

const addProduct = (event, dispatch) => {
    event.preventDefault()
    dispatch({
        type: 'ADDPRODUCTS',
        
    })
}

const getProduct = (event, dispatch) => {
    event.preventDefault()
    const id = event.target.elements.product.value
    dispatch({
        type: 'GETPRODUCTS',
        id: id,
    })
}

const Card = (props) => (   
    <div>
        <form onSubmit={(event) => getProduct(event, props.dispatch)}>
            <input type='text' name='product'/>
            <input type='submit' value='BUY'/>
            <button onClick={(event) => addProduct(event, props.dispatch)}>REFILL</button>
        </form> 
        <ul>
            {
                props.products.map(p => (
                    <li>
                        <p>{p.product}</p>
                    </li>
                ))
            }            
        </ul>
    </div>
)

const getActualState = (actualState => {
return {
    products: actualState.vendingMachine,
    }
})

const Cart = connect(getActualState)(Card)

const store = createStore(combineReducers({
    vendingMachine: vendingMachineReducer,
}),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default () => (
    <Provider store={store}>
        <Cart/>
    </Provider>
)