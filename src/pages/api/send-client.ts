import type { NextApiRequest, NextApiResponse } from 'next';
import {
  Account,
  Address,
  Deadline,
  EmptyMessage,
  Mosaic,
  MosaicId,
  RepositoryFactoryHttp,
  TransactionStatus,
  TransferTransaction,
  UInt64,
} from 'symbol-sdk';
import { firstValueFrom } from 'rxjs';
import { connectNode } from '@/utils/connectNode';
import { nodeList } from '@/consts/nodeList';
import { currencyMosaicId, epochAdjustment, generationHash, networkType } from '@/consts/blockchainProperty';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<TransactionStatus | undefined> {
  if (req.method === 'POST') {
    const NODE = await connectNode(nodeList);
    if (NODE === '') return undefined;
    const repo = new RepositoryFactoryHttp(NODE, {
      websocketUrl: NODE.replace('http', 'ws') + '/ws',
      websocketInjected: WebSocket,
    });
    const txRepo = repo.createTransactionRepository();
    const tsRepo = repo.createTransactionStatusRepository();
    const listener = repo.createListener();

    const admin = Account.createFromPrivateKey(process.env.PRIVATE_KEY!, networkType);
    const clientAddress = Address.createFromRawAddress(req.body.address);

    const tx = TransferTransaction.create(
      Deadline.create(epochAdjustment),
      clientAddress,
      [new Mosaic(new MosaicId(currencyMosaicId), UInt64.fromUint(1000000))],
      EmptyMessage,
      networkType
    ).setMaxFee(100);

    const signedTx = admin.sign(tx, generationHash);
    await firstValueFrom(txRepo.announce(signedTx));
    await listener.open();

    //未承認トランザクションの検知
    listener.unconfirmedAdded(clientAddress, signedTx.hash).subscribe(async (unconfirmedTx) => {
      const response: TransactionStatus = await firstValueFrom(
        tsRepo.getTransactionStatus(signedTx.hash)
      );
      listener.close();
      clearTimeout(timerId);
      res.status(200).json(response);
    });
    //未承認トランザクションの検知ができなかった時の処理
    const timerId = setTimeout(async function () {
      const response: TransactionStatus = await firstValueFrom(
        tsRepo.getTransactionStatus(signedTx.hash)
      );
      //監視前に未承認TXがノードに認識されてしまった場合
      if (response.code === 'Success') {
        listener.close();
        res.status(200).json(response);
      }
      //トランザクションでエラーが発生した場合の処理
      else {
        listener.close();
        res.status(400).json(response);
      }
    }, 1000); //タイマーを1秒に設定
  }
}
