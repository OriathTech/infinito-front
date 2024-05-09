'use client'

import { NextUIProvider } from '@nextui-org/react'
import { ProductProvider } from './products/products'
import { SessionProvider } from './session/session'
import { CartProvider } from './cart/cart'
import { PricesProvider } from './prices/prices'
import { TicketProvider } from './tickets/tickets'
import { UserProvider } from './users/users'

export function Providers({ children }) {
    return (
        <NextUIProvider>
          <ProductProvider>
            <CartProvider>
              <PricesProvider>
                <TicketProvider>
                  <UserProvider>
                    <SessionProvider>
                      {children}
                    </SessionProvider>
                  </UserProvider>
                </TicketProvider>
              </PricesProvider>
            </CartProvider>
          </ProductProvider>
        </NextUIProvider>
    )
}