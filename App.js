import React from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { nextPair, savePair } from "./chords";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

export default function App() {
    const [current, setCurrent] = React.useState([]);
    const [isPlaying, setPlaying] = React.useState(false);
    const [timerKey, setTimerKey] = React.useState(0);

    resetTimer = () => {
        setTimerKey(timerKey + 1);
        setPlaying(true);
    };

    chordPairInit = () => {
        setCurrent(nextPair());
        resetTimer();
    };

    saveCurrentPair = () => {
        savePair(current)
    };

    circleButton = (props) => {
        return (
            <TouchableOpacity
                style={props.style}
                onPress={props.onPress}
                key={props.id}
            >
                <Text style={props.buttonTextStyle}>{props.buttonText}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.textBox} onTouchStart={() => chordPairInit()}>
                <CountdownCircleTimer
                    key={timerKey}
                    size={370}
                    isPlaying={isPlaying}
                    duration={130}
                    colors={[
                        ["#004777", 0.4],
                        ["#F7B801", 0.4],
                        ["#A30000", 0.2],
                    ]}
                    onComplete={() => {
                        chordPairInit()
                        return [false, 0]
                    }}
                >
                    {(_) => (
                        <Animated.Text style={styles.notes}>
                            {current.length === 0 ? "start" : `${current[0]}\n${current[1]}`}
                        </Animated.Text>
                    )}
                </CountdownCircleTimer>
            </View>
            <View style={styles.buttonView}>
                {circleButton({
                    id: "ch-pr",
                    style: styles.button,
                    onPress: chordPairInit,
                    buttonTextStyle: styles.buttonTextStyle,
                    buttonText: "Chord Pair",
                })}
                {circleButton({
                    id: "cant",
                    style: styles.button,
                    onPress: saveCurrentPair,
                    buttonTextStyle: styles.buttonTextStyle,
                    buttonText: "Can't do it now",
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EEEEEE",
    },
    notes: {
        fontSize: 90,
        color: "#222823",
        textAlign: "center",
    },
    textBox: {
        flex: 6,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        borderRadius: 50,
        width: 100,
        height: 100,
        backgroundColor: "#F4F7F5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        textAlign: "center",
        color: "#08090A",
    },
    buttonView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
});
