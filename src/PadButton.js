import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";

export default function PadButton(props) {
    return (
        <View style={styles.wrapper}>
            <TouchableNativeFeedback
                key={props.id}
                style={styles.button}
                onPress={props.onPress}
                useForeground={true}
            >
                <Text style={styles.buttonText}>{props.buttonText}</Text>
            </TouchableNativeFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 20,
        overflow: "hidden",
    },
    button: {
        width: 100,
        height: 100,
        backgroundColor: "#F4F7F5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#004777",
    },
    buttonText: {
        textAlign: "center",
        color: "#004777",
        fontWeight: "bold",
    },
});
