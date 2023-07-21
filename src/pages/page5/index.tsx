import React, { useEffect, useState } from 'react';
import LeftDrawer from '@/components/LeftDrawer';
import Header from '@/components/Header';
import { Box, Typography, Backdrop, CircularProgress } from '@mui/material';
import { PublicAccount } from 'symbol-sdk';
import { networkType } from '@/consts/blockchainProperty';
import useSssInit from '@/hooks/useSssInit';

function Page5(): JSX.Element {
  //共通設定
  const [progress, setProgress] = useState<boolean>(false); //ローディングの設定
  const [openLeftDrawer, setOpenLeftDrawer] = useState<boolean>(false); //LeftDrawerの設定

  //SSS共通設定
  const { clientPublicKey,sssState } = useSssInit();
  const [clientAddress, setClientAddress] = useState<string>('');
  useEffect(() => {
    if(sssState === 'ACTIVE'){
      const clientPublicAccount = PublicAccount.createFromPublicKey(
        clientPublicKey,
        networkType
      )  
      setClientAddress(clientPublicAccount.address.plain())
    }
  }, [clientPublicKey, sssState]);

  return (
    <>
      <Header setOpenLeftDrawer={setOpenLeftDrawer} />
      <LeftDrawer openLeftDrawer={openLeftDrawer} setOpenLeftDrawer={setOpenLeftDrawer} />
      {progress || sssState === 'LOADING' ? (
        <Backdrop open={progress}>
          <CircularProgress color='inherit' />
        </Backdrop>
      ) : (
        <Box
          sx={{ p: 3 }}
          display='flex'
          alignItems='center'
          justifyContent='center'
          flexDirection='column'
        >
          {sssState === 'NONE' ? (
            <>
              <Typography component='div' variant='h6' sx={{ mt: 5, mb: 5 }}>
                SSSのがインストールされていません
              </Typography>
              <a
                href='https://chrome.google.com/webstore/detail/sss-extension/llildiojemakefgnhhkmiiffonembcan'
                target='_blank'
                rel='noreferrer'
              >
                SSS Extensionをinstallする
              </a>
            </>
          ) : sssState === 'INACTIVE' ? (
            <Typography component='div' variant='h6' sx={{ mt: 5, mb: 5 }}>
              SSSのが有効になっていません
            </Typography>
          ) : (
            <>
              <Typography component='div' variant='h6' sx={{ mt: 5, mb: 5 }}>
                SSSのが有効になっています
              </Typography>
              <Typography component='div' variant='caption' sx={{ mt: 1, mb: 1 }}>
                {`アドレス : ${clientAddress}`}
              </Typography>
            </>
          )}
        </Box>
      )}
    </>
  );
}
export default Page5;
