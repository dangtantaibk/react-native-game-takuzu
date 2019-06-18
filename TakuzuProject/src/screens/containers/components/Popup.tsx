import * as React from 'react';
import { Component } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ScreenAreaView from "../../../components/ScreenAreaView";
import {TouchableDebounce} from "../../../components/TouchableDebounce";
import {colors} from "../../../constants/theme";
import reactotron from "reactotron-react-native";

interface IProps {
  modalVisible: boolean,
  onPressButtonYes: () => void,
  onClose: () => void,
  isDontSaveButton?: boolean;
  onDontSave?: () => void;
  title: string
}

class Popup extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const {title, isDontSaveButton} = this.props;

    reactotron.log!('123123', isDontSaveButton);
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={() => { this.props.onClose() }}
      >
        <View style={styles.modal}>
          <TouchableDebounce onPress={() => {this.props.onClose()}}
              style={{ flex: 1 }}/>
          <ScreenAreaView forceInset={{ bottom: 'always' }}
                          style={[styles.modalSelectBox, {height: isDontSaveButton ? 400: 300}]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{'Cảnh báo'}</Text>
              <Text style={styles.textTitle}>{title}</Text>
            </View>
            <View>
              <TouchableOpacity
                style={styles.buttonDone}
                onPress={() => this.props.onPressButtonYes()}>
                <Text style={styles.textButton}>{'Đồng ý'}</Text>
              </TouchableOpacity>
              { isDontSaveButton ?
                <TouchableOpacity
                    style={styles.buttonDontSave}
                    onPress={() => this.props.onDontSave && this.props.onDontSave()}>
                  <Text style={styles.textButton}>{'Thoát nhưng không lưu'}</Text>
                </TouchableOpacity>
                  : null
              }
              <TouchableOpacity
                  style={styles.buttonCancel}
                  onPress={() => this.props.onClose()}>
                <Text style={[styles.textButton, {color: '#000'}]}>{'Trở lại'}</Text>
              </TouchableOpacity>
            </View>
          </ScreenAreaView>
        </View>
      </Modal>
    );
  }
}

export default Popup

const styles = StyleSheet.create({
  buttonCancel: {
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 6,
    height: 50,
    justifyContent: 'center',
    marginHorizontal: 10,
    marginTop: 10
  },
  buttonDone: {
    alignItems: 'center',
    backgroundColor: '#D14242',
    borderRadius: 6,
    height: 50,
    justifyContent: 'center',
    marginHorizontal: 10,
    marginTop: 50
  },
  buttonDontSave: {
    alignItems: 'center',
    backgroundColor: colors.main,
    borderRadius: 6,
    height: 50,
    justifyContent: 'center',
    marginHorizontal: 10,
    marginTop: 10
  },
  modal: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalSelectBox: {
    alignSelf: 'stretch',
    backgroundColor: 'white',
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    flex: 0,
    height: 300,
  },
  textButton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  textTitle: {
    color: '#000000',
    fontSize: 16,
    lineHeight: 26,
    marginHorizontal: 80,
    marginTop: 34,
    textAlign: 'center',
  },
  title: {
    color: '#D14242',
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 26,
    marginHorizontal: 80,
    marginTop: 34,
    textAlign: 'center',
  },
});
