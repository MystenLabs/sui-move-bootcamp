import { useEffect } from 'react';

// Hook for OAuth redirect, as we are using a Popup window for OAuth flow; uses "window.opener" to send the token back to the parent window
export const useOauthPopup = () => {
  useEffect(() => {
    if (window.opener && window.location.hash) {
      try {
        // Extract the ID token from the URL hash (e.g. "id_token=eyJhbGciOiJSUzI1NiI...")
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const idToken = hashParams.get('id_token');
        
        if (idToken) {
          console.log('OAuth JWT token found in popup:', idToken);
          
          // Send the token back to the parent window
          window.opener.postMessage({
            type: 'GOOGLE_TOKEN',
            token: idToken
          }, window.location.origin);
          
          // Close the popup
          window.close();
        } else {
          console.error('No ID token found in URL hash');
        }
      } catch (error) {
        console.error('Error processing OAuth callback:', error);
      }
    }
  }, []);

  // Return whether this is a popup window
  return !!window.opener;
};
