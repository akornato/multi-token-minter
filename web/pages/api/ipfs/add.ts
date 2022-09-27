// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { create } from "ipfs-http-client";

const ipfsClient = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization:
      "Basic " +
      Buffer.from(
        process.env.INFURA_PROJECT_ID + ":" + process.env.INFURA_API_KEY_SECRET
      ).toString("base64"),
  },
});

type ResponseData = {
  path: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { path } = await ipfsClient.add(req.body);
  res.status(200).json({ path });
}
