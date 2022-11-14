import { useReducer } from 'react';

const getInitialState = ({ columns, rows }) => {
  const cells = Array.from({ length: columns }, () => Array.from({ length: rows }, () => 0));

  return { cells };
};

const reducer = (state, action) => {
  const { type, payload } = action;

  if (type === 'updateCell') {
    const cells = structuredClone(state.cells);
    const { x, y, value } = payload;

    cells[x][y] = value;

    return { cells };
  }

  return state;
};

export const useSpreadSheet = ({ columns, rows }) => {
  const [{ cells }, dispatch] = useReducer(reducer, getInitialState({ columns, rows }));

  const updateCell = ({ x, y, value }) => {
    dispatch({ type: 'updateCell', payload: { x, y, value } });
  };

  return { cells, updateCell };
};
