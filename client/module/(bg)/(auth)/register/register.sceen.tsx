import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router, type Href } from "expo-router";

import { GlassButton } from "@/components/btn/GlassButton";
import { Ionicons } from "@expo/vector-icons";
import { authService, getErrorMessage } from "@/services/auth.service";
import { styles } from "./register.styles";

import type { RegisterForm, RegisterErrors } from "./register.types";
import { validateRegister } from "./register.validation";

function Field({
  label,
  value,
  onChangeText,
  error,
  placeholder,
  keyboardType,
  autoCapitalize,
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  error?: string;
  placeholder?: string;
  keyboardType?: any;
  autoCapitalize?: any;
}) {
  return (
    <View style={styles.fieldWrapper}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={[styles.input, !!error && styles.inputError]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="rgba(255,255,255,0.35)"
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize ?? "none"}
        autoCorrect={false}
      />

      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

function PasswordField({
  label,
  value,
  onChangeText,
  error,
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  error?: string;
}) {
  const [show, setShow] = useState(false);

  return (
    <View style={styles.fieldWrapper}>
      <Text style={styles.label}>{label}</Text>

      <View style={[styles.inputRow, !!error && styles.inputError]}>
        <TextInput
          style={styles.inputRowInner}
          value={value}
          onChangeText={onChangeText}
          placeholder="••••••••"
          placeholderTextColor="rgba(255,255,255,0.35)"
          secureTextEntry={!show}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Pressable onPress={() => setShow((p) => !p)} style={styles.eyeBtn}>
          <Ionicons
            name={show ? "eye-off" : "eye"}
            size={20}
            color="rgba(255,255,255,0.7)"
          />
        </Pressable>
      </View>

      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

export default function RegisterScreen() {
  const [form, setForm] = useState<RegisterForm>({
    firstName: "",
    lastName: "",
    userEmail: "",
    password: "",
  });

  const [errors, setErrors] = useState<RegisterErrors>({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const setField = (key: keyof RegisterForm) => (value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setApiError("");
  };

  const handleSubmit = async () => {
    const newErrors = validateRegister(form);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    setApiError("");

    try {
      await authService.register(form);
      router.replace("/login" as Href);
    } catch (err) {
      setApiError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Text style={styles.title}>Sign Up</Text>

          <Field
            label="First Name"
            value={form.firstName}
            onChangeText={setField("firstName")}
            error={errors.firstName}
            placeholder="John"
            autoCapitalize="words"
          />

          <Field
            label="Last Name"
            value={form.lastName}
            onChangeText={setField("lastName")}
            error={errors.lastName}
            placeholder="Doe"
            autoCapitalize="words"
          />

          <Field
            label="Email"
            value={form.userEmail}
            onChangeText={setField("userEmail")}
            error={errors.userEmail}
            placeholder="john@example.com"
            keyboardType="email-address"
          />

          <PasswordField
            label="Password"
            value={form.password}
            onChangeText={setField("password")}
            error={errors.password}
          />

          {!!apiError && <Text style={styles.errorText}>{apiError}</Text>}

          <GlassButton
            title={loading ? "Registering..." : "Register"}
            onPress={handleSubmit}
          />

          <View style={styles.divider} />

          <Pressable onPress={() => router.replace("/login" as Href)}>
            <Text style={styles.linkText}>
              Already have an account?{" "}
              <Text style={styles.linkHighlight}>Login here</Text>
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
