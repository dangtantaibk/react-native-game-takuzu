import * as React from 'react';
import { Component } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ScreenAreaView from "./ScreenAreaView";
import {TouchableDebounce} from "./TouchableDebounce";
import {colors} from "../constants/theme";

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
          <ScreenAreaView forceInset={{ bottom: 'always' }} style={[styles.modalSelectBox, {height: isDontSaveButton ? 400: 300}]}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: '#D14242', lineHeight: 26, fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginTop: 34, marginHorizontal: 80 }}>
                {'Cảnh báo'}
              </Text>
              <Text style={{ color: '#000000', lineHeight: 26, fontSize: 16, textAlign: 'center', marginTop: 34, marginHorizontal: 80 }}>
                {title}
              </Text>
            </View>
            <View>
              <TouchableOpacity
                style={{ backgroundColor: '#D14242', borderRadius: 6, justifyContent: 'center', alignItems: 'center', height: 50, marginHorizontal: 10, marginTop: 50 }}
                onPress={() => this.props.onPressButtonYes()}>
                <Text style={{ color: '#ffffff', lineHeight: 24, fontSize: 16, fontWeight: 'bold' }}>{'Đồng ý'}</Text>
              </TouchableOpacity>
              { isDontSaveButton &&
                <TouchableOpacity
                    style={{ backgroundColor: colors.main, borderRadius: 6, justifyContent: 'center', alignItems: 'center', height: 50, marginHorizontal: 10, marginTop: 10 }}
                    onPress={() => this.props.onDontSave && this.props.onDontSave()}>
                  <Text style={{ color: '#ffffff', lineHeight: 24, fontSize: 16, fontWeight: 'bold' }}>{'Thoát nhưng không lưu'}</Text>
                </TouchableOpacity>
              }
              <TouchableOpacity
                  style={{ backgroundColor: colors.background, borderRadius: 6, justifyContent: 'center', alignItems: 'center', height: 50, marginHorizontal: 10, marginTop: 10 }}
                  onPress={() => this.props.onClose()}>
                <Text style={{ color: '#000', lineHeight: 24, fontSize: 16, fontWeight: 'bold' }}>{'Trở lại'}</Text>
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
});
