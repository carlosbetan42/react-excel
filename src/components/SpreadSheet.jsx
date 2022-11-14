import { useState } from 'react';
import { useSpreadSheet } from '../hooks/useSpreadSheet';

const FIRST_CHAR_CODE = 65;

const range = (length) => Array.from({ length }, (_, i) => i);
const getColumn = (i) => String.fromCharCode(FIRST_CHAR_CODE + i);

const SpreadSheet = ({ rows, columns }) => {
  const { cells, updateCell } = useSpreadSheet({ rows, columns });

  return (
    <table className='[&_td]:w-16'>
      <thead>
        <tr>
          <th />
          {range(columns).map((column) => (
            <th className='bg-slate-300' key={column}>
              {getColumn(column)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {range(rows).map((row) => (
          <tr key={row}>
            <td className='bg-slate-300' key={row}>
              {row + 1}
            </td>
            {range(columns).map((column) => (
              <td key={column}>
                <Cell
                  x={column}
                  y={row}
                  cell={cells[column][row]}
                  update={(value) => {
                    updateCell({ x: column, y: row, value });
                  }}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SpreadSheet;

const Cell = ({ x, y, cell, update }) => {
  const [isInput, setIsInput] = useState(false);

  if (isInput) {
    return (
      <input
        autoFocus
        defaultValue={cell}
        onBlur={(e) => {
          setIsInput(false);
          update(e.target.value);
        }}
        className='w-full'
      />
    );
  }

  return (
    <span className='w-full block' onClick={() => setIsInput(true)}>
      {cell}
    </span>
  );
};

// const Cell = ({ x, y, cell, update }) => <span onClick={() => update(cell + 1)}>{cell}</span>;
