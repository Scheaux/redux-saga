import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setItems } from '../../redux/slices/services';
import Service from './Service';
import Loading from './Loading';
import Error from './Error';

function Services() {
  const dispatch = useDispatch();

  const { items, loading, error } = useSelector((state) => state.services);

  const url = 'https://maindetailsbackend.herokuapp.com/api/services';

  useEffect(() => {
    dispatch(setItems(url));
  }, []);

  return loading === true ? (
    <Loading />
  ) : error ? (
    <Error msg={error.message} url={url} />
  ) : (
    <ul>
      {items.map((x) => {
        return <Service key={x.id} name={x.name} price={x.price} id={x.id} />;
      })}
    </ul>
  );
}

export default Services;
