import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import styled from "styled-components";

type NotificationType = "success" | "error" | "info";
export type NotificationFilter = "all" | "errors" | "errors-info";

export interface NotificationProps {
  id: string;
  title?: string;
  message: string;
  type: NotificationType;
}

interface NotificationContextValue {
  notify: (notification: Omit<NotificationProps, "id">) => void;
  filter: NotificationFilter;
  setNotificationFilter: (filter: NotificationFilter) => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(null);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }
  return context;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const [filter, setFilter] = useState<NotificationFilter>(() => {
    const stored = window.localStorage.getItem("notificationFilter");
    return stored === "errors" || stored === "errors-info" ? stored : "all";
  });

  useEffect(() => {
    window.localStorage.setItem("notificationFilter", filter);
  }, [filter]);

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  const notify = useCallback(
    (notification: Omit<NotificationProps, "id">) => {
      if (filter === "errors" && notification.type !== "error") {
        return;
      }
      if (filter === "errors-info" && notification.type === "success") {
        return;
      }

      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      setNotifications((prev) => [{ id, ...notification }, ...prev]);
      window.setTimeout(() => removeNotification(id), 4500);
    },
    [filter]
  );

  const value = useMemo(
    () => ({ notify, filter, setNotificationFilter: setFilter }),
    [notify, filter]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <ToastContainer>
        {notifications.map((notification) => (
          <ToastCard key={notification.id} type={notification.type}>
            {notification.title && <ToastTitle>{notification.title}</ToastTitle>}
            <ToastMessage>{notification.message}</ToastMessage>
          </ToastCard>
        ))}
      </ToastContainer>
    </NotificationContext.Provider>
  );
};

const ToastContainer = styled.div`
  position: fixed;
  right: 20px;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 9999;
`;

const ToastCard = styled.div<{ type: NotificationType }>`
  min-width: 280px;
  max-width: 360px;
  padding: 16px 18px;
  border-radius: 18px;
  background: var(--surface);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
  border: 1px solid var(--border);
  backdrop-filter: blur(16px);
  color: var(--text-color);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 6px;
    height: 100%;
    background: ${(props) =>
      props.type === "success"
        ? "#4BB77B"
        : props.type === "error"
        ? "#FF5B67"
        : "#4F8CFF"};
  }
`;

const ToastTitle = styled.div`
  font-weight: 700;
  margin-bottom: 6px;
`;

const ToastMessage = styled.div`
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.5;
`;
