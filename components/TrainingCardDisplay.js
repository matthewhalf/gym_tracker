import React, { useState, useEffect } from 'react';
import { firestore } from "../lib/firebase"; // Importa la configurazione di Firebase
import { doc, getDoc, setDoc } from "firebase/firestore"; // Importa le funzioni necessarie da Firestore
import useCurrentUser from '../hooks/useCurrentUser'; // Importa l'hook useCurrentUser
import { Button, TextField, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';


const TrainingCardDisplay = () => {
    const [trainingCard, setTrainingCard] = useState(null);
    const user = useCurrentUser(); // Ottieni l'utente corrente
    const [isEditing, setIsEditing] = useState(false);
      // 1. Stato per conservare solo i pesi precedenti.
    const [previousWeights, setPreviousWeights] = useState({});


    const handleSave = async () => {
        const trainingCardRef = doc(firestore, 'trainingCards', user.uid);
        await setDoc(trainingCardRef, trainingCard, { merge: true });
        setIsEditing(false);
    };


    const toggleEditing = () => {
        if (isEditing) {
            const restoredCard = {...trainingCard};
    
            restoredCard.workouts.forEach((workout, wIdx) => {
                workout.exercises.forEach((exercise, eIdx) => {
                    const weightKey = `${wIdx}-${eIdx}`;
                    if (previousWeights[weightKey]) {
                        exercise.weight = previousWeights[weightKey];
                    }
                });
            });
    
            setTrainingCard(restoredCard);
        } else {
            const currentWeights = {};
    
            trainingCard.workouts.forEach((workout, wIdx) => {
                workout.exercises.forEach((exercise, eIdx) => {
                    const weightKey = `${wIdx}-${eIdx}`;
                    currentWeights[weightKey] = exercise.weight;
                });
            });
    
            setPreviousWeights(currentWeights);
        }
        setIsEditing(!isEditing);
    };
    

    const handleExerciseChange = (workoutIdx, exerciseIdx, field) => e => {
        const updatedCard = {...trainingCard};
        updatedCard.workouts[workoutIdx].exercises[exerciseIdx][field] = e.target.value;
        setTrainingCard(updatedCard);
    };
    
    

    useEffect(() => {
        const fetchTrainingCard = async () => {
            if (user) {
                const docRef = doc(firestore, 'trainingCards', user.uid);
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    setTrainingCard(docSnap.data());
                } else {
                    console.log("Nessun documento corrispondente!");
                }
            }
        };

        fetchTrainingCard();
    }, [user]); // Esegui l'effetto quando l'utente cambia

    if (!trainingCard) return <p>Nessuna scheda di allenamento salvata.</p>;

    return (
        <div>
            <h6 className='capitalize m-6 font-bold'>{trainingCard.trainingName}</h6>
            {trainingCard.workouts.map((workout, wIdx) => (
                <div key={wIdx} className='bg-white shadow-lg p-2 text-center m-6 overflow-y-auto rounded-lg '>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Esercizio</TableCell>
                                <TableCell>Reps</TableCell>
                                <TableCell>Rec</TableCell>
                                <TableCell>Peso</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {workout.exercises.map((exercise, eIdx) => {
                                const weightKey = `${wIdx}-${eIdx}`;
                                const previousWeight = previousWeights[weightKey];
    
                                return (
                                    <TableRow key={eIdx}>
                                        <TableCell>
                                            {isEditing 
                                                ? <TextField variant='standard' value={exercise.name} onChange={handleExerciseChange(wIdx, eIdx, "name")}/> 
                                                : exercise.name}
                                        </TableCell>
                                        <TableCell>
                                            {isEditing 
                                                ? <TextField variant='standard' value={exercise.repetitions} onChange={handleExerciseChange(wIdx, eIdx, "repetitions")}/> 
                                                : exercise.repetitions}
                                        </TableCell>
                                        <TableCell>
                                            {isEditing 
                                                ? <TextField variant='standard' value={exercise.recovery} onChange={handleExerciseChange(wIdx, eIdx, "recovery")}/> 
                                                : exercise.recovery}
                                        </TableCell>
                                        <TableCell style={{
                                        color: previousWeight 
                                                ? exercise.weight > previousWeight ? 'green' 
                                                : exercise.weight < previousWeight ? 'red' 
                                                : 'black'
                                                : 'black'
                                        }}>
                                        {isEditing 
                                            ? <TextField variant='standard' value={exercise.weight} onChange={handleExerciseChange(wIdx, eIdx, "weight")}/> 
                                            : <span>
                                                {exercise.weight} kg 
                                                {previousWeight && exercise.weight !== previousWeight && 
                                                    <span style={{fontSize: '0.8rem'}}>
                                                        ({exercise.weight > previousWeight ? '+' : ''}{exercise.weight - previousWeight})
                                                    </span>
                                                }
                                            </span>
                                        }
                                    </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            ))}
            <div className='m-6'>
                <Button className='bg-gray-100 text-blue-500 mr-4' onClick={toggleEditing}>
                 {isEditing ? "Annulla" : "Modifica"}
                </Button>
                {isEditing && <Button className='bg-gray-100 text-blue-500' onClick={handleSave}>Salva modifiche</Button>}
            </div>
        </div>
    );    
}     

export default TrainingCardDisplay;
