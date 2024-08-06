import InitialModal from '@/Components/Modal/InitialModal'
import { Head } from '@inertiajs/react'
import React from 'react'

interface Props {}

const SetUp = (props: Props) => {
  return (
    <>
        <Head title='Create Server'></Head>
        <InitialModal />
    </>
  )
}

export default SetUp