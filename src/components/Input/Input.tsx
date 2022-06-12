import { useEffect, useRef, useState } from 'react';

import { useAppDispatch } from '../../hooks/redux';
import { addTodo } from '../../store/reducers/todoSlice';
import styles from './Input.module.scss';

const Input = () => {
  let [text, setText] = useState('');
  let inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const handleValue: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setText(e.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (text.trim().length) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <input className={styles.circle} type="checkbox" disabled />
      <input
        placeholder="Create a new todo..."
        className={styles.input}
        value={text}
        onChange={handleValue}
        ref={inputRef}
      />
    </form>
  );
};

export default Input;
