import { useState } from "react"

const fruits = [{name: "Mango", price: 42, picture: "https://images.immediate.co.uk/production/volatile/sites/30/2018/08/mango-fee0d79-e1648560084294.jpg?quality=90&resize=768,574"}, 
{name: "Banana", price: 21, picture: "https://img.freepik.com/free-vector/vector-ripe-yellow-banana-bunch-isolated-white-background_1284-45456.jpg"}]




function Shelf ({fruits, onAddToCart}){
  return (<div>
    {fruits.map((fruit) => {
      return (<div className="p-10 m-5 border-2 border-gray-700 rounded-lg inline-block"> 
        <div className="text-2xl font-bold">{fruit.name}</div>
        <div className="text-lg">Price: {fruit.price}</div>
        <div className="w-80 h-80 bg-cover" style={{backgroundImage: `url(${fruit.picture})`}}></div>
        <button className="p-2 m-2 bg-blue-500 rounded-lg text-white" onClick={() => {
          onAddToCart(fruit.name)
        }}>Add to cart</button>
      </div>
        )
    })}
  </div>)
}

function Cart ({cart, onAddToCart, onRemoveFromCart, onRemoveAllItems}){

  return (
    <div className="p-10 m-5 border-2 border-gray-700 rounded-lg">
      <h1 className="text-xl font-bold">Cart</h1>
      {Object.keys(cart).map((itemId) => {
        return (<div>
          <div>
            {itemId}
            {cart[itemId]}
          </div>
          <div className="flex">
          <button className="p-2 m-2 bg-blue-500 rounded-lg text-white" onClick={() => {
          onAddToCart(itemId)
        }}>+1</button>
        <button className="p-2 m-2 bg-blue-500 rounded-lg text-white" onClick={() => {
          onRemoveFromCart(itemId)
        }}>-1</button>
        <button className="p-2 m-2 bg-blue-500 rounded-lg text-white" onClick={() => {
          onRemoveAllItems(itemId)
        }}>Remove All</button>
          </div>
          
        </div>
          )
      })}
    </div>
  )

}



export default function Home() {
  const [cart, setCart] = useState({
      Mango:0, Banana:0
  })
  const addItem = (itemId) => {
    setCart({...cart, [itemId]: cart[itemId] + 1})
  }
  const removeItem = (itemId) => {
    setCart({...cart, [itemId]: cart[itemId] - 1})
  }
  const removeAllItems = (itemId) => {
    setCart({...cart, [itemId]: 0})
  }

  return (
  <div> 
    <Shelf 
    fruits={fruits} 
    onAddToCart={addItem}
    /> 
    <Cart 
    cart={cart} 
    onAddToCart={addItem} 
    onRemoveFromCart={removeItem}
    onRemoveAllItems={removeAllItems}
    />
  </div>)
}
