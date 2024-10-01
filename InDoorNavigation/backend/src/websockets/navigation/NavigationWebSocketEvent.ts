import { IWebSocketEvent } from "../IWebSocketEvent.js";

export type NavigationWebSocketEvent = Omit<IWebSocketEvent, 'payload'> & {
    payload: any;
};
