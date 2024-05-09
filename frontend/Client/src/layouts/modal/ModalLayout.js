import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

const ModalLayout = ({isVisible,closeModal,children}) => {
    return (
        <View>
            <Modal isVisible={isVisible}>
                <View>
                    {children}
                </View>
                <View>
                    <TouchableOpacity onPress={closeModal}>
                        <Text>
                            close
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}
export default ModalLayout;