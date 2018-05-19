import { createSelector } from 'reselect';

export const todosSelector = state => (state.get('todos'));

export const byIdSelector = createSelector(todosSelector, todos => todos.get('byId'));

export const idsSelector = createSelector(todosSelector, todos => todos.get('ids'));

export const isChangingSelector = createSelector(todosSelector, todos => todos.get('isChanging'));