import { NextUIProvider } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import AppLayout from './components/AppLayout';

function App() {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <AppLayout />
    </NextUIProvider>
  );
}

export default App;
