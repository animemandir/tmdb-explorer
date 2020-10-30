import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useContext,
} from 'react';
import { useRouter } from 'next/router';

interface AppDrawerContextValue {
  isOpen: boolean;
  open: VoidFunction;
  close: VoidFunction;
  toggle: VoidFunction;
}

const AppDrawerContext = React.createContext<AppDrawerContextValue>(
  {} as AppDrawerContextValue,
);

export function useAppDrawer() {
  const value = useContext(AppDrawerContext);
  return value;
}

type AppDrawerProviderProps = React.PropsWithChildren<{}>;

function AppDrawerProvider({ children }: AppDrawerProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  // const location = useLocation();

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((current) => !current);
  }, []);

  const router = useRouter();

  // We close the drawer when a route change gets completed.
  useEffect(() => {
    const eventType = 'routeChangeComplete';

    router.events.on(eventType, close);

    return () => {
      router.events.off(eventType, close);
    };
  }, [close, router.events]);

  const contextValue = useMemo(() => ({ isOpen, open, close, toggle }), [
    close,
    isOpen,
    open,
    toggle,
  ]);

  return (
    <AppDrawerContext.Provider value={contextValue}>
      {children}
    </AppDrawerContext.Provider>
  );
}

export default AppDrawerProvider;