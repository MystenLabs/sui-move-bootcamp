export const CONFIG = {
    app: {
        network: import.meta.env.VITE_NETWORK,
        salt: import.meta.env.VITE_SALT,
        ephemeralKeyDuration: Number(import.meta.env.VITE_EPHEMERAL_KEY_DURATION_EPOCHS)
    },
    oauth: {
        providerName: import.meta.env.VITE_OAUTH_PROVIDER_NAME,
        clientId: import.meta.env.VITE_OAUTH_CLIENT_ID,
        url: "" // set by the app depending on provider
    },
}

