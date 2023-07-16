import { Text, Button } from 'react-native';
import { useItems } from '../../hooks';

export const Items = () => {
  const { items, isLoading, error, invalidateQuery } = useItems();

  if (isLoading) {
    return <Text>Loading items...</Text>;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <>
      <Button title="Invalidate" onPress={invalidateQuery} />
      {items.map((item) => {
        return <Text>{item.name}</Text>;
      })}
    </>
  );
};
