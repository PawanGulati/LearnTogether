import {createSelector} from 'reselect'

// input selector
const selectMentor = state => state.mentor

//output selector
export const selectCurMentor = createSelector(
    [selectMentor],
    mentor => mentor.cur_mentor
)

export const selectMentorError = createSelector(
    [selectMentor],
    mentor => mentor.error
)

export const selectMentorLoading = createSelector(
    [selectMentor],
    mentor => mentor.loading
)

export const selectPopMessage = createSelector(
    [selectMentor],
    mentor => mentor.popUp.text
)

export const selectPopMessageType = createSelector(
    [selectMentor],
    mentor => mentor.popUp.type
)

export const selectPopMessageState= createSelector(
    [selectMentor],
    mentor => mentor.popUp.open
)