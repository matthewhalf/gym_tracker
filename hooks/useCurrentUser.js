import { useState, useEffect } from 'react';
import { auth } from '../lib/firebase';

const useCurrentUser = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
            }
        });

        // Pulizia alla dismount
        return () => unsubscribe();
    }, []);

    return user;
};

export default useCurrentUser;


