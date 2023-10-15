import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import SubjectReducer from '@/store/reducers/subjectReducer';
import { actions } from '@/store/acitons/actions';
import { ActionsTypes, IAppDispatch } from '@/store/types/types';

export const reducers = combineReducers({
  subject: SubjectReducer
})

export type RootState = ReturnType<typeof store.getState>

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducers, composeEnhancers(applyMiddleware<IAppDispatch, any>(thunk)))

export type ActionsType = ActionsTypes<typeof actions>

