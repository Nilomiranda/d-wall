import {FormEvent, useState} from "react";
import {gql, useMutation, useQuery} from "@apollo/client";

const MESSAGES_QUERY = gql`
    query GetMessages {
        messages {
            id
            content
            name
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
        { loading ? <strong>Loading messages...</strong> : null }

        { error ? <strong>Error loading messages</strong> : null }

        {
          data?.messages?.length ? data?.messages?.map(message => (
            <div key={message?.id}>
              <small>{message?.name}</small>
              <p>{message?.content}</p>
            </div>
          )) : <i>No messages to show</i>
        }
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

      <button type="submit" disabled={publishing}>{publishing ? 'Publishing' : 'Publish'}</button>
    </form>
  )
}

export default App
