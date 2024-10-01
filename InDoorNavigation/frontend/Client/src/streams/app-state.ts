import { BehaviorSubject, Observer } from "rxjs";
import { AppState, AppStateStatus} from 'react-native';

export class AppStateManager {
    private static instance: AppStateManager;
    private subject:BehaviorSubject<AppStateStatus>;

    private constructor() {
        this.subject = new BehaviorSubject<AppStateStatus>(AppState.currentState);
        AppState.addEventListener('change', this.handleAppStateChange);
    }  
    
    static getInstance(): AppStateManager {
        if (!AppStateManager.instance) {
            AppStateManager.instance = new AppStateManager();
            
        }
        return AppStateManager.instance;
    }  

    private handleAppStateChange = (nextAppState: AppStateStatus) => {
        this.subject.next(nextAppState);
    };
    
    subscribe(observer: Partial<Observer<AppStateStatus>> | ((value: AppStateStatus) => void) | undefined): void {
        this.subject.subscribe(observer);
    }    
}