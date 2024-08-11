import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the type for the visibility settings state
interface VisibilityState {
  [component: string]: boolean;
}

// Define the initial state
const initialState: VisibilityState = {};

// Define the type for async thunks
interface AsyncThunkConfig {
  state: VisibilityState;
}

// Async thunk for fetching settings
export const fetchSettings = createAsyncThunk<VisibilityState, void, AsyncThunkConfig>(
  'visibility/fetchSettings',
  async () => {
    const response = await axios.get('http://localhost:5000/api/Compoentsettings');
    return response.data.reduce((acc: VisibilityState, { component, isVisible }: { component: string; isVisible: boolean }) => {
      acc[component] = isVisible;
      return acc;
    }, {});
  }
);

// Async thunk for updating settings
export const updateSetting = createAsyncThunk<
  { component: string; isVisible: boolean },
  { component: string; isVisible: boolean },
  AsyncThunkConfig
>('visibility/updateSetting', async ({ component, isVisible }) => {
  await axios.post('http://localhost:5000/api/Compoentsettings', { component, isVisible });
  return { component, isVisible };
});

// Slice
const visibilitySlice = createSlice({
  name: 'visibility',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.fulfilled, (state, action: PayloadAction<VisibilityState>) => {
        return action.payload;
      })
      .addCase(updateSetting.fulfilled, (state, action: PayloadAction<{ component: string; isVisible: boolean }>) => {
        state[action.payload.component] = action.payload.isVisible;
      });
  },
});

export default visibilitySlice.reducer;
