## Optimizing Costs in Walrus

Walrus does a solid job by default, but if you’re pushing a lot of data (or a ton of tiny blobs), costs can creep up. The tips below are basically “things that hurt once you scale” and how to avoid them.

## TL;DR (read this if nothing else)

- Lots of small blobs? **Use Quilt**
- Don’t buy storage one blob at a time — **buy in bulk**
- **Bundle stuff into PTBs**
- Delete blobs early and **reuse storage**
- Batch blob registration + certification
- Burn blob objects when you’re done with them

## Storage Cost Tricks

### Quilt is your best friend for small blobs

If you’re storing lots of small files, **Walrus Quilt** is almost always the right move.

It packs multiple blobs together so you’re not paying metadata costs per blob. This usually saves:
- Walrus storage fees
- Sui compute and storage costs

If your blobs are small, start here.

### Buy storage in chunks, not crumbs

Every time you buy storage, you hit a shared system contract on Sui. That’s not cheap.

Instead of constantly buying tiny bits of storage, **buy bigger chunks upfront** (more space, longer duration). You can always split or merge them later to fit your needs — and you’ll burn way less gas overall.

### PTBs everywhere

If you’re doing multiple things, don’t send multiple transactions.

Use **programmable transaction blocks (PTBs)** to bundle:
- storage purchases
- resource splitting and merging
- blob registration or certification

Fewer transactions means cheaper and faster. Easy win.

### Delete blobs and reuse the space

If your blobs were created as *deletable*, you can delete them before they expire and reuse the storage.

If your data only needs to live for less than one epoch (about 2 weeks on Mainnet), actively cleaning up blobs instead of waiting for expiration can save you real money.

## Blob Cost Tricks

### Batch blob ops

Every blob needs to be:
1. registered
2. certified

That costs **SUI (gas)** and **WAL (uploads)**.

You can’t avoid it, but you *can* batch it. Registering or certifying multiple blobs in a single PTB reduces both latency and cost. The Walrus CLI already does this when you upload multiple blobs at once.

### Don’t hoard blob objects

Each blob creates a Sui object that holds metadata. They’re small, but if you have lots of blobs, the storage cost adds up.

Once a blob expires, **burn the blob object** to get most of the Sui storage cost back via a storage rebate.  
Burning the object does **not** delete the blob data on Walrus.

### Blob objects aren’t forever

Blob objects are only useful if you still want to:
- extend a blob’s lifetime
- delete it early
- manage attributes

If you’re done with all that, burn the object and move on.

In some cases, it’s actually cheaper to burn a long-lived blob object and re-register the blob near the end of its lifetime instead of extending it — especially depending on SUI vs WAL prices.
