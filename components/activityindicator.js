import React from "react";
import { ActivityIndicator } from "react-native";
function Loading() {
  return (
    <ActivityIndicator
      size="large"
      color="#fff"
      style={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
      }}
    />
  );
}
export { Loading };
