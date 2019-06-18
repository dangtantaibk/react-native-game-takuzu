import _ from "lodash";
import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {NavigationScreenProps} from "react-navigation";
import {connect} from "react-redux";
import reactotron from "reactotron-react-native";
import {icons} from "../../assets/images";
import ScreenAreaView from "../../components/ScreenAreaView";
import {TouchableDebounce} from "../../components/TouchableDebounce";
import {colors} from "../../constants/theme";
import {convertSecondsToString} from "../../helpers/common";
import {StoreState} from "../../store";
import ItemRanking from "./components/ItemRanking";
// tslint:disable-next-line:no-var-requires
const Realm = require('realm');


// tslint:disable-next-line:no-empty-interface
interface IStateInjectedProps {
  // fontSizeForDisplay: number,
}

// tslint:disable-next-line:no-empty-interface
interface IProps extends NavigationScreenProps, IStateInjectedProps{

}

interface IState {
  time: number
  realm: any
}

class RankScreen extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      realm: null,
      time: props.navigation.getParam('time', 0)
    }
  }

  public componentWillMount(): void {
    Realm.open({
      schema: [{name: 'Time', properties: {time: 'int'}}]
    }).then((realm: any) => {
      reactotron.log!('info', realm.objects('Time'));
      this.setState({ realm });
    });
  }


  public render() {
    const timeRecentString = convertSecondsToString(this.state.time);
    const listRealm = this.state.realm
        ? this.state.realm.objects('Time')
        : [];
    const listRealmSort = _.sortBy(listRealm, 'time');
    return (
      <ScreenAreaView forceInset={{ top: 'always' }} style={styles.container}>
        <View style={{ flexDirection: 'row', width: '100%', marginTop: 20 }}>
        <TouchableDebounce onPress={() => {this.props.navigation.goBack()}}>
          <Image source={icons.leftArow} style={{tintColor: colors.main, width: 30, height: 30, marginLeft: 30}}/>
        </TouchableDebounce>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: colors.main, fontSize: 22, fontWeight: 'bold', lineHeight: 30 }}>{'Bảng xếp hạng'}</Text>
        </View>
        </View>
        <View style={{ flexDirection: "column", width: '100%', marginTop: 20 }}>
          { listRealmSort.length > 0 ?
              listRealmSort.map((item: any, index: number) => {
            const timeString = convertSecondsToString(item ? item.time : 0);
            if (index <= 4) {
              return (
                  <View style={styles.item} key={index}>
                    <ItemRanking icon={icons.User} title={`${index + 1}. Thời gian hoàn thành: ${timeString}`}/>
                  </View>
              )
            }
          return null;})
              :
              <View style={styles.item}>
                <ItemRanking icon={icons.User} title={`Bạn chưa hoàn thành game nào cả`}/>
              </View>
          }
          {
            this.state.time ?
              <View style={styles.item}>
                <ItemRanking icon={icons.User} title={`Game vừa rồi: ${timeRecentString}`}/>
              </View>
              : <View/>
          }

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