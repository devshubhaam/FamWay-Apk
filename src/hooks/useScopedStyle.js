import { useLayoutEffect } from 'react';
// Injects a CSS string while the component is mounted and removes it on unmount,
// so the landing-page CSS and the dashboard CSS never clash.
export function useScopedStyle(css) {
  useLayoutEffect(() => { const el = document.createElement('style'); el.textContent = css; document.head.appendChild(el); return () => el.remove(); }, [css]);
}
