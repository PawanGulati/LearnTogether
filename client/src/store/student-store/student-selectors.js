import {createSelector} from 'reselect'

// input selector
const selectStudent = state => state.student

//output selector
export const selectCurStudent = createSelector(
    [selectStudent],
    student => student.cur_student
)

export const selectStudentError = createSelector(
    [selectStudent],
    student => student.error
)

export const selectStudentLoading = createSelector(
    [selectStudent],
    student => student.loading
)

export const selectPopMessage = createSelector(
    [selectStudent],
    student => student.popUp.text
)

export const selectPopMessageType = createSelector(
    [selectStudent],
    student => student.popUp.type
)

export const selectPopMessageState= createSelector(
    [selectStudent],
    student => student.popUp.open
)