import fs from "fs-extra";

async function main() {
  const file = fs.readFileSync(
    "typechain-types/factories/contracts/TokenStore__factory.ts"
  );
  const abi = file.toString().match(/const _abi.*?;/s)?.[0] || "";
  fs.writeFileSync(
    "typechain-types/factories/contracts/TokenStore.abi.const.ts",
    abi.replace("const _abi", "export const abi").replace(";", " as const;")
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
