import React, { useState } from "react";

function ItemForm({ changes }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");


  function handleSubmition(e) {
    e.preventDefault();
    fetch("http://localhost:4000/items", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        "name": name,
        "category": category,
        "isInCart": false
      })
    }).then(resp=>resp.json()).then(data=>changes(data));
    setName("")
  }

  return (
    <form className="NewItem" onSubmit={handleSubmition}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;
