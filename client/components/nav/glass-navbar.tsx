import { useState } from 'react';
import { View, Pressable, Text, StyleSheet, Platform } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useAuth } from '@/context/auth.context';

export function GlassNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isActive = (match: string) =>
    pathname === match || pathname.startsWith(match + '/');

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
    router.replace('/login' as any);
  };

  const handleProfile = () => {
    setDropdownOpen(false);
    router.push('/profile' as any);
  };

  return (
    <View style={styles.wrapper}>

      {/* full-screen backdrop to close dropdown */}
      {dropdownOpen && (
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={() => setDropdownOpen(false)}
        />
      )}

      {/* dropdown — appears above the bar, anchored right */}
      {dropdownOpen && (
        <View style={styles.dropdown}>
          <Pressable style={styles.dropdownItem} onPress={handleProfile}>
            <MaterialIcons name="person-outline" size={16} color="#fff" />
            <Text style={styles.dropdownText}>Profile</Text>
          </Pressable>

          <View style={styles.dropdownDivider} />

          <Pressable style={styles.dropdownItem} onPress={handleLogout}>
            <MaterialIcons name="logout" size={16} color="rgba(255,100,100,0.9)" />
            <Text style={[styles.dropdownText, styles.dropdownLogout]}>Logout</Text>
          </Pressable>
        </View>
      )}

      {/* navbar bar */}
      <View style={styles.bar}>

        {/* Home — always visible */}
        <Pressable style={styles.item} onPress={() => router.push('/' as any)}>
          <MaterialIcons
            name="home"
            size={24}
            color={isActive('/') ? '#fff' : 'rgba(255,255,255,0.45)'}
          />
          <Text style={[styles.label, isActive('/') && styles.labelActive]}>
            Home
          </Text>
        </Pressable>

        {user ? (
          /* logged in → Profile with dropdown */
          <Pressable
            style={styles.item}
            onPress={() => setDropdownOpen((v) => !v)}
          >
            <MaterialIcons
              name="person"
              size={24}
              color={isActive('/profile') || dropdownOpen ? '#fff' : 'rgba(255,255,255,0.45)'}
            />
            <Text style={[styles.label, (isActive('/profile') || dropdownOpen) && styles.labelActive]}>
              {user.firstName}
            </Text>
          </Pressable>
        ) : (
          /* not logged in → Login + Sign Up */
          <View style={styles.authGroup}>
            <Pressable
              style={styles.authBtn}
              onPress={() => router.push('/login' as any)}
            >
              <Text style={styles.authBtnText}>Login</Text>
            </Pressable>

            <Pressable
              style={[styles.authBtn, styles.authBtnFilled]}
              onPress={() => router.push('/register' as any)}
            >
              <Text style={styles.authBtnTextFilled}>Sign Up</Text>
            </Pressable>
          </View>
        )}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
    paddingHorizontal: 24,
    paddingTop: 8,
  },

  /* ── dropdown ── */
  dropdown: {
    position: 'absolute',
    right: 24,
    bottom: Platform.OS === 'ios' ? 104 : 80,
    minWidth: 160,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingVertical: 4,
    zIndex: 10,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdownDivider: {
    height: 1,
    marginHorizontal: 12,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  dropdownText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Mitr-Regular',
  },
  dropdownLogout: {
    color: 'rgba(255,100,100,0.9)',
  },

  /* ── bar ── */
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  label: {
    fontSize: 11,
    fontFamily: 'Mitr-Regular',
    color: 'rgba(255,255,255,0.45)',
  },
  labelActive: {
    color: '#fff',
    fontFamily: 'Mitr-Medium',
  },

  /* ── auth buttons ── */
  authGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
  },
  authBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  authBtnFilled: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderColor: 'rgba(255,255,255,0.6)',
  },
  authBtnText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontFamily: 'Mitr-Regular',
  },
  authBtnTextFilled: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Mitr-SemiBold',
  },
});
