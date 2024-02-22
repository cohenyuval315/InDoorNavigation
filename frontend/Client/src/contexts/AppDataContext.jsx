/* eslint-disable prettier/prettier */
import React,{useContext, useEffect, useState} from "react";
import client from "../services/api-client";

export const AppDataContext = React.createContext();

const afekaBuildingData = {
    id:'324324324343',
    status:'PRODUCTION',
    details:{
        title:'Afeka',
        description:'afeka college',
        buildingType:'COLLEGE',
        address:'Mivtsa Kadesh St 38',
        city:'Tel Aviv-Yafo',
        zipCode:6998812,
        openingHours:`
            Sunday	    9 am - 9 pm
            Monday	    9 am - 9 pm
            Tuesday	    9 am - 9 pm
            Wednesday	9 am - 9 pm
            Thursday	9 am - 9 pm
            Friday	    9 am - 1 pm
            Saturday	Closed
        `,
        websiteLink:`https://www.afeka.ac.il/`,
        phonenumbers:`03-768-8600`,
        buildingOpeningDate: new Date('1996-01-01')
    },
    geoArea:[
        {
            latitude:32.11346715888711,
            longitude:34.818165001968
        }, 
    ],
    entrances:[
        {
            title:'main-entrance',
            description:" afeka campus main entrance",
            isMain:true,
            isEmployeeOnly:false,
            isAvailable:true,
            geoTransitionArea:[
                {
                    latitude:32.11346715888711,
                    longitude:34.818165001968
                }
            ],
            doorGeoCoordinate:{
                direction:'NORTH',
                latitude:32.11346715888711,
                longitude:34.818165001968
            }

        },

    ]
   
}

export const AppDataProvider = ({ children }) => {
    const [buildings,setBuildings]   = useState(null);

    useEffect(()=>{
        client.getBuildings().then((buildings)=>{
            setBuildings(buildings);
        })
        setBuildings([afekaBuildingData]);
    },[])
    return (
      <AppDataContext.Provider
      value={{
        buildings
      }}>
        { children }
      </AppDataContext.Provider>
    )
  
}

export const useAppData = () => {
    return useContext(AppDataContext);
};
  
