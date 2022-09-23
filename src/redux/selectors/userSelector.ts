import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../store'

const getUser = (state: RootState) => state.user

const getUserData = createSelector(getUser, (user) => user)

export default getUserData
