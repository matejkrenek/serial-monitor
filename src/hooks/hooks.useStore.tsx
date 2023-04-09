import React from 'react'
import { StoreContext } from '@/store'

const useStore = () => React.useContext(StoreContext)

export default useStore
