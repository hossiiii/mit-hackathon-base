import React, { useState } from 'react';
import LeftDrawer from '@/components/LeftDrawer';
import Header from '@/components/Header';
import AlertsSnackbar from '@/components/AlertsSnackbar';
import AlertsDialog from '@/components/AlertsDialog';
import { Box, Typography, Button, Backdrop, CircularProgress } from '@mui/material';
import { createAccount } from '@/utils/createAccount';
import { ClientPrivateKey, ClientPublicKey, ClientAddress } from '@/globalState/atoms';
import { useRecoilState } from 'recoil';

function Page1(): JSX.Element {
  //共通設定
  const [progress, setProgress] = useState<boolean>(false); //ローディングの設定
  const [openLeftDrawer, setOpenLeftDrawer] = useState<boolean>(false); //LeftDrawerの設定
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false); //AlertsSnackbarの設定
  const [snackbarSeverity, setSnackbarSeverity] = useState<'error' | 'success'>('error'); //AlertsSnackbarの設定
  const [snackbarMessage, setSnackbarMessage] = useState<string>(''); //AlertsSnackbarの設定
  const [dialogTitle, setDialogTitle] = useState<string>(''); //AlertsDialogの設定(共通)
  const [dialogMessage, setDialogMessage] = useState<string>(''); //AlertsDialogの設定(共通)

  //ページ個別設定
  const [clientPrivateKey, setClientPrivateKey] = useRecoilState(ClientPrivateKey);
  const [clientPublicKey, setClientPublicKey] = useRecoilState(ClientPublicKey);
  const [clientAddress, setClientAddress] = useRecoilState(ClientAddress);
  const [openDialogClientAddress, setOpenDialogClientAddress] = useState<boolean>(false); //AlertsDialogの設定(個別)
  const handleAgreeClickClientAddress = () => {
    setProgress(true);
    const [privatekey, publickey, address] = createAccount();
    setClientPrivateKey(privatekey);
    setClientPublicKey(publickey);
    setClientAddress(address);
    setSnackbarSeverity('success');
    setSnackbarMessage('アカウントの生成に成功しました');
    setOpenSnackbar(true);
    setProgress(false);
  };

  return (
    <>
      <Header setOpenLeftDrawer={setOpenLeftDrawer} />
      <LeftDrawer openLeftDrawer={openLeftDrawer} setOpenLeftDrawer={setOpenLeftDrawer} />
      <AlertsSnackbar
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
        vertical={'bottom'}
        snackbarSeverity={snackbarSeverity}
        snackbarMessage={snackbarMessage}
      />
      <AlertsDialog
        openDialog={openDialogClientAddress}
        setOpenDialog={setOpenDialogClientAddress}
        handleAgreeClick={() => {
          handleAgreeClickClientAddress();
          setOpenDialogClientAddress(false);
        }}
        dialogTitle={dialogTitle}
        dialogMessage={dialogMessage}
      />
      {progress ? (
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
          <Typography component='div' variant='h6' sx={{ mt: 5, mb: 5 }}>
            クライアント側でのアカウント作成
          </Typography>
          <Button
            color='primary'
            variant='contained'
            onClick={() => {
              setDialogTitle('アカウントの生成');
              setDialogMessage('アカウントを生成しますか？');
              setOpenDialogClientAddress(true);
            }}
          >
            アドレスの生成
          </Button>
          <Typography component='div' variant='caption' sx={{ mt: 5, mb: 1 }}>
            {`秘密鍵 : ${clientPrivateKey}`}
          </Typography>
          <Typography component='div' variant='caption' sx={{ mt: 1, mb: 1 }}>
            {`公開鍵 : ${clientPublicKey}`}
          </Typography>
          <Typography component='div' variant='caption' sx={{ mt: 1, mb: 1 }}>
            {`アドレス : ${clientAddress}`}
          </Typography>
        </Box>
      )}
    </>
  );
}
export default Page1;
