import React from 'react';
import { Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
function Header(props: {
  setOpenLeftDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const {
    setOpenLeftDrawer, //LeftDrawerの設定
  } = props;

  return (
    <>
      <Box display='flex' alignItems='start' justifyContent='center' sx={{ position: 'relative' }}>
        <MenuIcon
          fontSize='large'
          sx={{ position: 'absolute', left: '20px', top: '15px' }}
          onClick={() => setOpenLeftDrawer(true)}
        />
        <Image
          src='/logo.jpeg'
          width={2048}
          height={472}
          style={{
            width: 'auto',
            height: '50px',
          }}
          alt='logo'
        />
      </Box>
    </>
  );
}
export default Header;
