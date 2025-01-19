// src/services/roleservice.js
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export const fetchAllowedTabs = async (role) => {
  if (!role) {
    return [];
  }

  try {
    const querySnapshot = await getDocs(collection(db, 'classes'));
    let allowedTabs = [];

    querySnapshot.forEach((doc) => {
      const classData = doc.data();
      if (classData.name === role || classData.role === role) {
        if (classData.roles && Array.isArray(classData.roles)) {
          allowedTabs = classData.roles;
        }
      }
    });

    return allowedTabs;
  } catch (error) {
    console.error('Erro ao buscar abas permitidas:', error);
    return [];
  }
};