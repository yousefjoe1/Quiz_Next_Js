'use client'
import React, { FC } from 'react'

import { ChakraProvider } from '@chakra-ui/react'

const ChakraUi = ({ children }: { children: React.ReactNode }) => {
    return (
        <ChakraProvider>
          {children}
        </ChakraProvider>
      )
}

export default ChakraUi
