import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useCurrentUser from '../hooks/useCurrentUser';
import { saveTrainingCard } from '../services/saveTrainingCard';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const TrainingModal = ({ open, onClose }) => {
    const user = useCurrentUser();
    const [step, setStep] = useState(1);
    const [trainingName, setTrainingName] = useState('');
    const [workoutName, setWorkoutName] = useState(''); // Nome dell'allenamento specifico
    const [allWorkouts, setAllWorkouts] = useState([]); // Lista di tutti gli allenamenti

    const handleNext = () => {
        if (step === 2) {
            const newWorkout = {
                name: workoutName,
                exercises: currentExercises
            };
            setAllWorkouts(prev => [...prev, newWorkout]);
            setWorkoutName('');
            setCurrentExercises([]);
        } else {
            setStep(step + 1);
        }
    };


    const handlePrev = () => {
        if (step > 1) setStep(step - 1);
    };
    const [currentExercises, setCurrentExercises] = useState([]);

    const [currentExercise, setCurrentExercise] = useState({
        name: '',
        repetitions: '',
        recovery: '',
        weight: '',
    });
    

    const addExercise = () => {
        if (currentExercise.name.trim()) {  // Assicurati che il nome dell'esercizio non sia vuoto
            setCurrentExercises(prev => [...prev, currentExercise]);
            setCurrentExercise({
                name: '',
                repetitions: '',
                recovery: '',
                weight: '',
                feeling: ''
            });
        }
    };
    
    
    const saveCompleteTraining = async () => {
        const trainingCard = {
            trainingName: trainingName,
            workouts: allWorkouts
        };
    
        if (user) {
            const result = await saveTrainingCard(user.uid, trainingCard);
            if (result.success) {
                console.log("Scheda di allenamento salvata con successo!");
                // Resetta lo stato
                setTrainingName('');
                setAllWorkouts([]);
                setCurrentExercises([]);
                setStep(1);
                onClose();  // chiudi il modale
                window.location.reload();  // Ricarica la pagina
            } else {
                console.error("Si è verificato un errore durante il salvataggio della scheda di allenamento:", result.error);
            }
        } else {
            console.error("Utente non connesso. Impossibile salvare la scheda di allenamento.");
        }
    };
    

    const removeExercise = (index) => {
    const updatedExercises = [...currentExercises];
    updatedExercises.splice(index, 1);
    setCurrentExercises(updatedExercises);
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', boxShadow: 24, }}
            className="bg-white p-4 w-80 rounded-xl">
                {step === 1 && (
                    <div>
                        <Typography className='text-l'>Nome della scheda di allenamento</Typography>
                        <TextField variant="standard" label="Nome scheda" value={trainingName} onChange={e => setTrainingName(e.target.value)} className='mt-4' />
                        <button onClick={handleNext} className='mt-16 ml-10 text-blue-500 bg-[#f5f5f5] rounded-xl text-[14px] font-bold capitalize'>Avanti</button>
                    </div>
                )}
                {step === 2 && (
                    <div>
                        <Typography className='text-l font-bold'>Nome Allenamento</Typography>
                        <TextField label="Nome Allenamento" variant="standard" value={workoutName} onChange={e => setWorkoutName(e.target.value)} />

                        {allWorkouts.map((workout, idx) => (
                            <div key={idx}>
                                <Typography className='text-l' variant="standard">Allenamento {workout.name}</Typography>
                                {workout.exercises.map((exercise, eIdx) => (
                                    <Typography key={eIdx} variant="body2">{exercise.name} - ...</Typography>
                                ))}
                            </div>
                        ))}
            
                        <div>
                                <Typography className='text-l mt-8 font-bold'>Aggiungi esercizi alla tua scheda</Typography>
                                
                                <TextField 
                                    label="Esercizio" 
                                    value={currentExercise.name} 
                                    onChange={e => setCurrentExercise(prev => ({ ...prev, name: e.target.value }))}
                                    variant="standard"
                                />

                                <TextField 
                                    label="Ripetizioni" 
                                    value={currentExercise.repetitions} 
                                    onChange={e => setCurrentExercise(prev => ({ ...prev, repetitions: e.target.value }))}
                                    variant="standard"
                                />


                                <TextField 
                                    label="Recupero" 
                                    value={currentExercise.recovery} 
                                    onChange={e => setCurrentExercise(prev => ({ ...prev, recovery: e.target.value }))}
                                    variant="standard"
                                />

                                <TextField 
                                    label="Peso (kg)" 
                                    value={currentExercise.weight} 
                                    onChange={e => setCurrentExercise(prev => ({ ...prev, weight: e.target.value }))}
                                    variant="standard"
                                />

                                <Button onClick={addExercise} className='mt-8 text-blue-500 bg-[#f5f5f5] text-[14px] font-bold capitalize'>Aggiungi Esercizio</Button>
                            <ul className='bg-[#f5f5f5] p-2 rounded-lg mt-4'>
                                {currentExercises.map((exercise, idx) => (
                                    <li key={idx} className='text-[14px] flex items-center gap-2' >
                                        {exercise.name} - {exercise.repetitions} - {exercise.recovery} - {exercise.weight} kg
                                        <Button className=' text-red-600 text-[12px] font-bold capitalize' onClick={() => removeExercise(idx)}>Rimuovi</Button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    <div className='flex justify-between'>
                        <Button onClick={handlePrev} className='mt-8 text-blue-500'><ArrowBackIosIcon fontSize='medium' /></Button>
                        <Button onClick={handleNext} className='mt-8 text-blue-500 text-[12px] font-bold capitalize'>Aggiungi allenamento</Button>
                        <Button onClick={saveCompleteTraining} className='mt-8 text-blue-500 text-[12px] font-bold capitalize'>Salva Scheda</Button>
                    </div>
                </div>
                )}
            </Box>
        </Modal>
    );
}

export default TrainingModal;




