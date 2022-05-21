import React from "react";

function Item({ item, handAdd, handDelete }) {

  function handleAddition(){
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({isInCart: !item.isInCart}),
    }).then(resp=>resp.json()).then(data=>handAdd(data))
  }

  function handleDelete(id){
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE"
    }).then(r=>r.json()).then(()=>handDelete(item))

  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"} onClick={handleAddition}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default Item;
