import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';
import {NavigationScreenProps} from "react-navigation";
import {icons} from "../../assets/images";
import {TouchableDebounce} from "../../components/TouchableDebounce";
import {colors} from "../../constants/theme";

// tslint:disable-next-line:no-empty-interface
interface IProps extends NavigationScreenProps{

}

class HomeScreen extends Component<IProps> {
  constructor(props: IProps) {
    super(props);

    this.onNavigate = this.onNavigate.bind(this);
  }

  public render() {
    return (
      <View style={styles.container}>
        <TouchableDebounce onPress={() => this.onNavigate('PlayScreen')}
            style={styles.blockPlay}>
          <Image source={icons.Play}/>
        </TouchableDebounce>
        <TouchableDebounce onPress={() => this.onNavigate('RankScreen')}
            style={styles.blockRanking}>
          <Image source={icons.ranking} style={{ tintColor: colors.main }}/>
        </TouchableDebounce>
      </View>
    );
  }

  private onNavigate = (nameScreen: string) => {
    this.props.navigation.navigate(nameScreen)
  }

}

export default HomeScreen;

const styles = StyleSheet.create({
  blockPlay: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  blockRanking: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
  },
  textButton: {
    color: 'white'
  },
  welcome: {
    margin: 10,
    textAlign: 'center',
  },
});
