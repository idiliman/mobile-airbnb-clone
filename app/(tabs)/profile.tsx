import { useAuth } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import { View, Text, Button } from 'react-native';
const Page = () => {
  const { signOut, isSignedIn } = useAuth();

  return (
    <View>
      {!isSignedIn ? (
        <Link href={'/(modals)/login'}>
          <Text>Login</Text>
        </Link>
      ) : (
        <Button title='Log out' onPress={() => signOut()} />
      )}
    </View>
  );
};
export default Page;
