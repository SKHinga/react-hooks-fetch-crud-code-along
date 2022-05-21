import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(()=>{
    const asyncFunction = async () => {
      const response = await fetch("http://localhost:4000/items");
      const data = await response.json()
      setItems(data);
    };
    asyncFunction()
  }, [])

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function bringChange(data){
    setItems([...items, data])
  }

  function handleAdd(data){
    const updatedItems = items.map(item => {
      if (item.id === data.id){
        return data;
      } else {
        return item;
      }
  });
    
    setItems(updatedItems);
  }

  function handleDeleted(data){
    const itemsDeleted = items.filter(item => item.id !== data.id);
    setItems(itemsDeleted);
  };

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm changes={bringChange} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} handAdd={handleAdd} handDelete={handleDeleted}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
