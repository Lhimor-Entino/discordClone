import React, { Children, ReactNode, useState } from 'react'
import {QueryClient,QueryClientProvider} from "@tanstack/react-query"
interface Props  {
    children: ReactNode;
}

const QueryProvider = (props: Props) => {
    const {children} = props
    const [queryClient]  = useState( () => new QueryClient)
  return (
    <QueryClientProvider  client={queryClient}>
        {children}
    </QueryClientProvider>
  )
}

export default QueryProvider