import { firestore } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export const saveTrainingCard = async (userId, trainingCard) => {
    const trainingCardRef = doc(firestore, 'trainingCards', userId);
    try {
        await setDoc(trainingCardRef, trainingCard);
        return { success: true };
    } catch (error) {
        console.error("Errore durante il salvataggio della scheda:", error);
        return { success: false, error };
    }
};
