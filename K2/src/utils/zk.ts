// Helper function to convert bytes to base64 (browser-compatible)
const bytesToBase64 = (bytes: Uint8Array): string => {
  return btoa(String.fromCharCode(...bytes));
};

// Helper function to convert hex string to base64
const hexToBase64 = (hex: string): string => {
  const bytes = new Uint8Array(hex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
  return bytesToBase64(bytes);
};

// Helper function to convert big integer to exactly 16 bytes then base64
const saltToBase64 = (saltString: string): string => {
  // Convert the salt to a 128-bit (16-byte) representation
  const saltBigInt = BigInt(saltString);
  const hex = saltBigInt.toString(16).padStart(32, '0'); // 32 hex chars = 16 bytes
  return hexToBase64(hex);
};

// Helper function to convert randomness to base64 (ensure proper 16-byte encoding)
const randomnessToBase64 = (randomnessString: string): string => {
  // Convert randomness to exactly 16 bytes (128 bits)
  const randomnessBigInt = BigInt(randomnessString);
  const hex = randomnessBigInt.toString(16).padStart(32, '0'); // 32 hex chars = 16 bytes
  return hexToBase64(hex);
};

/**
 * Get ZK proof from Mysten Labs' proving service
 * Based on: https://docs.sui.io/guides/developer/cryptography/zklogin-integration#call-the-mysten-labs-maintained-proving-service
 */
export async function fetchZkProof(
  payload: any
) {
  try {
    // Call Mysten Labs' hosted proving service
    const response = await fetch('https://prover-dev.mystenlabs.com/v1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Proving service error: ${response.status} ${response.statusText}. Response: ${errorText}`);
    }

    const zkProof = await response.json();
    
    return zkProof;
  } catch (error) {
    
    // If it's a network error, provide helpful guidance
    if ((error as any).message.includes('Failed to fetch')) {
      throw new Error(
        'ZK proof generation failed: Network error. This could be due to:\n' +
        '1. CORS policy blocking the request\n' +
        '2. Mysten Labs proving service being unavailable\n' +
        '3. Network connectivity issues\n\n' +
        'For production apps, consider:\n' +
        '- Using a backend proxy to call the proving service\n' +
        '- Running your own proving service\n' +
        '- Using third-party services like Shinami'
      );
    }
    
    throw new Error(`ZK proof generation failed: ${(error as any).message}`);
  }
}

// Export the converter functions for use in other files
export { bytesToBase64, hexToBase64, saltToBase64, randomnessToBase64 };
