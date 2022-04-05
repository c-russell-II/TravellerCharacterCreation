import { configureStore } from '@reduxjs/toolkit';
import SkillsSlice from '../features/Character/SkillsSlice';
import statsReducer from '../features/Character/StatsSlice';
import careerSliceReducer from '../features/Career/careerSlice';
import charaSlice from '../features/Career/charaSlice';


export const store = configureStore({
  reducer: {
    stats: statsReducer,
    careers: careerSliceReducer,
    skills: SkillsSlice,
    chara: charaSlice,
  },
});
