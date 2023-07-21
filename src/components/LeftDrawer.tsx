import React from 'react';
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Home from '@mui/icons-material/Home';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import Looks5Icon from '@mui/icons-material/Looks5';
import Looks6Icon from '@mui/icons-material/Looks6';
import { useRouter } from 'next/router';
import Image from 'next/image';

function LeftDrawer(props: {
  openLeftDrawer: boolean;
  setOpenLeftDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const { openLeftDrawer, setOpenLeftDrawer } = props;
  const router = useRouter();

  return (
    <>
      <Drawer anchor={'left'} open={openLeftDrawer} onClose={() => setOpenLeftDrawer(false)}>
        <Box sx={{ width: '65vw', height: '100vh' }}>
          <List>
            <ListItem disablePadding sx={{ display: 'flex', justifyContent: 'center' }}>
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
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  router.push('/');
                  setOpenLeftDrawer(false);
                }}
              >
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary={'ホーム'} />
              </ListItemButton>
            </ListItem>
          </List>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  router.push('/page1');
                  setOpenLeftDrawer(false);
                }}
              >
                <ListItemIcon>
                  <LooksOneIcon />
                </ListItemIcon>
                <ListItemText primary={'アカウント作成'} />
              </ListItemButton>
            </ListItem>
          </List>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  router.push('/page2');
                  setOpenLeftDrawer(false);
                }}
              >
                <ListItemIcon>
                  <LooksTwoIcon />
                </ListItemIcon>
                <ListItemText primary={'管理者側アドレス確認'} />
              </ListItemButton>
            </ListItem>
          </List>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  router.push('/page3');
                  setOpenLeftDrawer(false);
                }}
              >
                <ListItemIcon>
                  <Looks3Icon />
                </ListItemIcon>
                <ListItemText primary={'管理者から送信'} />
              </ListItemButton>
            </ListItem>
          </List>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  router.push('/page4');
                  setOpenLeftDrawer(false);
                }}
              >
                <ListItemIcon>
                  <Looks4Icon />
                </ListItemIcon>
                <ListItemText primary={'クライアントから送信'} />
              </ListItemButton>
            </ListItem>
          </List>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  router.push('/page5');
                  setOpenLeftDrawer(false);
                }}
              >
                <ListItemIcon>
                  <Looks5Icon />
                </ListItemIcon>
                <ListItemText primary={'SSS連携'} />
              </ListItemButton>
            </ListItem>
          </List>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  router.push('/page6');
                  setOpenLeftDrawer(false);
                }}
              >
                <ListItemIcon>
                  <Looks6Icon />
                </ListItemIcon>
                <ListItemText primary={'SSSでクライアントから送信'} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
export default LeftDrawer;
