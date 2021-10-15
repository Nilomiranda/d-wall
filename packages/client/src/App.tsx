import {FormEvent, useState} from "react";
import {gql, useMutation, useQuery} from "@apollo/client";
import * as dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import Button from "./components/button/Button";

dayjs.extend(LocalizedFormat)

const MESSAGES_QUERY = gql`
    query GetMessages {
        messages {
            id
            content
            name
            createdAt
        }
    }
`

const PUBLISH_NEW_MESSAGE = gql`
  mutation newMessage($content: String!, $name: String) {
      createMessage(content: $content, name: $name) {
          name
          content
      }
  }
`

function App() {
  const [name, setName] = useState('')
  const [content, setContent] = useState('')

  const { loading, error, data } = useQuery(MESSAGES_QUERY)
  const [publishMessage, { loading: publishing, error: newMessageError, data: publishedData }] = useMutation(PUBLISH_NEW_MESSAGE, {
    refetchQueries: [
      'GetMessages'
    ]
  })

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    await publishMessage({
      variables: {
        name,
        content
      }
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1>Messages</h1>
        <div style={{
          maxHeight: '500px',
          overflowY: 'auto',
        }}>
          { loading ? <strong>Loading messages...</strong> : null }

          { error ? <strong>Error loading messages</strong> : null }

          {
            data?.messages?.length ? data?.messages?.map(message => (
              <div key={message?.id}>
                <small>On {dayjs(message?.createdAt).format('LLL')} {message?.name} said:</small>
                <p>{message?.content}</p>
              </div>
            )) : null
          }

          { !loading && !error && !data?.messages?.length ? <i>No message to show</i> : null }
        </div>
      </div>

      <br />
      <hr />
      <br />

      <input placeholder="Name (optional)" type="text" value={name} onChange={({ target: { value } }) => setName(value)} />
      <br />
      <br />

      <textarea placeholder="Your message..." value={content} onChange={({ target: { value } }) => setContent(value)} />
      <br />
      <br />

      <Button type="submit" disabled={publishing} loading={publishing} loadingText="Publishing" onClick={() => alert('You clicked!')}>Publish</Button>
    </form>
  )
}

export default App
