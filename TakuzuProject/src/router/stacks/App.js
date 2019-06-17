import { createStackNavigator } from "react-navigation";
import {HomeScreen} from "../../screens";
import PlayScreen from "../../screens/containers/PlayScreen";
import RankScreen from "../../screens/containers/RankScreen";

export const App =
    createStackNavigator({
      HomeScreen,
      PlayScreen,
      RankScreen
    }, {
      headerMode: "none",
      initialRouteName: 'HomeScreen',
      navigationOptions: {
        swipeEnabled: false
      }
});
