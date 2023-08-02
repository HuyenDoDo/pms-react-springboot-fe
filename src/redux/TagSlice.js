import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createTag,
  deleteTag,
  editTag,
  getAllTags,
} from "../service/TagService";

const initialState = {
  tags: [],
  tag: {},
  error: false,
  message: [],
  loading: false,
};

export const tagSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    // tagAdded: {
    //   reducer(state, action) {
    //     state.tags.push(action.payload);
    //   },
    //   prepare(name) {
    //     return {
    //       payload: {
    //         name: name,
    //       },
    //     };
    //   },
    // },
    // tagUpdated: (state, action) => {
    //   const { id, name } = action.payload;
    //   const existingTag = state.tags.find((tag) => tag.id === id);
    //   if (existingTag) existingTag.name = name;
    // },
    // tagErrors: (state, action) => {
    //   state.status = "failed";
    //   state.error = action.payload;
    // },
    clearNotify: (state) => {
      state.message = [];
      state.error = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTagsFunc.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTagsFunc.fulfilled, (state, action) => {
        state.loading = false;
        state.tags = action.payload;
      })
      .addCase(createTagFunc.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTagFunc.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.message = ["Create New Tag Succeed"];
      })
      .addCase(createTagFunc.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(editTagFunc.pending, (state) => {
        state.loading = true;
      })
      .addCase(editTagFunc.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.message = ["Update Tag Succeed"];
      })
      .addCase(editTagFunc.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(deleteTagFunc.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTagFunc.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.message = [action.payload];
      })
      .addCase(deleteTagFunc.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});

export const {
  // tagAdded, tagUpdated
  // tagErrors,
  clearNotify,
} = tagSlice.actions;

export default tagSlice.reducer;

// export const selectAllTags = (state) => {
//   console.log(state.tags.tags);
//   return state.tags.tags;
// };

// export const selectTagError = (state) => {
//   return state.tags.error;
// };

// export const selectTagMessage = (state) => {
//   return state.tags.message;
// };

export const fetchTagsFunc = createAsyncThunk(
  "tags/fetchTagsFunc",
  async () => {
    const response = await getAllTags();
    return response.data;
  }
);

export const createTagFunc = createAsyncThunk(
  "tags/createTagFunc",
  async ({ data }, { dispatch, rejectWithValue }) => {
    try {
      const response = await createTag(data);
      dispatch(fetchTagsFunc());
      // alert("Create new tag succeed");
      return response.data;
    } catch (error) {
      // window.alert(error.response.data.errors);
      return rejectWithValue(error.response.data.errors);
    }
  }
);

export const editTagFunc = createAsyncThunk(
  "tags/editTagFunc",
  async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
      const response = await editTag(id, data);
      dispatch(fetchTagsFunc());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

export const deleteTagFunc = createAsyncThunk(
  "tags/deleteTagFunc",
  async ({ id }, { dispatch, rejectWithValue }) => {
    try {
      const response = await deleteTag(id);
      dispatch(fetchTagsFunc());
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(["Constraint Conflict Error"]);
    }
  }
);
