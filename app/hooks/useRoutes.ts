import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { MdChatBubble, MdPeople, MdLogout } from 'react-icons/md';
import { signOut } from 'next-auth/react';

import useConversation from './useConversation';

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();
  const routes = useMemo(
    () => [
      {
        label: 'Chat',
        href: '/conversations',
        icon: MdChatBubble,
        active: pathname === '/conversations' || !!conversationId,
      },
      {
        label: 'Users',
        href: '/users',
        icon: MdPeople,
        active: pathname === '/users',
      },
      {
        label: 'Logout',
        href: '#',
        icon: MdLogout,
        onClick: () => signOut(),
      },
    ],
    [pathname, conversationId]
  );
  return routes;
};

export default useRoutes;
