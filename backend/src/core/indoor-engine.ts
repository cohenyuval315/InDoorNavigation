
// class InDoorEngine {

//     private static instance: InDoorEngine;
//     private context: EngineContext;
//     private navigationEngine : NavigationEngine;
//     private localizationEngine: LocalizationEngine;

//     private constructor() {}

//     static getInstance(): InDoorEngine {
//         if (!InDoorEngine.instance) {
//             InDoorEngine.instance = new InDoorEngine();
//         }
//         return InDoorEngine.instance;

//     }

//     setContext(context:EngineContext){
//         this.context = context;
//     }

//     getContext(){
//         return this.context
//     }

//     initilize(context:EngineContext){
//         this.setContext(context);
//         this.navigationEngine = new NavigationEngine(context);
//         this.localizationEngine = new LocalizationEngine(context);
//     }

//     start(){
//         this.navigationEngine.start()
//         this.localizationEngine.start()
//     }




//     async calculateNextUserPosition(){

//     }

//     async calculateUserHeading(){

//     }

//     async calculateSystemConfiguration(){

//     }

 


// }


// export default InDoorEngine;


    
