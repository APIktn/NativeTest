import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { router, type Href } from 'expo-router'

import { GlassButton } from '@/components/btn/GlassButton'
import { authService, getErrorMessage } from '@/services/auth.service'
import { tokenStorage } from '@/services/token.storage'
import { useAuth } from '@/context/auth.context'

import { styles } from './login.styles'
import type { LoginForm, LoginErrors } from './login.types'
import { validateLogin } from './login.validation'

export default function LoginScreen() {
  const { setUser } = useAuth()

  const [form, setForm] = useState<LoginForm>({
    username: '',
    password: '',
  })

  const [errors, setErrors] = useState<LoginErrors>({})
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)

  const setField =
    (key: keyof LoginForm) =>
    (value: string) => {
      setForm(prev => ({ ...prev, [key]: value }))
      setErrors(prev => ({ ...prev, [key]: undefined }))
      setApiError('')
    }

  const handleSubmit = async () => {
    const newErrors = validateLogin(form)
    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    setLoading(true)
    setApiError('')

    try {
      const res = await authService.login(form)

      await Promise.all([
        tokenStorage.setAccessToken(res.data.accessToken),
        tokenStorage.setRefreshToken(res.data.refreshToken),
      ])

      setUser(res.data.user)
      router.replace('/' as Href)
    } catch (err) {
      setApiError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Text style={styles.title}>Login</Text>

          <TextInput
            style={[styles.input, !!errors.username && styles.inputError]}
            value={form.username}
            onChangeText={setField('username')}
            placeholder="john@example.com"
          />

          <TextInput
            style={[styles.input, !!errors.password && styles.inputError]}
            value={form.password}
            onChangeText={setField('password')}
            placeholder="••••••••"
            secureTextEntry
          />

          {!!apiError && (
            <Text style={styles.errorText}>{apiError}</Text>
          )}

          <GlassButton
            title={loading ? 'Logging in...' : 'Login'}
            onPress={handleSubmit}
          />

          <Pressable onPress={() => router.replace('/register' as Href)}>
            <Text style={styles.linkText}>
              No account? Sign up
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}