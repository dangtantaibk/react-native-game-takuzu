import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';
import {NavigationScreenProps} from "react-navigation";
import {connect} from "react-redux";
import {bindActionCreators, Dispatch} from 'redux';
import {icons} from "../../assets/images";
import {TouchableDebounce} from "../../components/TouchableDebounce";
import {colors} from "../../constants/theme";
import {StoreState} from "../../store";
import * as UserActions from "../../store/user/actions";

// tslint:disable-next-line:no-empty-interface
interface IDispatchInjectedProps {
  // UserActions: typeof UserActions,
}


// tslint:disable-next-line:no-empty-interface
interface IStateInjectedProps {
  // fontSizeForDisplay: number,
}

interface IProps extends NavigationScreenProps, IStateInjectedProps, IDispatchInjectedProps{

}

class HomeScreen extends Component<IProps> {
  constructor(props: IProps) {
    super(props);

  }

  public render() {
    return (
      <View style={styles.container}>
        <TouchableDebounce onPress={() => {this.props.navigation.replace('PlayScreen')}}
            style={styles.blockPlay}>
          <Image source={icons.Play} style={{ tintColor: colors.main }}/>
        </TouchableDebounce>
        <TouchableDebounce onPress={() => {this.props.navigation.navigate('RankScreen')}}
            style={styles.blockRanking}>
          <Image source={icons.ranking} style={{ tintColor: colors.main }}/>
        </TouchableDebounce>
      </View>
    );
  }

}

const mapStateToProps = (state: StoreState): IStateInjectedProps => ({
  matrix: state.User.matrix,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchInjectedProps => ({
  UserActions: bindActionCreators(UserActions, dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

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
