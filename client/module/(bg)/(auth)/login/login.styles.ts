import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    backgroundColor: 'rgba(0,0,0,0.45)',
    padding: 28,
    gap: 16,
  },
  title: {
    color: '#fff',
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 4,
    fontFamily: 'Mitr-SemiBold',
  },
  fieldWrapper: {
    gap: 4,
  },
  label: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 13,
    fontFamily: 'Mitr-Regular',
    marginLeft: 4,
  },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    fontFamily: 'Mitr-Regular',
  },
  inputError: {
    borderColor: 'rgba(255,80,80,0.8)',
  },
  errorText: {
    color: 'rgba(255,100,100,1)',
    fontSize: 12,
    fontFamily: 'Mitr-Regular',
    marginLeft: 4,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 16,
  },
  inputRowInner: {
    flex: 1,
    color: '#fff',
    paddingVertical: 12,
    fontSize: 15,
    fontFamily: 'Mitr-Regular',
  },
  eyeBtn: {
    padding: 4,
  },
  eyeText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 18,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginVertical: 4,
  },
  linkText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 13,
    textAlign: 'center',
    fontFamily: 'Mitr-Regular',
  },
  linkHighlight: {
    color: '#fff',
    fontFamily: 'Mitr-SemiBold',
  },
});
