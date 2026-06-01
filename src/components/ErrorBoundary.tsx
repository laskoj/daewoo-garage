import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
};

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  reset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Coś poszło nie tak.</Text>
          <Text style={styles.text}>Spróbuj ponownie uruchomić widok.</Text>
          <Pressable style={styles.button} onPress={this.reset}>
            <Text style={styles.buttonText}>Spróbuj ponownie</Text>
          </Pressable>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
  },
  text: {
    color: '#6b7280',
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
});
