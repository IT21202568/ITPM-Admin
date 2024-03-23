import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const orderCollectionRef = collection(db, "orders");

// Create a new order
const addOrder = async (newOrder) => {
  await addDoc(orderCollectionRef, newOrder);
};

// Read orders
const getOrders = async () => {
  const data = await getDocs(orderCollectionRef);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

// Update an order
const updateOrder = async (id, updatedOrder) => {
  const orderDoc = doc(db, "orders", id);
  await updateDoc(orderDoc, updatedOrder);
};

// Delete an order
const deleteOrder = async (id) => {
  const orderDoc = doc(db, "orders", id);
  await deleteDoc(orderDoc);
};

export { addOrder, getOrders, updateOrder, deleteOrder };
