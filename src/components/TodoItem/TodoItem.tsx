import { Reorder } from 'framer-motion';
import { useState } from 'react';

import { ReactComponent as Cross } from '../../assets/icon-cross.svg';
import { useAppDispatch } from '../../hooks/redux';
import { ITodo } from '../../models';
import { deleteTodo, toggleTodo } from '../../store/reducers/todoSlice';
import styles from './TodoItem.module.scss';

type Props = {
  filteredTodo: ITodo;
};

const TodoItem = ({ filteredTodo }: Props) => {
  const { completed, id, text } = filteredTodo;
  const [btnOpacity, setbtnOpacity] = useState({ opacity: 0 });
  const dispatch = useAppDispatch();

  const handleMouseEnter = () => {
    setbtnOpacity({ opacity: 1 });
  };
  const handleMouseLeave = () => {
    setbtnOpacity({ opacity: 0 });
  };
  const toggleTodoComplete = () => {
    dispatch(toggleTodo(id));
  };
  const removeTodo = () => {
    dispatch(deleteTodo(id));
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
    <Reorder.Item
      value={filteredTodo}
      layoutId={String(id)}
      layout
      className={styles.item}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      variants={variant}
      initial="hidden"
      animate="show"
      exit="hidden"
      transition={transition}
    >
      <input
        type="checkbox"
        checked={completed}
        onChange={toggleTodoComplete}
      />

      <span className={completed ? styles.completed : undefined}>{text}</span>

      <Cross style={btnOpacity} className={styles.cross} onClick={removeTodo} />
    </Reorder.Item>
  );
};

export default TodoItem;
