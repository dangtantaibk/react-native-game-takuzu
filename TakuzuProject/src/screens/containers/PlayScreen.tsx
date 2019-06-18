import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text, TouchableOpacity,
  View
} from 'react-native';
import {connect} from "react-redux";
import reactotron from "reactotron-react-native";
import {icons} from "../../assets/images";
import {colors, styles as STYLES} from "../../constants/theme";
import {changeMatrix, createMatrix} from "../../helpers/common";
import {CardModel} from "../../models/application/CardModel";
import {StoreState} from "../../store";

// tslint:disable-next-line:no-empty-interface
interface IStateInjectedProps {
  // fontSizeForDisplay: number,
}

// tslint:disable-next-line:no-empty-interface
interface IProps extends IStateInjectedProps{

}

interface IState {
  matrix: CardModel[][]
}

class PlayScreen extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      matrix: createMatrix(4,4,2)
    };

    this.renderTable = this.renderTable.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
  }

  public onChangeValue(i: number, j: number) {
    let {matrix} = this.state;
    matrix = changeMatrix(i, j, matrix);
    this.setState({ matrix })
  }

  public render() {

    return (
        <View style={styles.container}>
          <View style={{ flex: 1, width: '100%', justifyContent: 'center', flexDirection: 'row', alignItems: 'flex-end' }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
              <Image source={icons.Clock} style={{ tintColor: colors.clock, width: 30, height: 30 }} resizeMethod={'resize'}/>
              <Text style={{ color: colors.clock, marginLeft: 5, fontWeight: 'bold', fontSize: 25, lineHeight: 30 }}>{'00:00'}</Text>
            </View>
          </View>
          <View style={{ flex: 6, justifyContent: 'center', alignItems: 'center' }}>
            {this.renderTable()}
          </View>
          <View style={{ flex: 2, flexDirection: 'row', }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Image source={icons.Home} style={{ tintColor: colors.main, width: 50, height: 50 }}/>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Image source={icons.refresh} style={{ tintColor: colors.main, width: 50, height: 50 }}/>
            </View>
          </View>
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

export default connect(mapStateToProps, null)(PlayScreen);

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