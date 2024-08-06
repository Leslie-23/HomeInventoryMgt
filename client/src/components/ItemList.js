import React, { useEffect, useState } from "react";
import axios from "axios";

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/items", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  return (
    <div>
      <h2>Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <p>Name: {item.name}</p>
            <p>Category: {item.category}</p>
            {item.imageUrl && <img src={item.imageUrl} alt={item.name} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
