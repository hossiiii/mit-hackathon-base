import type { NextApiRequest, NextApiResponse } from 'next';
import { Account } from 'symbol-sdk';
import { connectNode } from '@/utils/connectNode';
import { nodeList } from '@/consts/nodeList';
import { networkType } from '@/consts/blockchainProperty';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<string | undefined> {
  if (req.method === 'GET') {
    const NODE = await connectNode(nodeList);
    if (NODE === '') return undefined;
    const admin = Account.createFromPrivateKey(process.env.PRIVATE_KEY!, networkType);
    res.status(200).json(admin.address.plain());
  }
}
