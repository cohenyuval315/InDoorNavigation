import React, { useEffect, useState } from 'react';
import { requestContractStatus } from '../utils/contract';

const useContractStatus = () => {
  const [loadingContractStatus, setLoadingContractStatus] = useState(true);
  const [isContractAccepted,setIsContractAccepted] = useState(false);

  const checkContractStatus = async () => {
    setLoadingContractStatus(true);
    try {
      const contractStatus = await requestContractStatus();
      setIsContractAccepted(contractStatus === 'true'); // Convert stored value to boolean
    } catch (error) {
      console.error('Error checking Contract status:', error);
    } finally {
      setLoadingContractStatus(false);
    }
  };

  useEffect(() => {
    checkContractStatus();
  }, []);

  return {
    loadingContractStatus,
    isContractAccepted,
    checkContractStatus
  }
}
export default useContractStatus;
