"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_redux_1 = require("react-redux");
const reactotron_react_native_1 = __importDefault(require("reactotron-react-native"));
const redux_1 = require("redux");
const images_1 = require("../../assets/images");
const TouchableDebounce_1 = require("../../components/TouchableDebounce");
const theme_1 = require("../../constants/theme");
const common_1 = require("../../helpers/common");
const UserActions = __importStar(require("../../store/user/actions"));
const Popup_1 = __importDefault(require("./components/Popup"));
const Realm = require('realm');
class PlayScreen extends react_1.Component {
    constructor(props) {
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
    componentDidMount() {
        this.setInterval();
    }
    componentWillUnmount() {
        clearInterval(this.intervalListener);
    }
    onChangeValue(i, j) {
        let { matrix } = this.state;
        matrix = common_1.changeMatrix(i, j, matrix);
        this.setState({ matrix });
    }
    setInterval() {
        this.intervalListener = setInterval(() => {
            this.setState({ count: this.state.count + 1 });
            const isDone = common_1.checkMatrixDone(this.state.matrix);
            if (isDone) {
                clearInterval(this.intervalListener);
                Realm.open({
                    schema: [{ name: 'Time', properties: { time: 'int' } }]
                }).then((realm) => {
                    realm.write(() => {
                        realm.create('Time', { time: this.state.count });
                    });
                    this.props.UserActions.resetState();
                    this.props.navigation.replace('RankScreen');
                });
            }
        }, 1000);
    }
    render() {
        const { count, modalConfirmVisible, modalRefreshVisible, matrix } = this.state;
        const timeString = common_1.convertSecondsToString(count);
        return (react_1.default.createElement(react_native_1.View, { style: styles.container },
            react_1.default.createElement(react_native_1.View, { style: { flex: 1, width: '100%', justifyContent: 'center', flexDirection: 'row', alignItems: 'flex-end' } },
                react_1.default.createElement(react_native_1.View, { style: { justifyContent: 'center', alignItems: 'center', flexDirection: 'row' } },
                    react_1.default.createElement(react_native_1.Image, { source: images_1.icons.Clock, style: { tintColor: theme_1.colors.clock, width: 30, height: 30 }, resizeMethod: 'resize' }),
                    react_1.default.createElement(react_native_1.Text, { style: { color: theme_1.colors.clock, marginLeft: 5, fontWeight: 'bold', fontSize: 25, lineHeight: 30 } }, timeString))),
            react_1.default.createElement(react_native_1.View, { style: { flex: 6, justifyContent: 'center', alignItems: 'center' } }, this.renderTable()),
            react_1.default.createElement(react_native_1.View, { style: { flex: 2, flexDirection: 'row', } },
                react_1.default.createElement(TouchableDebounce_1.TouchableDebounce, { onPress: () => {
                        clearInterval(this.intervalListener);
                        this.setState({
                            modalConfirmVisible: true,
                        });
                    }, style: { flex: 1, alignItems: 'center' } },
                    react_1.default.createElement(react_native_1.Image, { source: images_1.icons.Home, style: { tintColor: theme_1.colors.main, width: 50, height: 50 } })),
                react_1.default.createElement(TouchableDebounce_1.TouchableDebounce, { onPress: () => {
                        clearInterval(this.intervalListener);
                        this.setState({
                            modalRefreshVisible: true
                        });
                    }, style: { flex: 1, alignItems: 'center' } },
                    react_1.default.createElement(react_native_1.Image, { source: images_1.icons.refresh, style: { tintColor: theme_1.colors.main, width: 50, height: 50 } }))),
            react_1.default.createElement(Popup_1.default, { modalVisible: modalConfirmVisible, isDontSaveButton: true, onDontSave: () => {
                    this.props.UserActions.resetState();
                    this.props.navigation.goBack();
                }, onPressButtonYes: () => {
                    this.props.UserActions.changeValueMatrix({
                        matrix,
                        timeCount: count
                    });
                    this.props.navigation.goBack();
                }, onClose: () => {
                    clearInterval(this.intervalListener);
                    this.setState({ modalConfirmVisible: false }, () => this.setInterval());
                }, title: 'Bạn có chắc chắn muốn chơi lại không?' }),
            react_1.default.createElement(Popup_1.default, { modalVisible: modalRefreshVisible, onPressButtonYes: () => this.setState({
                    count: 0,
                    matrix: common_1.createMatrix(4, 4, 2),
                    modalRefreshVisible: false
                }, () => this.setInterval()), onClose: () => this.setState({
                    modalRefreshVisible: false,
                }, () => this.setInterval()), title: 'Bạn có muốn lưu lại game vừa chơi và trở về màn hình bắt đầu không?' })));
    }
    renderTable() {
        const { matrix } = this.state;
        reactotron_react_native_1.default.log(matrix);
        return (react_1.default.createElement(react_native_1.View, { style: { flexDirection: 'column', width: react_native_1.Dimensions.get("window").width, flex: 1, justifyContent: 'center', alignItems: 'center' } }, matrix.map((cols, i) => {
            return (react_1.default.createElement(react_native_1.View, { key: i, style: { flexDirection: 'row' } }, cols.map((item, j) => {
                let color, colorX;
                if (!item.fixed) {
                    switch (item.value) {
                        case 0:
                            color = theme_1.colors.main;
                            colorX = theme_1.colors.mainBold;
                            break;
                        case 1:
                            color = theme_1.colors.yellow;
                            colorX = theme_1.colors.yellowBold;
                            break;
                        case 2:
                            color = theme_1.colors.white;
                            colorX = theme_1.colors.white;
                            break;
                        default:
                            color = theme_1.colors.white;
                            colorX = theme_1.colors.white;
                    }
                }
                else {
                    switch (item.value) {
                        case 1:
                            color = theme_1.colors.yellowBold;
                            break;
                        case 0:
                            color = theme_1.colors.mainBold;
                            break;
                        default:
                            color = theme_1.colors.mainBold;
                            colorX = theme_1.colors.white;
                    }
                }
                return (react_1.default.createElement(react_native_1.TouchableOpacity, { disabled: item.fixed, onPress: () => this.onChangeValue(i, j), key: j, style: [{ backgroundColor: color, height: 70, margin: 5, padding: 10, flex: 1, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }, theme_1.styles.cardShadow] }, item.fixed ? react_1.default.createElement(react_native_1.Image, { source: images_1.icons.Locked, style: { width: 35, height: 42, tintColor: colorX } })
                    :
                        item.error && react_1.default.createElement(react_native_1.Image, { source: images_1.icons.Cross, style: { width: 60, height: 60, tintColor: colorX } })));
            })));
        })));
    }
}
const mapStateToProps = (state) => ({
    matrix: state.User.matrix,
});
const mapDispatchToProps = (dispatch) => ({
    UserActions: redux_1.bindActionCreators(UserActions, dispatch)
});
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(PlayScreen);
const styles = react_native_1.StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: theme_1.colors.background,
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
