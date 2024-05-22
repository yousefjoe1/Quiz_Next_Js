'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"

const queryClient = new QueryClient()

function QueryPr({children}:{children:ReactNode}) {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

export default QueryPr