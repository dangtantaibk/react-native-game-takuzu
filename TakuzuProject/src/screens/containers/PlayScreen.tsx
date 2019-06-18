import React, { Component } from 'react';
import {
  Dimensions,
  Image, LayoutAnimation,
  StyleSheet,
  Text, TouchableOpacity,
  View
} from 'react-native';
import {NavigationScreenProps} from "react-navigation";
import {connect} from "react-redux";
import {bindActionCreators, Dispatch} from "redux";
import {icons} from "../../assets/images";
import {TouchableDebounce} from "../../components/TouchableDebounce";
import {colors, styles as STYLES} from "../../constants/theme";
import {changeMatrix, checkMatrixDone, convertSecondsToString, createMatrix} from "../../helpers/common";
import {CardModel} from "../../models/application/CardModel";
import {MatrixModel} from "../../models/application/MatrixModel";
import {StoreState} from "../../store";
import * as UserActions from '../../store/user/actions'
import Popup from "./components/Popup";
// tslint:disable-next-line:no-var-requires
const Realm = require('realm');

interface IStateInjectedProps {
  matrix: MatrixModel,
}

interface IDispatchInjectedProps {
  UserActions: typeof UserActions
}

// tslint:disable-next-line:no-empty-interface
interface IProps extends NavigationScreenProps, IStateInjectedProps, IDispatchInjectedProps{

}

interface IState {
  matrix: CardModel[][]
  count: number;
  modalConfirmVisible: boolean;
  modalRefreshVisible: boolean;
}

class PlayScreen extends Component<IProps, IState> {
  private intervalListener: any;

  constructor(props: IProps) {
    super(props);

    this.state = {
      count: props.matrix.timeCount || 0,
      matrix: props.matrix.matrix || [],
      modalConfirmVisible: false,
      modalRefreshVisible: false,
    };

    this.renderTable = this.renderTable.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.setInterval = this.setInterval.bind(this);
    this.onModalConfirm = this.onModalConfirm.bind(this);
    this.onModalRefresh = this.onModalRefresh.bind(this);
    this.onDontSave = this.onDontSave.bind(this);
    this.onGoBackHomeScreen = this.onGoBackHomeScreen.bind(this);
    this.onCloseModalConfirm = this.onCloseModalConfirm.bind(this);
    this.onRefreshGame = this.onRefreshGame.bind(this);
    this.onCloseModalRefresh = this.onCloseModalRefresh.bind(this);
  }

  public componentDidMount(): void {
    this.setInterval();
  }

  public componentWillUnmount(): void {
    clearInterval(this.intervalListener);
  }

  public componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  public onChangeValue(i: number, j: number) {
    let {matrix} = this.state;
    matrix = changeMatrix(i, j, matrix);
    this.setState({ matrix })
  }

  public setInterval() {
    this.intervalListener = setInterval(() => {
      this.setState({ count: this.state.count + 1 });

      const isDone = checkMatrixDone(this.state.matrix);
      if (isDone) {
        clearInterval(this.intervalListener);
        Realm.open({
          schema: [{name: 'Time', properties: {time: 'int'}}]
        }).then((realm: any) => {
          realm.write(() => {
            realm.create('Time', {time: this.state.count});
          });
          this.props.UserActions.resetState();
          this.props.navigation.replace('RankScreen', {time: this.state.count});
        });
      }

    }, 1000);
  }

  public onModalConfirm() {
    clearInterval(this.intervalListener);
    this.setState({
      modalConfirmVisible: true,
    });
  }

  public onModalRefresh() {
    clearInterval(this.intervalListener);
    this.setState({
      modalConfirmVisible: true,
    });
  }

  public onDontSave() {
    this.props.UserActions.resetState();
    this.setState({modalConfirmVisible: false}, () => {
      this.props.navigation.goBack();
    })
  }

  public onGoBackHomeScreen() {
    const {matrix, count} = this.state;
    this.props.UserActions.changeValueMatrix({
      matrix,
      timeCount: count
    });
    this.setState({modalConfirmVisible: false}, () => {
      this.props.navigation.goBack();
    })
  }

  public onCloseModalConfirm() {
    clearInterval(this.intervalListener);
    this.setState({modalConfirmVisible: false}, () => this.setInterval())
  }

  public onRefreshGame() {
    this.setState({
      count: 0,
      matrix: createMatrix(4,4,2),
      modalRefreshVisible: false
    }, () => this.setInterval())
  }

  public onCloseModalRefresh() {
    this.setState({
      modalRefreshVisible: false,
    }, () => this.setInterval())
  }

