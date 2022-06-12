import Header from '../Header/Header';
import Input from '../Input/Input';
import TodoList from '../TodoList/TodoList';
import styles from './Todo.module.scss';

const Todo = () => {
  return (
    <div className={styles.todo}>
      <Header />
      <Input />
      <TodoList />
    </div>
  );
};

export default Todo;
