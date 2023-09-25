import '@/styles/globals.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Prompt, sans-serif',  },
  palette: {
    primary: {
      light: '#757ce8',
      main: '#111',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

function MyApp({ Component, PageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...PageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
