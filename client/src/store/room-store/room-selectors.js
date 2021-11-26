import {createSelector} from 'reselect'

// input selector
const selectRoom = state => state.room

//output selector
export const selectCurRoom = createSelector(
    [selectRoom],
    room => room.cur_room
)

export const selectCurRooms = createSelector(
    [selectRoom],
    room => room.rooms
)

export const selectRoomError = createSelector(
    [selectRoom],
    room => room.error
)

export const selectRoomLoading = createSelector(
    [selectRoom],
    room => room.loading
)
