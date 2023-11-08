import { useEffect } from 'react';
import { View, Text } from 'react-native';

interface Props {
  listings: any[];
  category: string;
}

const Listings = ({ category, listings }: Props) => {
  useEffect(() => {
    console.log('Listings ~ category:', listings.length);
  }, [category]);

  return (
    <View>
      <Text>Listings</Text>
    </View>
  );
};
export default Listings;
