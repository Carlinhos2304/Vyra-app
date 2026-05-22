import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <View style={styles.iconWrapper}>
              {/* Fallback pure CSS/Component visual layout for the star icon without external packages */}
              <View style={styles.starIconContainer}>
                <View style={[styles.starDiamond, styles.starHorizontal]} />
                <View style={[styles.starDiamond, styles.starVertical]} />
                <View style={styles.starPlusHorizontal} />
                <View style={styles.starPlusVertical} />
              </View>
            </View>
            <Text style={styles.appName}>Vyra</Text>
            <Text style={styles.subtitle}>Welcome back</Text>
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="your@email.com"
              placeholderTextColor="#999999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#999999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />

            <TouchableOpacity style={styles.signInButton} activeOpacity={0.8}>
              <Text style={styles.signInButtonText}>Sign In</Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* OAuth Section */}
          <TouchableOpacity style={styles.googleButton} activeOpacity={0.8}>
            <View style={styles.googleContent}>
              {/* Fallback envelope layout using views to completely eliminate native SVG dependencies */}
              <View style={styles.envelopeIcon}>
                <View style={styles.envelopeFlap} />
              </View>
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </View>
          </TouchableOpacity>

          {/* Footer Section */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <Link href="/auth/signup" asChild>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.signUpText}>Sign up</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 36,
  },
  iconWrapper: {
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  starIconContainer: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  starDiamond: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#000000',
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
  },
  starHorizontal: {
    width: 24,
    height: 24,
    transform: [{ rotate: '45deg' }, { scaleX: 1.3 }],
  },
  starVertical: {
    width: 24,
    height: 24,
    transform: [{ rotate: '45deg' }, { scaleY: 1.3 }],
  },
  starPlusHorizontal: {
    position: 'absolute',
    top: 6,
    right: 2,
    width: 8,
    height: 2,
    backgroundColor: '#000000',
  },
  starPlusVertical: {
    position: 'absolute',
    top: 3,
    right: 5,
    width: 2,
    height: 8,
    backgroundColor: '#000000',
  },
  appName: {
    fontSize: 32,
    fontWeight: '300',
    color: '#000000',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 8,
  },
  formContainer: {
    width: '100%',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    height: 52,
    backgroundColor: '#F5F5F5',
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#000000',
  },
  signInButton: {
    height: 52,
    backgroundColor: '#1C1A17',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    paddingHorizontal: 4,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#EAEAEA',
  },
  dividerText: {
    fontSize: 12,
    color: '#999999',
    marginHorizontal: 12,
    fontWeight: '500',
  },
  googleButton: {
    height: 52,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginBottom: 40,
  },
  googleContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  envelopeIcon: {
    width: 18,
    height: 13,
    borderWidth: 1.5,
    borderColor: '#000000',
    borderRadius: 1,
    marginRight: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  envelopeFlap: {
    position: 'absolute',
    top: -5,
    left: 2,
    width: 11,
    height: 11,
    borderBottomWidth: 1.5,
    borderRightWidth: 1.5,
    borderColor: '#000000',
    transform: [{ rotate: '45deg' }],
  },
  googleButtonText: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '500',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666666',
  },
  signUpText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '500',
  },
});