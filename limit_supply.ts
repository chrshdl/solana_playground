import { Connection, PublicKey, Keypair } from '@solana/web3.js';
import { AuthorityType, setAuthority } from '@solana/spl-token';
import { PROGRAM_ID } from '@metaplex-foundation/mpl-token-metadata';
import { readFileSync } from "fs";
import { homedir } from 'os'
import * as anchor from '@project-serum/anchor';

const mint = new PublicKey('G3DAcz47M31sV3miTZWgJM8wX2QhyyGoAKQt3BwDTuk');

const secret = JSON.parse(readFileSync(homedir() + "/.config/solana/id.json").toString()) as number[]
const seed1 = Buffer.from(anchor.utils.bytes.utf8.encode("metadata"));
const seed2 = Buffer.from(PROGRAM_ID.toBytes());
const seed3 = Buffer.from(mint.toBytes());
const userWallet = Keypair.fromSecretKey(new Uint8Array(secret))

const endpoint = 'https://api.devnet.solana.com'; //Replace with your RPC Endpoint

const connection = new Connection(endpoint)

setAuthority(
  connection,
  userWallet,
  mint,
  userWallet,
  AuthorityType.MintTokens,
  null, // sets mint authority to null
);