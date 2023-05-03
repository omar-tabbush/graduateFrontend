import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { privateAxios } from "../../api/axios";

export const deleteDesign = createAsyncThunk(
  "design/delete",
  async (id) => {
    try {
      const response = await privateAxios.delete(`Design/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateDesign = createAsyncThunk(
  "design/update",
  async ({ id, design }) => {
    try {
      const response = await privateAxios.put(
        `Design/${id}`,
        JSON.stringify(design)
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addDesign = createAsyncThunk(
  "design/add",
  async (design) => {
    try {
      const response = await privateAxios.post(
        "Design",
        design
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getDesigns = createAsyncThunk(
  "design/all",
  async () => {
    try {
      const response = await axios.get("Design/all");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const getDesign = createAsyncThunk(
  "design/",
  async (id) => {
    try {
      const response = await axios.get(`Design/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);
//TODO
//what is designAdded
const designSlice = createSlice({
  name: "designList",
  initialState: {
    design: {},
    designs: [],
    status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getDesigns.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getDesigns.fulfilled, (state, action) => {
        state.designs = action.payload;
        state.status = "succeeded";
      })
      .addCase(getDesigns.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getDesign.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getDesign.fulfilled, (state, action) => {
        state.design = action.payload;
        state.status = "succeeded";
      })
      .addCase(getDesign.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "failed";
      })
      .addCase(addDesign.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addDesign.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.designs.push(action.payload);
      })
      .addCase(addDesign.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateDesign.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateDesign.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.designs.map((design) => {
          if (design.id === action.payload.id) {
            design = action.payload;
          } else {
            state.status = "failed";
          }
        });
      })
      .addCase(updateDesign.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteDesign.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteDesign.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.designs = state.designs.filter(
          (design) => design.id !== action.payload.id
        );
      })
      .addCase(deleteDesign.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Selectors
export const selectDesigns = (state) =>
  state.designList.designs;
export const selectDesign = (state) =>
  state.designList.design;
export const selectDesignStatusState = (state) =>
  state.designList.status;
export const selectDesignErrorState = (state) =>
  state.designList.error;

export default designSlice.reducer;
