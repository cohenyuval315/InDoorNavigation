import React, { useEffect, useState } from 'react';

function AppSetup() {
  const [loadingSetup, setLoadingSetup] = useState(true);
  const [IsSetupSuccess,setIsSetupSuccess] = useState(false);

  async function setup(){
    setLoadingSetup(true);
    setLoadingSetup(false);
  }
  useEffect(()=>{
    setup()
  },[])
  
  return (
    <>
    </>
  );
}
export default AppSetup;
