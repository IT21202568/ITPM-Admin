import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const categoryCollectionRef = collection(db, "categories");

// Create a new category
const addCategory = async (newCategory) => {
  await addDoc(categoryCollectionRef, newCategory);
};

// Read categories
const getCategories = async () => {
  const data = await getDocs(categoryCollectionRef);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

// Update a category
const updateCategory = async (id, updatedCategory) => {
  const categoryDoc = doc(db, "categories", id);
  await updateDoc(categoryDoc, updatedCategory);
};

// Delete a category
const deleteCategory = async (id) => {
  const categoryDoc = doc(db, "categories", id);
  await deleteDoc(categoryDoc);
};

export { addCategory, getCategories, updateCategory, deleteCategory };
