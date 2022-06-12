import { motion } from 'framer-motion';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ITodo } from '../../models';
import { deleteCompleted } from '../../store/reducers/todoSlice';
import Filter from '../Filter/Filter';
import styles from './ListPanel.module.scss';

const ListPanel = () => {
  const { todos } = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();

  const countUncompleted = (todos: ITodo[]) => {
    let count = 0;
    todos.forEach((todo) => {
      if (!todo.completed) count++;
    });
    return count;
  };

  const deleteCompletedTodos = () => {
    dispatch(deleteCompleted());
  };

  const variant = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
    },
  };

  const transition = {
    duration: 0.5,
  };

  return (
    <motion.li
      layout
      variants={variant}
      initial="hidden"
      animate="show"
      exit="hidden"
      transition={transition}
      className={styles.panel}
    >
      <span>{countUncompleted(todos)} items left</span>
      <Filter />
      <button className={styles.deleteCompleted} onClick={deleteCompletedTodos}>
        <span>Clear Completed</span>
      </button>
    </motion.li>
  );
};

export default ListPanel;
