import { atom } from 'recoil';

export const ClientAddress = atom<string>({
  key: 'clientAddress',
  default: '',
});

export const ClientPrivateKey = atom<string>({
  key: 'clientPrivateKey',
  default: '',
});

export const ClientPublicKey = atom<string>({
  key: 'clientPublicKey',
  default: '',
});

export const AdminAddress = atom<string>({
  key: 'adminAddress',
  default: '',
});
