import ModalLayout from "../../../../../layouts/modal/ModalLayout";
import BuildingPOICard from "../../../components/BuildingPOICard";

const BuildingPOIModal = ({isVisible,closeModal, POI}) => {
    return (
        <ModalLayout 
            isVisible={isVisible} 
            closeModal={closeModal}
        >
            <BuildingPOICard POI={POI}/>
        </ModalLayout>
    )
}
export default BuildingPOIModal;