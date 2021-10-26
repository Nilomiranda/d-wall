import './styles.scss'
import {Message} from "../../models/messageModel";
import MessageBox from "../box/MessageBox";
import {gql, useQuery} from "@apollo/client";
import Spinner from "../../../shared/components/spinner/Spinner";

const MESSAGES_QUERY = gql`
    query GetMessages {
        messages {
            id
            content
            createdAt
            user {
                name
            }
        }
    }
`

const MessageList = () => {
  const { loading, error, data } = useQuery(MESSAGES_QUERY)

  return (
    <div className="messages-list">
      { loading ? <Spinner text="Loading messages" /> : null }

      { error ? <strong>Error loading messages</strong> : null }
       {
         data?.messages?.length ? data?.messages?.map((message: Message) => (
           <div style={{ marginBottom: '1rem' }} key={message?.id}>
             <MessageBox message={message} />
           </div>
         )) : null
       }

      { !loading && !error && !data?.messages?.length ? <i>No message to show</i> : null }
    </div>
  )
}

export default MessageList
