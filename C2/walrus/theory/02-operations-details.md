## Gas Costs per Operations

### Storage Resources cost (in WAL)

A **storage resource** is what you need in order to store a blob in Walrus.

A storage resource defines:
- **How much data** you can store (capacity)
- **How long** that data can be stored (epoch duration)

### How do you get a storage resource?
You have a few options:
- **Buy one from the Walrus system contract**, as long as there is free space available, by paying WAL
- **Receive one from another party**
- **Split a larger resource** into smaller ones if you previously bought more capacity than you need

---

### File storage cost (in WAL)

The cost of storing a blob is **not based on the raw file size** you upload.

Instead, Walrus uses the **encoded size** of the blob, which includes:
- The blob after **erasure coding** (about **5× larger** than the original file)
- A **fixed amount of metadata**, which is independent of the blob’s size

Why does this matter?
- The per-blob metadata can be **quite large (up to ~64 MB)**
- For **small blobs (under ~10 MB)**, this metadata dominates the cost
- For **larger blobs**, the actual data size becomes the main cost driver

In short:
- Small blobs are expensive *relative to their size*
- Large blobs scale more efficiently

This cost is in **WAL**.

---

### File upload cost (in WAL)

When you register (upload) a blob, Walrus charges some **WAL** upfront.

This WAL covers the **cost of uploading the data** and is important for system sustainability:
- It ensures that deleting a blob and reusing the same storage resource later does not create hidden costs
- It keeps the system fair and balanced over time

You can think of this as paying a small “handling fee” each time new data is uploaded.

---

### Sui Blockchain costs (in SUI)

Storing a blob involves **up to three on-chain transactions** on Sui:

1. **Acquire a storage resource**
2. **Register the blob**
   - This step may be combined with the first transaction
   - The blob is assigned a unique **blob ID**
3. **Certify the blob**
   - Confirms that the blob is available and properly stored

Each of these transactions consumes **SUI**.

### Sui blockchain Storage Rebate (SUI refund)
Just as mentioned in the `sui` part of this module, freeing data from the blockchain gives a refund to the user in SUI.  
The same happens when burning a Blob in Walrus.  
When a blob is burned, its data will be freed from the Sui Blockchain, although still remaining on Walrus.
