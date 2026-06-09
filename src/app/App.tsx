import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import faviconSrc from '../imports/wanderquest_logo_with_no_titile._favicon.png';

export default function App() {
  useEffect(() => {
    const link = document.querySelector<HTMLLinkElement>("link[rel~='icon']") ??
      Object.assign(document.createElement('link'), { rel: 'icon', type: 'image/png' });
    link.href = faviconSrc;
    document.head.appendChild(link);
    document.title = 'WanderQuest — Discover the World\'s Hidden Gems';
  }, []);

  return <RouterProvider router={router} />;
}
