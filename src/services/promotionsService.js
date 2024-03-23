// services/promotionsService.js
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const promotionsCollectionRef = collection(db, "promotions");

// Create a new promotion
const addPromotion = async (newPromotion) => {
  await addDoc(promotionsCollectionRef, newPromotion);
};

// Read promotions
const getPromotions = async () => {
  const data = await getDocs(promotionsCollectionRef);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

// Update a promotion
const updatePromotion = async (id, updatedPromotion) => {
  const promotionDoc = doc(db, "promotions", id);
  await updateDoc(promotionDoc, updatedPromotion);
};

// Delete a promotion
const deletePromotion = async (id) => {
  const promotionDoc = doc(db, "promotions", id);
  await deleteDoc(promotionDoc);
};

export { addPromotion, getPromotions, updatePromotion, deletePromotion };
