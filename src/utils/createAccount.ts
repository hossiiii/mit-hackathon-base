import { networkType } from '@/consts/blockchainProperty';
import { Account } from 'symbol-sdk';

export const createAccount = (): [string, string, string] => {
  const account = Account.generateNewAccount(networkType);
  const privateKey = account.privateKey;
  const publicKey = account.publicKey;
  const address = account.address.plain();
  return [privateKey, publicKey, address];
};
