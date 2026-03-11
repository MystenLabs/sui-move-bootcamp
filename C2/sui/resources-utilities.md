# Sui Blockchain Gas Calculation Utilities and Resources
In this document you will find useful resources and utilities for Gas Fees calculation on the Sui Network

## Gas Calculators

### Gas Calculator from ML Team
A customisable Gas Calculator excel sheet has been created by MystenLabs team under the following:  
[Document](https://docs.google.com/spreadsheets/d/13Fr3p7Gdkki1xWJDbT273My7oGDN71MxnQqdJ4NPne0/edit?gid=0#gid=0)

## Current Gas Fees
### Current and Average Gas Fees from Explorer
Current estimated gas fees(average, min., max., storage rebate, etc.) can be found in Suiscan:  
- [Suiscan Home(under network details)](https://suiscan.xyz/devnet/home)  
- [Suiscan Analytics(under the Fees details)](https://suiscan.xyz/devnet/analytics) 

## Gas Costs Examples and Bucket Thresholds 

### Gas budget examples from Sui Docs
| Reference gas price                                   | Computation units | Storage price | Storage units | Storage rebate | Minimum gas budget | Net gas fees |
|------------------------------------------------------|-------------------|---------------|---------------|----------------|--------------------|--------------|
| Simple transaction storing 10 bytes                  | 1,000 MIST        | 1,000         | 75 MIST       | 1,000          | 0 MIST             | 1,075,000 MIST |
| Simple transaction storing 10 bytes and deleting data| 500 MIST          | 1,000         | 75 MIST       | 1,000          | 100,000 MIST       | 475,000 MIST |
| Complex transaction storing 120 bytes                | 1,000 MIST        | 5,000         | 200 MIST      | 12,000         | 0 MIST             | 7,400,000 MIST |
| Complex transaction storing 120 bytes and deleting data | 500 MIST       | 5,000         | 200 MIST      | 12,000         | 5,000,000 MIST     | -100,000 MIST |

### Buckets thresholds from Sui Docs
| Bucket lower threshold | Bucket upper threshold | Computation units |
|------------------------|------------------------|-------------------|
| 0                      | 1,000                  | 1,000             |
| 1,001                  | 5,000                  | 5,000             |
| 5,001                  | 10,000                 | 10,000            |
| 10,001                 | 20,000                 | 20,000            |
| 20,001                 | 50,000                 | 50,000            |
| 50,001                 | 200,000                | 200,000           |
| 200,001                | 1,000,000              | 1,000,000         |
| 1,000,001              | 5,000,000              | 5,000,000         |
| 5,000,001              | Infinity               | transaction aborts|

