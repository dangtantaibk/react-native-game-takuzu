"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const images_1 = require("../../assets/images");
const ScreenAreaView_1 = __importDefault(require("../../components/ScreenAreaView"));
const TouchableDebounce_1 = require("../../components/TouchableDebounce");
const theme_1 = require("../../constants/theme");
const common_1 = require("../../helpers/common");
const ItemRanking_1 = __importDefault(require("./components/ItemRanking"));
const Realm = require('realm');
class RankScreen extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            realm: null,
            time: props.navigation.getParam('time', 0)
        };
    }
    componentWillMount() {
        Realm.open({
            schema: [{ name: 'Time', properties: { time: 'int' } }]
        }).then((realm) => {
            this.setState({ realm });
        });
    }
    render() {
        const timeRecentString = common_1.convertSecondsToString(this.state.time);
        const listRealm = this.state.realm
            ? this.state.realm.objects('Time')
            : [];
        const listRealmSort = lodash_1.default.sortBy(listRealm, 'time');
        return (react_1.default.createElement(ScreenAreaView_1.default, { forceInset: { top: 'always' }, style: styles.container },
            react_1.default.createElement(react_native_1.View, { style: styles.bodyContainer },
                react_1.default.createElement(TouchableDebounce_1.TouchableDebounce, { onPress: () => { this.props.navigation.goBack(); } },
                    react_1.default.createElement(react_native_1.Image, { source: images_1.icons.leftArow, style: styles.iconGoBack })),
                react_1.default.createElement(react_native_1.View, { style: styles.viewTitle },
                    react_1.default.createElement(react_native_1.Text, { style: styles.textTitle }, 'Bảng xếp hạng'))),
            react_1.default.createElement(react_native_1.View, { style: styles.body },
                listRealmSort.length > 0 ?
                    listRealmSort.map((item, index) => {
                        const timeString = common_1.convertSecondsToString(item ? item.time : 0);
                        if (index <= 4) {
                            return (react_1.default.createElement(react_native_1.View, { style: styles.item, key: index },
                                react_1.default.createElement(ItemRanking_1.default, { icon: images_1.icons.User, title: `${index + 1}. Thời gian hoàn thành: ${timeString}` })));
                        }
                        return null;
                    })
                    :
                        react_1.default.createElement(react_native_1.View, { style: styles.item },
                            react_1.default.createElement(ItemRanking_1.default, { icon: images_1.icons.User, title: `Bạn chưa hoàn thành game nào cả` })),
                this.state.time ?
                    react_1.default.createElement(react_native_1.View, { style: styles.item },
                        react_1.default.createElement(ItemRanking_1.default, { icon: images_1.icons.User, title: `Game vừa rồi: ${timeRecentString}` }))
                    : react_1.default.createElement(react_native_1.View, null))));
    }
}
exports.default = RankScreen;
const styles = react_native_1.StyleSheet.create({
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
        backgroundColor: theme_1.colors.background,
        flex: 1,
    },
    iconGoBack: {
        height: 30,
        marginLeft: 30,
        tintColor: theme_1.colors.main,
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
        color: theme_1.colors.main,
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
