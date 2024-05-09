import React, { useEffect, useState } from 'react';
import { requestPermissions } from '../utils/permissions';

function usePermissions() {
  const [loadingPermissions, setLoadingPermissions] = useState(true);
  const [isPermissionsAccepted, setIsPermissionAccepted] = useState(false);

  const checkPermissionStatus = async () => {
    setLoadingPermissions(true);
    try {
      const permissionStatus = await requestPermissions(); // Your custom function
      setIsPermissionAccepted(permissionStatus);
    } catch (error) {
      console.error('Error checking permission status:', error);
    }finally{
      setLoadingPermissions(false);
    }
    
  };

  useEffect(() => {


    checkPermissionStatus();
  }, []);
  
  return {
    loadingPermissions,
    isPermissionsAccepted,
    checkPermissionStatus,
  }
}
export default usePermissions;
