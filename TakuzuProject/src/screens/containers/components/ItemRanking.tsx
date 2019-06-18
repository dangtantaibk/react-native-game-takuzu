import React, { Component } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { fontFamily } from "../../../constants/theme";


const styles = StyleSheet.create({
  bodyCard: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  bodyCardContentText: {
    color: '#9B9B9B',
    fontFamily,
    fontSize: 18,
    fontWeight: "600",
    left: 60,
    lineHeight: 27,
    position: 'absolute',
    textAlign: 'center',
  },
  content: {
    color: "#232323",
    fontFamily,
    fontSize: 16,
    fontWeight: "normal",
    lineHeight: 22,
    marginTop: 5
  },
  headerLeftBtn: {
    alignItems: 'center',
    height: 18,
    justifyContent: 'center',
    left: 15,
    position: 'absolute',
    width: 18,
    zIndex: 3,
  },
  headerRightBtn: {
    alignItems: 'center',
    height: 18,
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    width: 18,
    zIndex: 3,
  },
  icon: {
    height: 18,
    width: 18
  },
});

interface IProps {
  icon: number;
  title: string;
}

export default class ItemRanking extends Component<IProps> {
  public render(): React.ReactElement<any> {
    return (
      <View
        style={{ paddingVertical: 20 }}
      >
        <View style={styles.bodyCard}>
          <View style={styles.headerLeftBtn}>
            <Image
              style={{ tintColor: '#9B9B9B', width: 30, height: 30 }}
              source={this.props.icon}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.bodyCardContentText}>{this.props.title}</Text>
        </View>
      </View>
    );
  }
}
