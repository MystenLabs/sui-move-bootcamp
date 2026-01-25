import Router from './Router';
import { AppProvider } from './contexts/AppContext';
import { ToastContainer } from 'react-toastify';
import { useOauthPopup } from './hooks/useOauthPopup';

function App() {
  const isPopup = useOauthPopup();
  // If this is a popup window, don't render the full app
  if (isPopup) {
    return <div>Processing OAuth callback...</div>;
  }

  return (
    <AppProvider>
      <ToastContainer />
      <Router />
    </AppProvider>
  )
}

export default App
