import { useState, useEffect } from 'react';

//SSS用設定
interface SSSWindow extends Window {
  SSS: any
  isAllowedSSS: () => boolean
}
declare const window: SSSWindow

const useSssInit = () => {
  const [sssState, setSssState] = useState<'ACTIVE' | 'INACTIVE' | 'NONE' | 'LOADING'>('LOADING');
  const [clientPublicKey, setClientPublicKey] = useState<string>('');
  
  useEffect(() => {
    try {
      if (window.isAllowedSSS()) {
        setSssState('ACTIVE');
        const publicKey = window.SSS.activePublicKey;
        setClientPublicKey(publicKey);
      } else {
        setSssState('INACTIVE');
      }
    } catch (e) {
      console.error(e);
      setSssState('NONE');
    }
  }, []);
  
  return { clientPublicKey,sssState };
};

export default useSssInit;
