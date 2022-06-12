import { AnimatePresence, motion, Reorder } from 'framer-motion';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ITodo } from '../../models';
import { reorderTodos } from '../../store/reducers/todoSlice';
import ListPanel from '../ListPanel/ListPanel';
import TodoItem from '../TodoItem/TodoItem';
import styles from './TodoList.module.scss';

const TodoList = () => {
  const { todos, filteredTodos } = useAppSelector((state) => state.todos);

  const dispatch = useAppDispatch();

  const setTodos = (todos: ITodo[]) => {
    dispatch(reorderTodos(todos));
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
    <motion.div layout className={styles.content}>
      <Reorder.Group
        layout
        values={todos}
        onReorder={setTodos}
        className={styles.list}
        variants={variant}
        initial="hidden"
        animate="show"
        exit="hidden"
        transition={transition}
      >
        {filteredTodos.map((todo) => (
          <TodoItem filteredTodo={todo} key={todo.id} />
        ))}
      </Reorder.Group>
      <motion.div layout transition={transition}>
        <AnimatePresence>{todos.length > 0 && <ListPanel />}</AnimatePresence>
      </motion.div>
      <motion.div layout transition={transition}>
        <AnimatePresence>
          {filteredTodos.length > 0 && (
            <motion.div
              layout
              variants={variant}
              initial="hidden"
              animate="show"
              exit="hidden"
              transition={transition}
              className={styles.infodrag}
            >
              Drag and drop to reorder list
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default TodoList;
