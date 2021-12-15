import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import * as Clipboard from "expo-clipboard";
import { useFonts } from "expo-font";

export default function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  
  const showQuotes = () => {
    fetch("https://api.quotable.io/random/?maxLength=100")
      .then((res) => res.json())
      .then((data) => {
        setQuote(data.content);
        setAuthor(data.author);
      });
  };

  const copyToClipboard = () => {
    Clipboard.setString(quote);
    ToastAndroid.show("The Quote is Copied Successfully", ToastAndroid.SHORT);
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Today's Quote --> " + quote,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  

  useEffect(() => {
    showQuotes();
  }, []);
  
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.mainDiv}>
        <View>
          <Text
            style={{
              fontFamily: "OpearatorMono",
              textAlign: "center",
              marginVertical: 16,
              fontSize: 24,
            }}
          >
            Quote Of The Day
          </Text>
          <View
            style={{
              width: "100%",
              padding: 1,
              borderRadius: 100,
              backgroundColor: "#000",
            }}
          ></View>
        </View>
        <Text style={styles.quote}>"{quote}"</Text>
        <Text style={styles.quoteAuthor}>-- {author}</Text>
        <View>
          <TouchableOpacity
            onPress={showQuotes}
            style={{
              backgroundColor: "#3E67F2",
              borderRadius: 100,
              marginVertical: 18,
            }}
          >
            <Text
              style={{
                fontFamily: "OpearatorMono",

                textAlign: "center",
                padding: 10,
                color: "#fff",
                fontSize: 19,
              }}
            >
              New Quote
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              Speech.stop();
              Speech.speak(quote + "  by  " + author);
            }}
            style={{
              borderRadius: 100,
              borderColor: "#3E67F2",
              borderWidth: 2,
              padding: 10,
            }}
          >
            <FontAwesome color={"#3E67F2"} name="volume-up" size={27} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={copyToClipboard}
            style={{
              borderRadius: 100,
              borderColor: "#3E67F2",
              borderWidth: 2,
              padding: 10,
            }}
          >
            <FontAwesome5 color={"#3E67F2"} name="copy" size={27} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderRadius: 100,
              borderColor: "#3E67F2",
              borderWidth: 2,
              padding: 10,
            }}
          >
            <FontAwesome
              onPress={onShare}
              color={"#3E67F2"}
              name="share-alt"
              size={27}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3E67F2",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  mainDiv: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
  },
  quote: {
    fontFamily: "OpearatorMono",
    fontSize: 23,
    fontStyle: "normal",
    padding: 10,
  },
  quoteAuthor: {
    fontFamily: "OpearatorMono",

    textAlign: "right",
    marginTop: 2,
    padding: 5,
    fontSize: 16,
  },
  buttons: {
    justifyContent: "space-around",
    display: "flex",
  },
  buttonIndividual: {
    borderRadius: 100,
    borderColor: "#000",
    borderWidth: 2,
    padding: 10,
  },
});
