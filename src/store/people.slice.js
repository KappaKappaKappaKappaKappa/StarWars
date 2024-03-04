import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const peoplesUrl = "https://swapi.dev/api/people";

export const getAllPeoples = createAsyncThunk(
  "peoples/getPeoples",
  async function () {
    try {
      const peoples = await fetch(peoplesUrl);
      const peoplesData = await peoples.json();
      return peoplesData;
    } catch (error) {
      throw error;
    }
  }
);

export const getStarships = createAsyncThunk(
  "peoples/getStarships",
  async function (links) {
    try {
      const starshipsData = await Promise.all(
        links.map(async (link) => {
          const starship = await fetch(link);
          const starshipData = await starship.json();
          return starshipData;
        })
      );
      return starshipsData;
    } catch (error) {}
  }
);

const peopleSlice = createSlice({
  name: "peoples",
  initialState: {
    peoples: [],
    starships: [],
    status: null,
    error: null,
  },
  reducers: {
    clearStateStarships(state, action) {
      state.starships = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPeoples.pending, (state) => {
        state.status = "Loading";
        state.error = null;
      })
      .addCase(getAllPeoples.fulfilled, (state, action) => {
        state.status = "Resolve";
        state.peoples = action.payload.results;
      })
      .addCase(getAllPeoples.rejected, (state, action) => {
        console.log(action.error);
      })
      .addCase(getStarships.pending, (state) => {
        state.status = "Loading";
        state.error = null;
      })
      .addCase(getStarships.fulfilled, (state, action) => {
        state.status = "Resolve";
        state.starships = action.payload;
      })
      .addCase(getStarships.rejected, (state, action) => {
        console.log(action.error);
      });
  },
});

export const { clearStateStarships } = peopleSlice.actions;

export default peopleSlice.reducer;
