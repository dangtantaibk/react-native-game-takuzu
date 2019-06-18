import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text, TouchableOpacity,
  View
} from 'react-native';
import {NavigationScreenProps} from "react-navigation";
import {connect} from "react-redux";
import reactotron from "reactotron-react-native";
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
  }

  public componentDidMount(): void {
    this.setInterval();
  }

  public componentWillUnmount(): void {
    clearInterval(this.intervalListener);
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
          this.props.navigation.replace('RankScreen')
        });
      }

    }, 1000);
  }

  public render() {
    const { count, modalConfirmVisible, modalRefreshVisible, matrix } = this.state;
    const timeString = convertSecondsToString(count);
    return (
        <View style={styles.container}>
          <View style={{ flex: 1, width: '100%', justifyContent: 'center', flexDirection: 'row', alignItems: 'flex-end' }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
              <Image source={icons.Clock} style={{ tintColor: colors.clock, width: 30, height: 30 }} resizeMethod={'resize'}/>
              <Text style={{ color: colors.clock, marginLeft: 5, fontWeight: 'bold', fontSize: 25, lineHeight: 30 }}>{timeString}</Text>
            </View>
          </View>
          <View style={{ flex: 6, justifyContent: 'center', alignItems: 'center' }}>
            {this.renderTable()}
          </View>
          <View style={{ flex: 2, flexDirection: 'row', }}>
            <TouchableDebounce onPress={() => {
              clearInterval(this.intervalListener);
              this.setState({
                modalConfirmVisible: true,
              });
            }}
                style={{ flex: 1, alignItems: 'center' }}>
              <Image source={icons.Home} style={{ tintColor: colors.main, width: 50, height: 50 }}/>
            </TouchableDebounce>
            <TouchableDebounce onPress={() => {
              clearInterval(this.intervalListener);
              this.setState({
               modalRefreshVisible: true
              });
            }}
                style={{ flex: 1, alignItems: 'center' }}>
              <Image source={icons.refresh} style={{ tintColor: colors.main, width: 50, height: 50 }}/>
            </TouchableDebounce>
          </View>

          <Popup
              modalVisible={modalConfirmVisible}
              isDontSaveButton={true}
              onDontSave={() => {
                this.props.UserActions.resetState();
                this.props.navigation.goBack();
              }}
              onPressButtonYes={() => {
                this.props.UserActions.changeValueMatrix({
                  matrix,
                  timeCount: count
                });
                this.props.navigation.goBack();
              }}
              onClose={() => {
                clearInterval(this.intervalListener);
                this.setState({modalConfirmVisible: false}, () => this.setInterval())}}
              title={'Bạn có chắc chắn muốn chơi lại không?'}
          />


          <Popup
              modalVisible={modalRefreshVisible}
              onPressButtonYes={() => this.setState({
                count: 0,
                matrix: createMatrix(4,4,2),
                modalRefreshVisible: false
              }, () => this.setInterval())}
              onClose={() => this.setState({
                modalRefreshVisible: false,
              }, () => this.setInterval())}
              title={'Bạn có muốn lưu lại game vừa chơi và trở về màn hình bắt đầu không?'}
          />
        </View>
    );
  }

  private renderTable() {
    const { matrix } = this.state;
      reactotron.log!(matrix);
    return (
        <View style={{  flexDirection: 'column', width: Dimensions.get("window").width, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
                            style={[{ backgroundColor: color, height: 70, margin: 5, padding: 10, flex: 1, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }, STYLES.cardShadow ]}>
                          {
                            item.fixed ? <Image source={icons.Locked} style={{ width: 35, height: 42, tintColor: colorX }}/>
                            :
                            item.error && <Image source={icons.Cross} style={{ width: 60, height: 60, tintColor: colorX }}/>
                          }

                        </TouchableOpacity>
                    )
                  })
                }
              </View>
            )
          })}
        </View>
    )
  }
}

const mapStateToProps = (state: StoreState): IStateInjectedProps => ({
  matrix: state.User.matrix,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchInjectedProps => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayScreen);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
    width: '100%'
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