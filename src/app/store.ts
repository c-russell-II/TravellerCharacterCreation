import { combineReducers, configureStore, createListenerMiddleware, CreateListenerMiddlewareOptions } from '@reduxjs/toolkit';
import SkillsSlice from '../features/Skills/SkillsSlice';
import statsReducer from '../features/Character/StatsSlice';
import careerSliceReducer from '../features/Career/careerSlice';
import charaSlice from '../features/Character/charaSlice';
import miscSlice from '../features/Character/miscBonusSlice';
import TermSlice from '../features/TermSlice/TermSlice';
import EducationSlice from '../features/education/Utilities/EducationSlice';
import prisonSlice from '../features/Prison/Utilities/prisonSlice';
// import toastWatcher from './toastWatcher';
// import toastSlice from '../features/Tracker/ToastSlice';

const rootReducer = combineReducers({
  prison: prisonSlice,
  stats: statsReducer,
  careers: careerSliceReducer,
  skills: SkillsSlice,
  chara: charaSlice,
  misc: miscSlice,
  term: TermSlice,
  education: EducationSlice,
  // toasts: toastSlice
})
export const store = configureStore({
  reducer: rootReducer,
  // middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(toastWatcher)
});
export type RootState = ReturnType<typeof rootReducer>