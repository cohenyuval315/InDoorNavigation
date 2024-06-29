import { IWebSocketEvent } from "../IWebSocketEvent";

export type NavigationWebSocketEvent = Omit<IWebSocketEvent, 'payload'> & {
    payload: any;
};
