import {clusterApiUrl, Connection, GetProgramAccountsFilter } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

const tokenAddress = "G3DAcz47M31sV3miTZWgJM8wX2QhyyGoAKQt3BwDTuk"

async function main() {
  const solana = new Connection(clusterApiUrl("devnet"))

  const filters:GetProgramAccountsFilter[] = [
    {
      dataSize: 165
    },
    {
      memcmp:
      {
        offset: 0,
        bytes: tokenAddress
      }
    }
  ]
  const tokenAccounts = 
    await solana.getParsedProgramAccounts(
      TOKEN_PROGRAM_ID,
      {filters}
    )
  tokenAccounts.forEach((account, i) => {
    const parsedAccountData = account.account.data
    //@ts-ignore
    const mintAddress = parsedAccountData?.parsed?.info?.mint
    //@ts-ignore
    const tokenBalance = parsedAccountData?.parsed?.info?.tokenAmount?.uiAmount

    console.log(`Token account: ${account.pubkey.toString()}`)
    console.log(`Token mint ID: ${mintAddress}`)
    console.log(`Token balance: ${tokenBalance}\n`)
  })
}

main()