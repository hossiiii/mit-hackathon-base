import React, { useState } from 'react';
import LeftDrawer from '@/components/LeftDrawer';
import Header from '@/components/Header';
import { Box, Typography, Button } from '@mui/material';

function Home(): JSX.Element {
  const [openLeftDrawer, setOpenLeftDrawer] = useState<boolean>(false); //LeftDrawerの設定

  return (
    <>
      <Header setOpenLeftDrawer={setOpenLeftDrawer} />
      <LeftDrawer openLeftDrawer={openLeftDrawer} setOpenLeftDrawer={setOpenLeftDrawer} />
      <Box
        sx={{ p: 3 }}
        display='flex'
        alignItems='center'
        justifyContent='center'
        flexDirection='column'
      >
        <Typography component='div' variant='h6' sx={{ mt: 5, mb: 5 }}>
          Next.js + Recoil + Material-UI + symbol-sdk@2.0.4のデモ
        </Typography>
      </Box>
    </>
  );
}
export default Home;
