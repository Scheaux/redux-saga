import React from 'react';
import { useDispatch } from 'react-redux';
import { setItems } from '../../redux/slices/services';

function Error({ msg, url }) {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(setItems(url));
  }

  return (
    <div>
      <span style={{ color: 'red' }}>{msg}</span>
      <button onClick={handleClick}>Повторить</button>
    </div>
  );
}

export default Error;
