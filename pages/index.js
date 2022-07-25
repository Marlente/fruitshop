import { useState } from "react"

const fruits = [
  {name: "Mangosteen", price: 19, picture: "https://a.cdn-hotels.com/gdcs/production165/d1432/066a2dfb-de38-40d3-812b-6cf81c64341f.jpg"}, 
  {name: "Banana", price: 23, picture: "https://img.freepik.com/free-vector/vector-ripe-yellow-banana-bunch-isolated-white-background_1284-45456.jpg"},
  {name: "Pineapple", price: 39, picture: "https://static.libertyprim.com/files/familles/ananas-large.jpg?1569271716"},
  {name: "Dragonfruit", price: 34, picture: "https://cdn.shopify.com/s/files/1/0600/5650/2485/products/dragonfruit_red-1561282572637.jpg?v=1646225933&width=1946"},
  {name: "Lychee", price: 7, picture: "https://images.squarespace-cdn.com/content/v1/5d9aba8504a05a7cc222de1b/1577861273128-OG39CJ8SL7AISCIP1Z08/rambutan-inside.jpg?format=1000w"},
  {name: "SalakBali", price: 12, picture: "https://visitbali.id/images/data/2020/Feb/25/5e54d6b01859cf47d.jpeg"},
]




function Shelf ({fruits, onAddToCart}){

  return (<div>

    <div className="p-10 w-full bg-blue-100">
      <h1 className="text-3xl font-bold">Marlo's Fruitshop</h1>
      <h3 className="text-xl italic">As fresh as you can get them</h3>
    </div>

    {fruits.map((fruit) => {
      return (<div className="p-10 m-4 border-2 border-gray-700 rounded-lg inline-block"> 
        <div className="text-2xl font-bold">{fruit.name}</div>
        <div className="text-lg">Price: {fruit.price}$</div>
        <div className="w-80 h-80 bg-cover mt-2" style={{backgroundImage: `url(${fruit.picture})`}}></div>
        <button className="p-2 mt-4 bg-blue-500 rounded-lg text-white" onClick={() => {
          onAddToCart(fruit.name)
        }}>Add to cart</button>
      </div>
        )
    })}
  </div>)
}

function Cart ({cart, onAddToCart, onRemoveFromCart, onRemoveAllItems, onGetTotalPrice}){
  let totalPrice = 0
  totalPrice = onGetTotalPrice()
  return (
    <div className="p-10 m-4 border-2 border-gray-700 rounded-lg">
      <h1 className="text-2xl font-bold">Shoppingcart</h1>
      {Object.keys(cart).map((itemId) => {
        return (<div>
          <div className="flex">
            <p className="pr-4 font-xl">{itemId}</p>
            <p className="pr-2">Amount:</p>
            <p>{cart[itemId]}</p>
          </div>
          <div className="flex">
          <button className="p-2 m-2 bg-blue-500 rounded-lg text-white" onClick={() => {
          onAddToCart(itemId), totalPrice = onGetTotalPrice()
        }}>+1</button>
        <button className="p-2 m-2 bg-blue-500 rounded-lg text-white" onClick={() => {
          onRemoveFromCart(itemId), totalPrice = onGetTotalPrice()
        }}>-1</button>
        <button className="p-2 m-2 bg-blue-500 rounded-lg text-white" onClick={() => {
          onRemoveAllItems(itemId), totalPrice = onGetTotalPrice()
        }}>Remove All</button>
          </div>
        </div>
          )
      })}
      <p className="p-2 m-2 bg-blue-500 rounded-lg text-white">Total price: {totalPrice.toString()}$</p>
    </div>
  )

}



export default function Home() {
  const [cart, setCart] = useState({
      Mangosteen:0, Banana:0, Pineapple:0, Dragonfruit:0, Lychee:0, SalakBali:0
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
  const totalPrice  = () => {
    let priceFruits = 0
    for(let k in fruits){
      console.log(priceFruits)
      console.log(cart[fruits[k].name])
      console.log(fruits[k].price)
      priceFruits += cart[fruits[k].name] * fruits[k].price
        }
    console.log(priceFruits)
    return priceFruits
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
    onGetTotalPrice={totalPrice}
    />
  </div>)
}
