import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import {connect} from "react-redux";
import {StoreState} from "../../store";

// tslint:disable-next-line:no-empty-interface
interface IStateInjectedProps {
  // fontSizeForDisplay: number,
}

// tslint:disable-next-line:no-empty-interface
interface IProps extends IStateInjectedProps{

}

class RankScreen extends Component<IProps> {
  public render() {

    return (
      <View style={styles.container}>
      </View>
    );
  }
}

const mapStateToProps = (state: StoreState): IStateInjectedProps => ({
  matrix: state.User.matrix,
});

export default connect(mapStateToProps, null)(RankScreen);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flex: 1,
    justifyContent: 'center',
  },
  instructions: {
    color: '#333333',
    marginBottom: 5,
    textAlign: 'center',
  },
  welcome: {
    margin: 10,
    textAlign: 'center',
  },
});