import React, { useState } from "react";
import axios from "axios";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { TextField, Button } from "@mui/material";

const AddItem = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleImageUpload = (file) => {
    if (!file) return;

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Optional: handle progress
      },
      (error) => {
        console.error("Error uploading file:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = { name, category, imageUrl };

    try {
      await axios.post("/api/items", newItem, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log("Item added successfully");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Item Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        label="Category"
        variant="outlined"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <input
        type="file"
        onChange={(e) => {
          setImage(e.target.files[0]);
          handleImageUpload(e.target.files[0]);
        }}
      />
      <Button variant="contained" type="submit">
        Add Item
      </Button>
    </form>
  );
};

export default AddItem;
