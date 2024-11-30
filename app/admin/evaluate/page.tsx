import DefaultLayout from '@/components/Layouts/defaultLayout'
import React from 'react'
import ListEvaluate from './listEvaluate'
import ListComment from '@/components/ListComment'

const Evaluate = () => {
  return (
    <div>
      <DefaultLayout>
        <ListComment />
      </DefaultLayout>
    </div>
  )
}

export default Evaluate
