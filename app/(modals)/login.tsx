import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';
import { TextInput } from 'react-native-gesture-handler';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useOAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

enum Strategy {
  Google = 'oauth_google',
}

const Page = () => {
  const router = useRouter();

  // For android (performance optimization)
  useWarmUpBrowser();

  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' });

  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.back();
      }
    } catch (err) {
      console.error('[ERROR_OAUTH]', err);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize='none'
        autoFocus
        placeholder='Email'
        style={[defaultStyles.inputField, { marginBottom: 30 }]}
      />
      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>

      <View style={styles.seperatorView}>
        <View style={{ flex: 1, borderBottomColor: '#000', borderBottomWidth: StyleSheet.hairlineWidth }} />
        <Text style={styles.seperator}>or</Text>
        <View style={{ flex: 1, borderBottomColor: '#000', borderBottomWidth: StyleSheet.hairlineWidth }} />
      </View>

      <View style={{ gap: 20 }}>
        <TouchableOpacity style={styles.btnOutline}>
          <Ionicons name='call-outline' style={defaultStyles.btnIcon} size={24} />
          <Text style={styles.btnOutlineText}>Continue with Phone</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnOutline}>
          <Ionicons name='md-logo-apple' style={defaultStyles.btnIcon} size={24} />
          <Text style={styles.btnOutlineText}>Continue with Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Google)}>
          <Ionicons name='md-logo-google' style={defaultStyles.btnIcon} size={24} />
          <Text style={styles.btnOutlineText}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnOutline}>
          <Ionicons name='md-logo-facebook' style={defaultStyles.btnIcon} size={24} />
          <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 26,
  },
  seperatorView: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 30,
  },
  seperator: {
    color: Colors.grey,
  },
  btnOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: '#000',
    fontSize: 16,
  },
});
export default Page;
