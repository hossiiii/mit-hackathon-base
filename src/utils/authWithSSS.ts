import {
  Account,
  Address,
  Deadline,
  PlainMessage,
  RepositoryFactoryHttp,
  SignedTransaction,
  TransactionHttp,
  TransactionStatus,
  TransferTransaction,
} from 'symbol-sdk';
import { firstValueFrom } from 'rxjs';
import { connectNode } from '@/utils/connectNode';
import { nodeList } from '@/consts/nodeList';
import axios from 'axios';
import { epochAdjustment, networkType } from '@/consts/blockchainProperty';

//SSS用設定
interface SSSWindow extends Window {
  SSS: any
}
declare const window: SSSWindow

export const authWithSSS = async (
  clientAddress: string,
): Promise<TransactionStatus | undefined> => {
  const NODE = await connectNode(nodeList);
  if (NODE === '') return undefined;
  const repo = new RepositoryFactoryHttp(NODE, {
    websocketUrl: NODE.replace('http', 'ws') + '/ws',
    websocketInjected: WebSocket,
  });
  const txRepo = repo.createTransactionRepository();
  const tsRepo = repo.createTransactionStatusRepository();
  const listener = repo.createListener();

  const clientAddressAccount = Address.createFromRawAddress(clientAddress);

  const res = await axios.get('/api/fetch-address');
  const adminAddress:string = res.data;

  const tx = TransferTransaction.create(
    Deadline.create(epochAdjustment),
    Address.createFromRawAddress(adminAddress),
    [],
    PlainMessage.create('Hello Symbol!'),
    networkType
  ).setMaxFee(100);

  window.SSS.setTransaction(tx)
  const signedTx:SignedTransaction = await new Promise((resolve) => {
    resolve(window.SSS.requestSign());
  })
  await firstValueFrom(txRepo.announce(signedTx));
  await listener.open();
  const transactionStatus: TransactionStatus = await new Promise((resolve) => {
    //承認トランザクションの検知
    listener.confirmed(clientAddressAccount, signedTx.hash).subscribe(async (confirmedTx) => {
      const response = await firstValueFrom(tsRepo.getTransactionStatus(signedTx.hash));
      listener.close();
      resolve(response);
    });
    //トランザクションでエラーが発生した場合の処理
    setTimeout(async function () {
      const response = await firstValueFrom(tsRepo.getTransactionStatus(signedTx.hash));
      if (response.code !== 'Success') {
        listener.close();
        resolve(response);
      }
    }, 1000); //タイマーを1秒に設定
  });
  return transactionStatus;
};


