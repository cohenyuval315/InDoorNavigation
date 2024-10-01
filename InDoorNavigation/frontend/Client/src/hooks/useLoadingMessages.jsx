import { useLoadingMessagesContext } from '../contexts/LoadingMessagesContext';

function useLoadingMessages() {
    const {loadingMessages,addLoadingMessage,resetLoadingMessage,removeLoadingMessage,addLoadingMessageId} = useLoadingMessagesContext()
    
    return { loadingMessages, addLoadingMessage,resetLoadingMessage,removeLoadingMessage,addLoadingMessageId};
}
export default useLoadingMessages;
