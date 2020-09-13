import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { nextPair, savePair } from "./chords";
import PadButton from "./PadButton";
import Countdown from "./Countdown";

function secondsToTimeString(secondz) {
    function pad(number) {
        return number < 10 ? `0${number}` : number;
    }

    const minutes = parseInt(secondz / 60);
    const seconds = secondz - minutes * 60;
    return `${pad(minutes)}:${pad(seconds)}`;
}

function makeCurrentText(current) {
    return current.length === 0 ? "start" : `${current[0]}\n${current[1]}`;
}

export default function App() {
    const [current, setCurrent] = useState([]);
    const [isPlaying, setPlaying] = useState(false);
    const [timerKey, setTimerKey] = useState(0);
    const [time, setTime] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setTime(time + 1), 1000);
        return () => clearInterval(timer);
    }, [time]);

    resetTimer = () => {
        setTimerKey(timerKey + 1);
        setPlaying(true);
    };

    chordPairInit = () => {
        setCurrent(nextPair());
        resetTimer();
    };

    saveCurrentPair = () => {
        savePair(current);
    };

    extend = () => {
        resetTimer();
    };

    return (
        <View style={styles.appContainer}>
            <View style={styles.clockContainer}>
                <Text style={styles.clockText}>
                    {secondsToTimeString(time)}
                </Text>
            </View>
            <View style={styles.countdownContainer} onTouchStart={() => chordPairInit()}>
                <Countdown
                    updateKey={timerKey}
                    isPlaying={isPlaying}
                    onComplete={chordPairInit}
                    text={makeCurrentText(current)}
                />
            </View>
            <View style={styles.buttonsContainer}>
                <PadButton
                    id="ch-pr"
                    onPress={chordPairInit}
                    buttonText={current.length == 0 ? "start" : "next pair"}
                />
                <PadButton
                    id="cant"
                    onPress={saveCurrentPair}
                    buttonText={"it's hard"}
                />
                <PadButton id="extend" onPress={extend} buttonText={"extend"} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        backgroundColor: "#EEEEEE",
    },
    clockContainer: {
        flex: 1.25,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    clockText: {
        fontSize: 50,
    },
    countdownContainer: {
        flex: 6,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonsContainer: {
        flex: 1.25,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
});
