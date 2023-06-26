import DesktopSidebar from './DesktopSidebar';
import MobileFooter from './MobileFooter';

import getCurrentUser from '@/app/actions/getCurrentUser';

async function Sidebar({ children }: { children: React.ReactNode }) {
  const currrentUser = await getCurrentUser();
  return (
    <div className='h-full'>
      <DesktopSidebar currentUser={currrentUser!} />
      <MobileFooter />
      <main className='lg:pl-20 h-full'>{children}</main>
    </div>
  );
}

export default Sidebar;
