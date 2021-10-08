import {FormEvent, useEffect, useState} from "react";
import {gql, useQuery} from "@apollo/client";

const MESSAGES_QUERY = gql`
    query GetMessages {
        messages {
            id
            content
            name
        }
    }
`

function App() {
  const [name, setName] = useState('')
  const [content, setContent] = useState('')

  const { loading, error, data } = useQuery(MESSAGES_QUERY)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        { loading ? <strong>Loading messages...</strong> : null }

        { error ? <strong>Error loading messages</strong> : null }

        {
          data?.messages?.length ? data?.messages?.map(message => (
            <div key={message?.id}>
              <small>{message?.name}</small>
              <p>{message?.content}</p>
            </div>
          )) : null
        }
      </div>

      <input placeholder="Name (optional)" type="text" value={name} onChange={({ target: { value } }) => setName(value)} />
      <br />

      <textarea placeholder="Your message..." value={content} onChange={({ target: { value } }) => setContent(value)} />
      <br />

      <button type="submit">Publish</button>
    </form>
  )
}

export default App
