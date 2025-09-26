import { createSlice } from '@reduxjs/toolkit';

const headingSlice = createSlice({
    name: 'heading',
    initialState: {
        title: 'Heading Title',
    },
    reducers: {
        setHeadingTitle: (state, action) => {
            state.title = action.payload;
        },
    },
});

export const { setHeadingTitle } = headingSlice.actions;
export default headingSlice.reducer;
