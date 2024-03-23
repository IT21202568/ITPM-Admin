// services/inventoryService.js
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const inventoryCollectionRef = collection(db, "inventory");

// Create a new inventory item
const addInventoryItem = async (newItem) => {
  await addDoc(inventoryCollectionRef, newItem);
};

// Read inventory items
const getInventoryItems = async () => {
  const data = await getDocs(inventoryCollectionRef);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

// Update an inventory item
const updateInventoryItem = async (id, updatedItem) => {
  const itemDoc = doc(db, "inventory", id);
  await updateDoc(itemDoc, updatedItem);
};

// Delete an inventory item
const deleteInventoryItem = async (id) => {
  const itemDoc = doc(db, "inventory", id);
  await deleteDoc(itemDoc);
};

export {
  addInventoryItem,
  getInventoryItems,
  updateInventoryItem,
  deleteInventoryItem,
};
