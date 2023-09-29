import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import { Fab } from '@mui/material';
import TrainingModal from './TrainingModal';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from "../services/auth";
import { useRouter } from 'next/router';

const BottomAppbar = () => {
    const StyledFab = styled(Fab)({
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    });
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const router = useRouter();

    const handleLogout = async () => {
    await signOut();
    router.push('/');
  };    

  return (
    <>
    <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
            <StyledFab className='bg-[#f5f5f5]' aria-label="add" onClick={handleOpen}>
                <AddIcon className='text-blue-500'  /> 
            </StyledFab>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton className='bg-[#f5f5f5]' onClick={handleLogout}>
            <LogoutIcon className='text-blue-500' />
            </IconButton >
        </Toolbar>
    </AppBar>


    <TrainingModal open={open} onClose={handleClose} />
    </>
  )
}

export default BottomAppbar
