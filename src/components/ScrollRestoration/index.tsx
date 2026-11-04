import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

type ScrollPosition = {
  x: number;
  y: number;
};

const STORAGE_KEY = 'ramz-scroll-positions';
const RESTORE_ATTEMPTS = 12;

function readPositions(): Record<string, ScrollPosition> {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) as Record<string, ScrollPosition> : {};
  } catch {
    return {};
  }
}

function writePosition(key: string, position: ScrollPosition) {
  try {
    const positions = readPositions();
    positions[key] = position;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
  } catch {
    // Storage can be unavailable in private browsing or restricted web views.
  }
}

function getPosition(key: string): ScrollPosition | undefined {
  const position = readPositions()[key];
  return position && Number.isFinite(position.x) && Number.isFinite(position.y)
    ? position
    : undefined;
}

export function ScrollRestoration() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const previousLocation = useRef(location);
  const activeKey = useRef(location.key);
  const restoring = useRef(false);
  const restoreFrame = useRef<number | null>(null);

  useEffect(() => {
    const entryKey = location.key;
    const saveCurrentPosition = () => {
      if (!restoring.current) {
        writePosition(entryKey, { x: window.scrollX, y: window.scrollY });
      }
    };

    window.history.scrollRestoration = 'manual';
    window.addEventListener('scroll', saveCurrentPosition, { passive: true });

    return () => {
      saveCurrentPosition();
      window.removeEventListener('scroll', saveCurrentPosition);
    };
  }, [location.key]);

  useLayoutEffect(() => {
    const previous = previousLocation.current;
    const pathChanged = previous.pathname !== location.pathname;
    const isNewPageNavigation = (navigationType === 'PUSH' || navigationType === 'REPLACE') && pathChanged;
    const savedPosition = navigationType === 'POP' ? getPosition(location.key) : undefined;
    const destination = savedPosition ?? { x: 0, y: 0 };

    if (restoreFrame.current !== null) {
      cancelAnimationFrame(restoreFrame.current);
    }

    if (activeKey.current !== location.key) {
      writePosition(activeKey.current, { x: window.scrollX, y: window.scrollY });
      activeKey.current = location.key;

      if (navigationType === 'POP') {
        if (!savedPosition) {
          writePosition(location.key, destination);
        }
      } else if (isNewPageNavigation) {
        writePosition(location.key, destination);
      } else {
        writePosition(location.key, { x: window.scrollX, y: window.scrollY });
      }
    }

    if (navigationType === 'POP' || isNewPageNavigation) {
      restoring.current = true;
      let attempts = 0;
      const restore = () => {
        window.scrollTo(destination.x, destination.y);
        attempts += 1;

        const reachedDestination = Math.abs(window.scrollY - destination.y) <= 1;
        const enoughContent = document.documentElement.scrollHeight >= destination.y + window.innerHeight;
        if (reachedDestination && (enoughContent || destination.y === 0)) {
          restoring.current = false;
          restoreFrame.current = null;
          return;
        }

        if (attempts < RESTORE_ATTEMPTS) {
          restoreFrame.current = requestAnimationFrame(restore);
        } else {
          restoring.current = false;
          restoreFrame.current = null;
        }
      };

      restoreFrame.current = requestAnimationFrame(() => {
        restoreFrame.current = requestAnimationFrame(restore);
      });
    }

    previousLocation.current = location;

    return () => {
      if (restoreFrame.current !== null) {
        cancelAnimationFrame(restoreFrame.current);
        restoreFrame.current = null;
      }
      restoring.current = false;
    };
  }, [location, navigationType]);

  useEffect(() => {
    const cancelRestoration = () => {
      if (restoring.current) {
        restoring.current = false;
      }
    };

    window.addEventListener('wheel', cancelRestoration, { passive: true });
    window.addEventListener('touchstart', cancelRestoration, { passive: true });
    window.addEventListener('pointerdown', cancelRestoration, { passive: true });
    window.addEventListener('keydown', cancelRestoration);

    return () => {
      window.removeEventListener('wheel', cancelRestoration);
      window.removeEventListener('touchstart', cancelRestoration);
      window.removeEventListener('pointerdown', cancelRestoration);
      window.removeEventListener('keydown', cancelRestoration);
    };
  }, []);

  return null;
}
