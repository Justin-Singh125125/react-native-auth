import { api } from '../../api';
import { Item } from '../../types';
import { useState, useEffect } from 'react';

export const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const query = () => {
    setIsLoading(true);
    setError(null);

    api
      .getItems()
      .then(({ data }) => {
        setItems(data);
      })
      .catch((e) => {
        console.log(e);
        setError(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const invalidateQuery = () => {
    query();
  };

  useEffect(() => {
    query();
  }, []);

  return { items, isLoading, error, invalidateQuery };
};
