import { Keypair, PublicKey, Connection, clusterApiUrl, LAMPORTS_PER_SOL, SystemProgram, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";
import { readFileSync } from "fs";
import { homedir } from 'os'

const secret = JSON.parse(readFileSync(homedir() + "/.config/solana/id.json").toString()) as number[]
const secretKey = Uint8Array.from(secret)
const myKeypair = Keypair.fromSecretKey(secretKey)

const connection = new Connection(clusterApiUrl("devnet"))

/**
 * 
 * @param address 
 * @returns 
 */
async function getBalance(address: PublicKey): Promise<number> {
  return connection.getBalance(address)
}


/**
 * 
 * @param fromAddress 
 * @param toAddress 
 * @param solana 
 * @returns 
 */
async function sendBalance(fromAddress: PublicKey, toAddress:PublicKey, solana:number): Promise<string> {
  
  const transaction = new Transaction()

  const sendSolanaInstruction = SystemProgram.transfer({
    fromPubkey: fromAddress,
    toPubkey: toAddress,
    lamports: LAMPORTS_PER_SOL * solana
  })

  transaction.add(sendSolanaInstruction)

  const signature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [myKeypair]
  )

  return signature
}

getBalance(myKeypair.publicKey).then((balance) => {
  console.log(balance / LAMPORTS_PER_SOL + " SOL")
})

sendBalance(
  myKeypair.publicKey,
  new PublicKey("7C4jsPZpht42Tw6MjXWF56Q5RQUocjBBmciEjDa8HRtp"), 0.002).then((signature) => {
  console.log(signature)
})