import EnvironmentHelper from "@/helpers/EnvironmentHelper";
import { IPresignerCacheItem } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const TTL = EnvironmentHelper.PRESIGNER_TTL * 60 * 1000;

interface IState {
  cache: IPresignerCacheItem[]
}

const initialState: IState = {
  cache: []
};

const presignerSlice = createSlice({
  name: "presigner",
  initialState,
  reducers: {
    addUrl(state, { payload }: { payload: { original: string, presigned: string } }) {
      const item: IPresignerCacheItem = {
        orginal: payload.original,
        presigned: payload.presigned,
        expiration: Date.now() + TTL
      }
      const _cache = state.cache.filter(item => item.orginal !== payload.original)
      const cache: IPresignerCacheItem[] = [..._cache, item]
      state.cache = cache
    }
  },
  extraReducers(builder) {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const { addUrl } =
  presignerSlice.actions;
export default presignerSlice.reducer;
