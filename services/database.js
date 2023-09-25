import { firestore } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export const saveTrainingCard = async (userId, trainingCard) => {
    try {
        await addDoc(collection(firestore, 'trainingCards'), {
            userId,
            ...trainingCard,
            createdAt: serverTimestamp()
        });
    } catch (error) {
        console.error("Errore durante il salvataggio della scheda:", error);
    }
};
