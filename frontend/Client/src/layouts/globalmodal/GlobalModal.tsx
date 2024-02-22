import React, { useEffect, useRef, useState } from 'react';
import { DeviceEventEmitter, Modal, StyleSheet,View } from 'react-native';
import ChildWrapper from './ChildWrapper';
import { BackHandler } from 'react-native';

const SHOW_GLOBAL_MODAL = 'show_global_modal';
const HIDE_GLOBAL_MODAL = "hide_global_modal"

export type GlobalModalProps = {
  skipQueue?: boolean;
  modalKey?: string,
  hideClose?: boolean,
  Component: React.FC,
  backgroundColor?:string
};

export function showGlobalModal(prop: GlobalModalProps) {
  DeviceEventEmitter.emit(SHOW_GLOBAL_MODAL, prop);
}

export function hideGlobalModal(key: string) {
  DeviceEventEmitter.emit(HIDE_GLOBAL_MODAL, key)
}


function GlobalModal() {
  const isMounted = useRef(true);

  const [opacityValue,setOpacityValue] = useState(0);
  const [modalProps, setModalProps] = useState<GlobalModalProps[]>([]);
  const [modalVisible, setModalVisible] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const isFirstModalRef = useRef<boolean>(false)

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);


  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (modalProps.length > 0) {
          closeModal();
          return true;
        }
        return false;
      }
    );

    return () => {
      backHandler.remove();
    };
  }, [modalProps]);


  useEffect(() => {
    const showSub = DeviceEventEmitter.addListener(
      SHOW_GLOBAL_MODAL,
      (prop: GlobalModalProps) => {
        setModalProps((oldProps) => {
          isFirstModalRef.current = oldProps.length === 0
          setIsVisible(true)
          return [
            ...oldProps.filter((it) => !it.skipQueue),
            { ...prop, modalKey: prop.modalKey ?? Date.now().toString() },
          ]
        });
      }
    );
    const hideSub = DeviceEventEmitter.addListener(HIDE_GLOBAL_MODAL, (key: string) => {
      setModalProps((oldProps) => {
        if (oldProps.length === 1) {
          setIsVisible(false)
          return oldProps
        }
        return oldProps.filter((it) => it.modalKey !== key)
      })
    })
    return () => {
      showSub.remove();
      hideSub.remove()
    };
  }, []);


  useEffect(() => {
    if (isVisible) {
      setModalVisible(true);
      setOpacityValue(1);
    }else{
      onModalHide();
      setOpacityValue(0);
    }
  }, [isVisible]);


  const closeModal = () => {
    setModalProps((oldProps) => {
      if (oldProps.length === 1) {
        setIsVisible(false)
        return oldProps
      }
      return oldProps.slice(0, -1)
    });
  }

  const onModalHide = () => {
    setModalVisible(false)
    setModalProps([])
  }

  
  return (
    <Modal
      animationType='none'
      transparent
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View style={[
            styles.backdrop,
            {
              opacity:opacityValue,
            },
            { backgroundColor: modalProps.length > 0 ? modalProps[modalProps.length - 1].backgroundColor : styles.modalView.backgroundColor },
            opacityValue === 0 ? {height:0}:{}
          ]} >
        <View
          style={[
            styles.centeredView,
            {
              opacity:opacityValue,

            },
            opacityValue === 0 ? {height:0}:{}
          ]}
        >
          <View
            style={[styles.modalView,{flex:1}]}
          >
            {modalProps.map((it, index) => (
              <ChildWrapper
                key={it.modalKey}
                isEnabled={index === modalProps.length - 1}
                hideClose={it.hideClose}
                onClosePress={closeModal}
                >
                <it.Component />
              </ChildWrapper>
            ))}
          </View>
          
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0,
    backgroundColor: 'transparent',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    
    // margin: 20,
    backgroundColor: '#343434',
    borderRadius: 20,
    // overflow: 'hidden',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default GlobalModal;