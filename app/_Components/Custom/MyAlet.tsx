'use client'
import React from 'react'
import ChakraUi from '@/Providers/ChakraUI'
import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react'

const MyAlet = ({title= '',msg='',statu = 'info'}:{title: string,msg: string,statu:string}) => {
  return (
    <ChakraUi>
    <Alert status={`info`}>
      <AlertIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        {msg}
      </AlertDescription>
    </Alert>
  </ChakraUi>
  )
}

export default MyAlet