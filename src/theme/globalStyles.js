import {StyleSheet} from 'react-native';
import {colors} from './colors';

export const globalStyles = StyleSheet.create({
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    borderRadius: 20,
    height: 50,
  },
  input: {
    width: '80%',
    height: 50,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: colors.primary,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  logo: {
    width: 150,
    height: 150,
  },
  primaryButton: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    width: '80%',
    borderRadius: 20,
    height: 50,
  },
  secondaryButton: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 20,
    height: 50,
  },
});

export const authStyles = StyleSheet.create({});
