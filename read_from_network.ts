import { Keypair, PublicKey, Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { readFileSync } from "fs";
import { homedir } from 'os'

const secret = JSON.parse(readFileSync(homedir() + "/.config/solana/id.json").toString()) as number[]
const secretKey = Uint8Array.from(secret)
const myKeypair = Keypair.fromSecretKey(secretKey)

const myPublicKey = myKeypair.publicKey



async function getBalance(address: PublicKey): Promise<number> {
    const connection = new Connection(clusterApiUrl("devnet"))
    return connection.getBalance(address)
  }
  
  getBalance(new PublicKey(myPublicKey.toBase58())).then((balance) => {
    console.log(balance / LAMPORTS_PER_SOL + " SOL");
  })