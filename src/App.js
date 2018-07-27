import React from 'react';
import { Provider, connect} from 'react-redux'
import { createStore, combineReducers } from 'redux'
import allProducts from './products'

const vendingMachineReducer = (state = [], action) => {  
    switch (action.type) {
        case 'ADDPRODUCTS':
        debugger
            return [ ...allProducts ]
        case 'GETPRODUCTS':
            const newState = [ ...state ]
            const indexOfProductBought = newState.findIndex((product) => action.id === product.id)
            if (indexOfProductBought === -1) return state
            const productBougth = {
                ...newState[indexOfProductBought],
                bougth: true,
                count: newState[indexOfProductBought].count - 1
            }
            newState[indexOfProductBought] = productBougth
            return newState 
        
        default:
            return state;
    }
}

const addProduct = (event, dispatch) => {
    event.preventDefault()
    dispatch(
        {
            type: 'ADDPRODUCTS',
        }
    )
}

const getProduct = (event, dispatch) => {
    event.preventDefault()
    const id = event.target.elements.product.value;   
    dispatch(
        {
            type: 'GETPRODUCTS',
            id: id,
        }
    )
}

const refillProduct = (event, dispatch) => {
    event.preventDefault()
    dispatch(
        {
            type: 'REFILLPRODUCTS'
        }
    )
}

const Card = (props) => (   
    <div>
        <form onSubmit={(event) => getProduct(event, props.dispatch)}>
            <input type='text' name='product'/>
            <input type='submit' value='BUY'/>
            <button onClick={(event) => addProduct(event, props.dispatch)}>ADD PRODUCTS</button>
            
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
