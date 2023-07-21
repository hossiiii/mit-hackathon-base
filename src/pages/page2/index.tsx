import React, { useState } from 'react';
import LeftDrawer from '@/components/LeftDrawer';
import Header from '@/components/Header';
import axios from 'axios';
import AlertsSnackbar from '@/components/AlertsSnackbar';
import AlertsDialog from '@/components/AlertsDialog';
import { Box, Typography, Button, Backdrop, CircularProgress } from '@mui/material';
import { AdminAddress } from '@/globalState/atoms';
import { useRecoilState } from 'recoil';

function Page2(): JSX.Element {
  //共通設定
  const [progress, setProgress] = useState<boolean>(false); //ローディングの設定
  const [openLeftDrawer, setOpenLeftDrawer] = useState<boolean>(false); //LeftDrawerの設定
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false); //AlertsSnackbarの設定
  const [snackbarSeverity, setSnackbarSeverity] = useState<'error' | 'success'>('error'); //AlertsSnackbarの設定
  const [snackbarMessage, setSnackbarMessage] = useState<string>(''); //AlertsSnackbarの設定
  const [dialogTitle, setDialogTitle] = useState<string>(''); //AlertsDialogの設定(共通)
  const [dialogMessage, setDialogMessage] = useState<string>(''); //AlertsDialogの設定(共通)

  //ページ個別設定
  const [adminAddress, setAdminAddress] = useRecoilState(AdminAddress);
  const [openDialogGetAddress, setOpenDialogGetAddress] = useState<boolean>(false); //AlertsDialogの設定(個別)
  const handleAgreeClickGetAddress = () => {
    const fetchData = async () => {
      try {
        setProgress(true);
        const res = await axios.get('/api/fetch-address');
        const address:string = res.data;
        console.log(address);
        setAdminAddress(address);
        setSnackbarSeverity('success');
        setSnackbarMessage('管理者アドレスを取得しました');
        setOpenSnackbar(true);
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.error(e.message);
          setSnackbarSeverity('error');
          setSnackbarMessage('管理者アドレスを取得に失敗しました');
          setOpenSnackbar(true);
        }
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
        openDialog={openDialogGetAddress}
        setOpenDialog={setOpenDialogGetAddress}
        handleAgreeClick={() => {
          handleAgreeClickGetAddress();
          setOpenDialogGetAddress(false);
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
            管理者側のアドレス確認
          </Typography>
          <Button
            color='primary'
            variant='contained'
            onClick={() => {
              setDialogTitle('アドレス確認');
              setDialogMessage('管理者側のアドレスを確認しますか？');
              setOpenDialogGetAddress(true);
            }}
          >
            確認
          </Button>
          {adminAddress !== '' ? (
            <Typography
              component='div'
              variant='body1'
              sx={{ mt: 5, mb: 1 }}
              onClick={() => {
                window.open(`https://testnet.symbol.fyi/accounts/${adminAddress}`, '_blank');
              }}
            >
              {`アドレス : ${adminAddress}`}
            </Typography>
          ) : (
            <></>
          )}
        </Box>
      )}
    </>
  );
}
export default Page2;
