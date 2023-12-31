import BottomAppbar from '../components/BottomAppbar';
import TrainingCardDisplay from '../components/TrainingCardDisplay';
import useCurrentUser from "../hooks/useCurrentUser";
import { Typography } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';


export default function Index() {
  const user = useCurrentUser();

  return (
    <>
    <div>
      <div>
          {user ? (
            <>
            <div className='p-4 m-4 bg-gray-200 rounded-xl shadow-lg'>
            <h1 className='text-[20px] font-bold'>Ciao, {user.displayName} <FitnessCenterIcon fontSize='small' /> </h1>
            <Typography className='font-bold text-[14px] mt-4'>Pronto per il tuo workout ?</Typography>
            </div>
            </>
            ) : (
              <Typography>Effettua l'accesso per iniziare.</Typography>
          )}
        </div>
        <TrainingCardDisplay />
        <div className='h-[60px]'></div>
        <BottomAppbar />
    </div>
    </>
  );
}
