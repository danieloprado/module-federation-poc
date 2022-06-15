import { useEffect } from 'react';

import { NavLink, useLocation } from 'react-router-dom';

import EduzzAppsToolbar from '@eduzz/apps-toolbar-react';
import useBoolean from '@eduzz/houston-hooks/useBoolean';
import AvatarOutline from '@eduzz/houston-icons/AvatarOutline';
import DashboardRoundOutline from '@eduzz/houston-icons/DashboardRoundOutline';
import Layout from '@eduzz/houston-ui/Layout';

const LayoutC = ({ children }: { children: React.ReactNode }) => {
  const [menuVisible, toggleMenu, , closeMenu] = useBoolean(false);
  const location = useLocation();

  useEffect(() => {
    closeMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <>
      <EduzzAppsToolbar application='orbita' disableChat user={undefined}>
        <EduzzAppsToolbar.IconMenu onClick={toggleMenu} />
        <EduzzAppsToolbar.Apps />
        <EduzzAppsToolbar.User />
      </EduzzAppsToolbar>

      <Layout>
        <Layout.Sidebar mobileVisible={menuVisible} currentLocation={location.pathname}>
          <Layout.Sidebar.Menu>
            <Layout.Sidebar.MenuItem as={NavLink} to='/' icon={<DashboardRoundOutline />}>
              Dashboard
            </Layout.Sidebar.MenuItem>

            <Layout.Sidebar.SubMenuItem label='Vendas' icon={<AvatarOutline />}>
              <Layout.Sidebar.MenuItem as={NavLink} to='/vendas'>
                Lista
              </Layout.Sidebar.MenuItem>

              <Layout.Sidebar.MenuItem as={NavLink} to='/vendas/detalhes'>
                Detalhes
              </Layout.Sidebar.MenuItem>
            </Layout.Sidebar.SubMenuItem>
          </Layout.Sidebar.Menu>
        </Layout.Sidebar>

        <Layout.Content>
          <main className='__main-content'>{children}</main>
        </Layout.Content>
      </Layout>
    </>
  );
};

export default LayoutC;
