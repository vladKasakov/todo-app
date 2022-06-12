import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setActiveField } from '../../store/reducers/filterSlice';
import { setFilteredTodos } from '../../store/reducers/todoSlice';

import styles from './Filter.module.scss';

const Filter = () => {
  const [thereAreActive, setThereAreActive] = useState(false);
  const [thereAreCompleted, setThereAreCompleted] = useState(false);

  const { todos } = useAppSelector((state) => state.todos);
  const activeField = useAppSelector((state) => state.filter);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (activeField === 'all') {
      dispatch(setFilteredTodos(todos));
    } else if (activeField === 'active') {
      dispatch(setFilteredTodos(todos.filter((todo) => !todo.completed)));
    } else if (activeField === 'completed') {
      dispatch(setFilteredTodos(todos.filter((todo) => todo.completed)));
    }

    setThereAreActive(todos.some((todo) => !todo.completed));
    setThereAreCompleted(todos.some((todo) => todo.completed));
  }, [activeField, todos, dispatch]);

  useEffect(() => {
    if (activeField === 'active' && !thereAreActive) {
      dispatch(setActiveField('all'));
    }
    if (activeField === 'completed' && !thereAreCompleted) {
      dispatch(setActiveField('all'));
    }
  }, [thereAreActive, thereAreCompleted, activeField, dispatch]);

  return (
    <div className={styles.filter}>
      <button
        className={activeField === 'all' ? styles.active : undefined}
        onClick={() => dispatch(setActiveField('all'))}
      >
        All
      </button>
      <button
        disabled={!thereAreActive}
        className={activeField === 'active' ? styles.active : undefined}
        style={{ color: !thereAreActive ? 'var(--faded-text)' : undefined }}
        onClick={() => dispatch(setActiveField('active'))}
      >
        Active
      </button>
      <button
        disabled={!thereAreCompleted}
        className={activeField === 'completed' ? styles.active : undefined}
        style={{
          color: !thereAreCompleted ? 'var(--faded-text)' : undefined,
        }}
        onClick={() => dispatch(setActiveField('completed'))}
      >
        Completed
      </button>
    </div>
  );
};

export default Filter;
