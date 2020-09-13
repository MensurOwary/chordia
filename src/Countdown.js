import React from "react";
import { StyleSheet, Animated } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

export default function Countdown(props) {
    return (
        <CountdownCircleTimer
            key={props.updateKey}
            size={370}
            isPlaying={props.isPlaying}
            duration={130}
            colors={[
                ["#004777", 0.4],
                ["#F7B801", 0.4],
                ["#A30000", 0.2],
            ]}
            onComplete={() => {
                props.onComplete();
                return [false, 0];
            }}
        >
            {(_) => (
                <Animated.Text style={styles.timerText}>{props.text}</Animated.Text>
            )}
        </CountdownCircleTimer>
    );
}

const styles = StyleSheet.create({
    timerText: {
        fontSize: 90,
        color: "#222823",
        textAlign: "center",
    }
});

