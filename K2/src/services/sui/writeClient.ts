type TransactionSigner = {
  signTransaction(bytes: Uint8Array): Promise<{
    bytes: string;
    signature: string;
  }>;
};

export const suiWriteClient = {
  async buildAndSignTransfer(
    sender: string,
    recipientAddress: string,
    amountMist: number,
    signer: TransactionSigner
  ) {
    void sender;
    void recipientAddress;
    void amountMist;
    void signer;
    // TODO
    // Step 1: Fetch sender coin objects from gRPC (core.getCoins) and fetch reference gas price.
    // Step 2: Select a gas coin (commonly the largest balance coin) and guard if no gas coin is found.
    // Step 3: Create a Transaction and configure sender/gas:
    //   - tx.setSender(sender)
    //   - tx.setGasOwner(sender)
    //   - tx.setGasBudget(...)
    //   - tx.setGasPrice(...)
    //   - tx.setGasPayment([{ objectId, version, digest }])
    // Step 4: Split gas coin into transfer coin:
    //   - const [coin] = tx.splitCoins(tx.gas, [amountMist])
    // Step 5: Transfer split coin to recipient:
    //   - tx.transferObjects([coin], recipientAddress)
    // Step 6: Build tx bytes and sign with ephemeral signer:
    //   - const txBytes = await tx.build()
    //   - return signer.signTransaction(txBytes)
    throw new Error("Not Implemented: buildAndSignTransfer");
  },

  async executeZkLoginTransaction(transactionBytes: string, signature: string) {
    void transactionBytes;
    void signature;
    // TODO
    // Step 1: Convert base64 strings into byte arrays (bcs payloads) for:
    //   - transactionBytes
    //   - zkLogin signature
    // Step 2: Call gRPC execute endpoint:
    //   - suiGrpcClient.transactionExecutionService.executeTransaction({...})
    // Step 3: Shape payload with transaction + signatures in expected BCS format.
    // Step 4: Return the inner response object:
    //   - return response.response
    throw new Error("Not Implemented: executeZkLoginTransaction");
  },
};
