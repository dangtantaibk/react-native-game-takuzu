import _ from "lodash";
import React, { Component } from 'react';
import {
  Image, LayoutAnimation,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {NavigationScreenProps} from "react-navigation";
import {icons} from "../../assets/images";
import ScreenAreaView from "../../components/ScreenAreaView";
import {TouchableDebounce} from "../../components/TouchableDebounce";
import {colors} from "../../constants/theme";
import {convertSecondsToString} from "../../helpers/common";
import ItemRanking from "./components/ItemRanking";
// tslint:disable-next-line:no-var-requires
const Realm = require('realm');

// tslint:disable-next-line:no-empty-interface
interface IProps extends NavigationScreenProps{

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

  public componentDidMount(): void {
    Realm.open({
      schema: [{name: 'Time', properties: {time: 'int'}}]
    }).then((realm: any) => {
      this.setState({ realm });
    });
  }

  public componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }


  public render() {
    const timeRecentString = convertSecondsToString(this.state.time);
    const listRealm = this.state.realm
        ? this.state.realm.objects('Time')
        : [];
    const listRealmSort = _.sortBy(listRealm, 'time');
    return (
      <ScreenAreaView forceInset={{ top: 'always' }} style={styles.container}>
        <View style={styles.bodyContainer}>
        <TouchableDebounce
            onPress={() => {this.props.navigation.goBack()}}>
          <Image source={icons.leftArow} style={styles.iconGoBack}/>
        </TouchableDebounce>
        <View style={styles.viewTitle}>
          <Text style={styles.textTitle}>{'Bảng xếp hạng'}</Text>
        </View>
        </View>
        <View style={styles.body}>
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

export default RankScreen;

const styles = StyleSheet.create({
  body: {
    flexDirection: "column",
    marginTop: 20,
    width: '100%',
  },
  bodyContainer: {
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
  },
  iconGoBack: {
    height: 30,
    marginLeft: 30,
    tintColor: colors.main,
    width: 30,
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
  textTitle: {
    color: colors.main,
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 30,
  },
  viewTitle: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  welcome: {
    margin: 10,
    textAlign: 'center',
  },
});