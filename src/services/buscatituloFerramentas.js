// src/services/buscatituloFerramentas.js
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

// Função para retornar os títulos dos grupos
