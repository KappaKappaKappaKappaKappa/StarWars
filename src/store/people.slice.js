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
    } catch (error) {
      throw error;
    }
  }
);

export const getHomeworld = createAsyncThunk(
  "peoples/getHomeWorld",
  async function (link) {
    try {
      const homeword = await fetch(link);
      const homewordData = await homeword.json();
      return homewordData;
    } catch (error) {
      throw error;
    }
  }
);

export const getFilms = createAsyncThunk(
  "peoples/getFilms",
  async function (links) {
    try {
      const filmsData = await Promise.all(
        links.map(async (link) => {
          const film = await fetch(link);
          const filmData = await film.json();
          return filmData;
        })
      );
      return filmsData;
    } catch (error) {
      throw error;
    }
  }
);

const peopleSlice = createSlice({
  name: "peoples",
  initialState: {
    peoples: [],
    starships: [],
    films: [],
    homeworld: null,
    status: null,
    error: null,
  },
  reducers: {
    clearStateStarships(state, action) {
      state.starships = [];
    },

    clearStateFilms(state, action) {
      state.films = [];
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
      })
      .addCase(getFilms.pending, (state) => {
        state.status = "Loading";
        state.error = null;
      })
      .addCase(getFilms.fulfilled, (state, action) => {
        state.status = "Resolve";
        state.films = action.payload;
      })
      .addCase(getFilms.rejected, (state, action) => {
        console.log(action.error);
      })
      .addCase(getHomeworld.pending, (state) => {
        state.status = "Loading";
        state.error = null;
      })
      .addCase(getHomeworld.fulfilled, (state, action) => {
        state.status = "Resolve";
        state.homeworld = action.payload.name;
      })
      .addCase(getHomeworld.rejected, (state, action) => {
        console.log(action.error);
      });
  },
});

export const { clearStateStarships, clearStateFilms } = peopleSlice.actions;

export default peopleSlice.reducer;
