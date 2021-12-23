import React from 'react'
import { NextPage } from 'next'

import Header from '@components/ui/header'
import MainBlock from './components/main-block'

const HomePage: NextPage = () => {
  return (
    <div>
      <Header />
      <MainBlock />
    </div>
  )
}

export default HomePage
