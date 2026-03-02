import { Slot } from "expo-router";
import { GlassNavbar } from "@/components/nav/glass-navbar";

export default function NavLayout() {
  return (
    <>
      <Slot />
      <GlassNavbar />
    </>
  );
}