  public render() {
    const { count, modalConfirmVisible, modalRefreshVisible } = this.state;
    const timeString = convertSecondsToString(count);

    return (
        <View style={styles.container}>

          <View style={styles.bodyContainer}>
            <View style={styles.bodyHeader}>
              <Image source={icons.Clock} style={styles.bodyIconClock} resizeMethod={'resize'}/>
              <Text style={styles.bodyTextClock}>{timeString}</Text>
            </View>
          </View>

          <View style={styles.bodyTable}>
            {this.renderTable()}
          </View>

          <View style={styles.bodyFooter}>
            <TouchableDebounce
                onPress={() => this.onModalConfirm()}
                style={styles.buttonFooter}>
              <Image source={icons.Home} style={styles.imageFooter}/>
            </TouchableDebounce>
            <TouchableDebounce
                onPress={() => this.onModalRefresh()}
                style={styles.buttonFooter}>
              <Image source={icons.refresh} style={styles.imageFooter}/>
            </TouchableDebounce>
          </View>

          <Popup
              modalVisible={modalConfirmVisible}
              isDontSaveButton={true}
              onDontSave={this.onDontSave}
              onPressButtonYes={this.onGoBackHomeScreen}
              onClose={this.onCloseModalConfirm}
              title={'Bạn có chắc chắn muốn chơi lại không?'}
          />

          <Popup
              modalVisible={modalRefreshVisible}
              onPressButtonYes={this.onRefreshGame}
              onClose={this.onCloseModalRefresh}
              title={'Bạn có muốn lưu lại game vừa chơi và trở về màn hình bắt đầu không?'}
          />
        </View>
    );
  }

  private renderTable() {
    const { matrix } = this.state;

    return (
        <View style={styles.tableContainer}>
          { matrix.map((cols, i) => {
            return (
              <View key={i} style={{ flexDirection: 'row' }}>
                {
                  cols.map((item, j) => {
                    // tslint:disable-next-line:one-variable-per-declaration
                    let color, colorX;
                    if (!item.fixed) {
                      switch (item.value) {
                        case 0: color = colors.main; colorX = colors.mainBold; break;
                        case 1: color = colors.yellow; colorX = colors.yellowBold; break;
                        case 2: color = colors.white; colorX = colors.white; break;
                        default: color = colors.white; colorX = colors.white;
                      }
                    } else {
                      switch (item.value) {
                        case 1: color = colors.yellowBold;  break;
                        case 0: color = colors.mainBold; break;
                        default: color = colors.mainBold; colorX = colors.white;
                      }
                    }

                    return (
                        <TouchableOpacity
                            disabled={item.fixed}
                            onPress={() => this.onChangeValue(i, j)}
                            key={j}
                            style={[{ backgroundColor: color}, styles.tableCard, STYLES.cardShadow ]}>
                          {
                            item.fixed ? <Image source={icons.Locked} style={{ width: 35, height: 42, tintColor: colorX }}/>
                            :
                            item.error && <Image source={icons.Cross} style={{ width: 60, height: 60, tintColor: colorX }}/>
                          }

                        </TouchableOpacity>
                    )})}
              </View>
            )})}
        </View>
    )}
}

const mapStateToProps = (state: StoreState): IStateInjectedProps => ({
  matrix: state.User.matrix,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchInjectedProps => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayScreen);

const styles = StyleSheet.create({
  bodyContainer: {
    alignItems: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  bodyFooter: {
    flex: 2,
    flexDirection: 'row'
  },
  bodyHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bodyIconClock: {
    height: 30,
    tintColor: colors.clock,
    width: 30,
  },
  bodyTable: {
    alignItems: 'center',
    flex: 6,
    justifyContent: 'center',
  },
  bodyTextClock: {
    color: colors.clock,
    fontSize: 25,
    fontWeight: 'bold',
    lineHeight: 30,
    marginLeft: 5,
  },
  buttonFooter: {
    alignItems: 'center',
    flex: 1,
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
    width: '100%'
  },
  imageFooter: {
    height: 50,
    tintColor: colors.main,
    width: 50,
  },
  instructions: {
    color: '#333333',
    marginBottom: 5,
    textAlign: 'center',
  },
  tableCard: {
    alignItems: 'center',
    borderRadius: 10,
    flex: 1,
    height: 70,
    justifyContent: 'center',
    margin: 5,
    padding: 10,
  },
  tableContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    width: Dimensions.get("window").width,
  },
  welcome: {
    margin: 10,
    textAlign: 'center',
  },
});