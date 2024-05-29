import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
    notes: [],
    dialogState: {
        createNotesDialog: false,
        deleteNotesDialog: false,
    },
    searchInput: '',
    pagination: {
        page: 0,
        rowsPerPage: 5
    }
};

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        handleCreateDialog: (state, action) => {
            state.dialogState.createNotesDialog = action.payload;
        },
        handleDeleteDialog: (state, action) => {
            state.dialogState.deleteNotesDialog = action.payload;
        },
        handleAddNotes: (state, action) => {
            state.notes.push(action.payload);
            toast.success('Notes Added Successfully!')

        },
        handleUpdateNote: (state, action) => {
            const { id, description, title } = action.payload;
            const note = state.notes.find(item => item.id === id);
            if (note) {
                note.description = description;
                note.title = title;
            }
            toast.success('Notes Updated Successfully!')
        },
        handleDeleteNote: (state, action) => {
            state.notes = state.notes.filter(note => note.id !== action.payload);
            toast.success('Notes Deleted Successfully!')
        },
        handleSearch: (state, action) => {
            state.searchInput = action.payload;
        },
        handleChangePage: (state, action) => {
            state.pagination.page = action.payload;
        },
        handleChangeRowsPerPage: (state, action) => {
            state.pagination.rowsPerPage = action.payload;
            state.pagination.page = 0;
        },
        handleStatus: (state, action) => {
            const note = state.notes.find(item => item.id === action.payload);
            if (note) {
                note.status = !note?.status;
                toast.success('Status Updated!')
            }
        }
    },
});

export const { handleCreateDialog, handleUpdateNote, handleAddNotes, handleDeleteDialog, handleDeleteNote, handleSearch, handleChangePage, handleChangeRowsPerPage, handleStatus } = notesSlice.actions;
export default notesSlice.reducer;
