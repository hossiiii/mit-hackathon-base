import React, { useState } from 'react';
import LeftDrawer from '@/components/LeftDrawer';
import Header from '@/components/Header';
import axios from 'axios';
import AlertsSnackbar from '@/components/AlertsSnackbar';
import AlertsDialog from '@/components/AlertsDialog';
import { Box, Typography, Button, Backdrop, CircularProgress } from '@mui/material';
import { ClientAddress } from '@/globalState/atoms';
import { useRecoilValue } from 'recoil';
import { TransactionStatus } from 'symbol-sdk';

function Page3(): JSX.Element {
  //共通設定
  const [progress, setProgress] = useState<boolean>(false); //ローディングの設定
  const [openLeftDrawer, setOpenLeftDrawer] = useState<boolean>(false); //LeftDrawerの設定
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false); //AlertsSnackbarの設定
  const [snackbarSeverity, setSnackbarSeverity] = useState<'error' | 'success'>('error'); //AlertsSnackbarの設定
  const [snackbarMessage, setSnackbarMessage] = useState<string>(''); //AlertsSnackbarの設定
  const [dialogTitle, setDialogTitle] = useState<string>(''); //AlertsDialogの設定(共通)
  const [dialogMessage, setDialogMessage] = useState<string>(''); //AlertsDialogの設定(共通)

  //ページ個別設定
  const [hash, setHash] = useState<string>('');
  const clientAddress = useRecoilValue(ClientAddress);
  const [openDialogSendXym, setOpenDialogSendXym] = useState<boolean>(false); //AlertsDialogの設定(個別)
  const handleAgreeClickSendXym = () => {
    if (clientAddress === '') {
      //事前チェック
      setSnackbarSeverity('error');
      setSnackbarMessage('クライアントのアカウントを作成して下さい');
      setOpenSnackbar(true);
      return;
    }
    const fetchData = async () => {
      try {
        setProgress(true);
        const res = await axios.post(
          '/api/send-client',
          {
            address: clientAddress,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const transactionStatus: TransactionStatus | undefined = res.data;
        if (transactionStatus === undefined) {
          setSnackbarSeverity('error');
          setSnackbarMessage('NODEの接続に失敗しました');
          setOpenSnackbar(true);
        } else if (transactionStatus.code === 'Success') {
          setHash(transactionStatus.hash);
          setSnackbarSeverity('success');
          setSnackbarMessage(`${transactionStatus.group} TXを検知しました`);
          setOpenSnackbar(true);
        } else {
          setSnackbarSeverity('error');
          setSnackbarMessage(`TXに失敗しました ${transactionStatus.code}`);
          setOpenSnackbar(true);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setProgress(false);
      }
    };
    fetchData();
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
        openDialog={openDialogSendXym}
        setOpenDialog={setOpenDialogSendXym}
        handleAgreeClick={() => {
          handleAgreeClickSendXym();
          setOpenDialogSendXym(false);
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
          <Typography component='div' variant='h6' sx={{ mt: 5, mb: 1 }}>
            管理者側からクライアントへ1xym送金
          </Typography>
          <Typography component='div' variant='caption' sx={{ mt: 1, mb: 5 }}>
            * 管理者側での未承認トランザクション検知処理を行います
          </Typography>
          <Button
            color='primary'
            variant='contained'
            onClick={() => {
              setDialogTitle('入金');
              setDialogMessage('管理者側からクライアントへ1xym送金しますか？');
              setOpenDialogSendXym(true);
            }}
          >
            入金
          </Button>
          {hash !== '' ? (
            <Typography
              component='div'
              variant='body1'
              sx={{ mt: 5, mb: 1 }}
              onClick={() => {
                window.open(`https://testnet.symbol.fyi/transactions/${hash}`, '_blank');
              }}
            >
              {`hash値 : ${hash}`}
            </Typography>
          ) : (
            <></>
          )}
        </Box>
      )}
    </>
  );
}
export default Page3;
