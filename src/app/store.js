import { configureStore } from '@reduxjs/toolkit';
import SkillsSlice from '../features/Skills/SkillsSlice';
import statsReducer from '../features/Character/StatsSlice';
import careerSliceReducer from '../features/Career/careerSlice';
import charaSlice from '../features/Character/charaSlice';
import miscSlice from '../features/Character/miscBonusSlice';


export const store = configureStore({
  reducer: {
    stats: statsReducer,
    careers: careerSliceReducer,
    skills: SkillsSlice,
    chara: charaSlice,
    misc: miscSlice,
  },
});
