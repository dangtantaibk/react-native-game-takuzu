import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {connect} from "react-redux";
import {colors} from "../../constants/theme";
import {StoreState} from "../../store";
import ScreenAreaView from "../../components/ScreenAreaView";
import ItemRanking from "./components/ItemRanking";
import {icons} from "../../assets/images";

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
      <ScreenAreaView style={styles.container}>
        <Text style={{ color: colors.main, fontSize: 22, fontWeight: 'bold', lineHeight: 30 }}>{'Bảng xếp hạng'}</Text>
        <View style={{ flexDirection: "column", width: '100%', marginTop: 20 }}>
          <View style={styles.item}>
          <ItemRanking icon={icons.User} title={'1. Chưa có thống kê'}/>
          </View>
          <View style={styles.item}>
            <ItemRanking icon={icons.User} title={'2. Chưa có thống kê'}/>
          </View>
          <View style={styles.item}>
            <ItemRanking icon={icons.User} title={'3. Chưa có thống kê'}/>
          </View>
          <View style={styles.item}>
            <ItemRanking icon={icons.User} title={'4. Chưa có thống kê'}/>
          </View>
          <View style={styles.item}>
            <ItemRanking icon={icons.User} title={'5. Chưa có thống kê'}/>
          </View>
        </View>
      </ScreenAreaView>
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
    backgroundColor: colors.background,
    flex: 1,
  },
  instructions: {
    color: '#333333',
    marginBottom: 5,
    textAlign: 'center',
  },
  item: {
    borderBottomColor: "#9B9B9B",
    borderBottomWidth: 0.25,
    paddingLeft: 20,
  },
  welcome: {
    margin: 10,
    textAlign: 'center',
  },
});