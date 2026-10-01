import { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
// Back: close sidebar -> navigate history -> exit app at root.
export function useAndroidBack(sidebarOpen, closeSidebar) {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    const h = App.addListener('backButton', ({ canGoBack }) => { if (sidebarOpen) closeSidebar(); else if (canGoBack) window.history.back(); else App.exitApp(); });
    return () => { h.then(x => x.remove()); };
  }, [sidebarOpen, closeSidebar]);
}
