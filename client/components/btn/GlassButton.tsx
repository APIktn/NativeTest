import { Pressable, Text, StyleSheet, View } from "react-native"

export function GlassButton({ title, onPress }: any) {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <View style={styles.row}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.6)",
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontSize: 13,
    letterSpacing: 1,
  },
})