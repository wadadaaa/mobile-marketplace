import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode, ReactElement } from 'react';
import Toast, { ToastConfig } from '../components/Toast';

interface ToastContextValue {
  showToast: (config: ToastConfig) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps): ReactElement {
  const [toast, setToast] = useState<ToastConfig | null>(null);
  const [visible, setVisible] = useState(false);

  const showToast = useCallback((config: ToastConfig) => {
    setToast(config);
    setVisible(true);
  }, []);

  const hideToast = useCallback(() => {
    setVisible(false);
    setToast(null);
  }, []);

  const contextValue = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {toast && (
        <Toast
          {...toast}
          visible={visible}
          onHide={hideToast}
        />
      )}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
