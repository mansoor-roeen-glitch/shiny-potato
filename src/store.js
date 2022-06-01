import {configureStore} from '@reduxjs/toolkit';
import stateSlicer from './slicers/stateSlicer';
import dataSlicer from './slicers/dataSlicer';

export const store = configureStore({
  reducer: {
    state: stateSlicer,
    data: dataSlicer,
  }
});

