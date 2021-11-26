import {createSelector} from 'reselect'

// input selectors
const selectUser = state => state.user

// output selectors
export const selectCurUser = createSelector(
    [selectUser],
    user => user.cur_user
)

export const selectUserError = createSelector(
    [selectUser],
    user => user.error
)

export const selectUserLoading = createSelector(
    [selectUser],
    user => user.loading
)

export const selectAuthMessage = createSelector(
    [selectUser],
    user => user.popUp.text
)

export const selectAuthMessageType = createSelector(
    [selectUser],
    user => user.popUp.type
)

export const selectAuthMessageState= createSelector(
    [selectUser],
    user => user.popUp.open
)
