import { PropsWithChildren } from "react";
import { ClientCookiesProvider } from "./cookies";
import { cookies } from 'next/headers'
import { AuthProvider } from "./contexts/auth.context";
import { NoticiationProvider } from "./contexts/notification.context";
import { ConfirmationModalProvider } from "./contexts/confirmation-modal.context";

export function Providers({ children }: PropsWithChildren) {
  return (
    <ClientCookiesProvider value={cookies().getAll()} >
      <AuthProvider>
        <NoticiationProvider>
          <ConfirmationModalProvider>
            {children}
          </ConfirmationModalProvider>
        </NoticiationProvider>
      </AuthProvider>
    </ClientCookiesProvider>
  )
}