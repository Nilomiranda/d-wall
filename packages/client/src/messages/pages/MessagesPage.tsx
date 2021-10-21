import {FormEvent, useState} from "react";
import {gql, useMutation} from "@apollo/client";
import * as dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import Button from "../../shared/components/button/Button";
import MessageList from "../../messages/components/list/MessageList";
import Input from "../../shared/components/input/Input";
import TextArea from "../../shared/components/input/TextArea";

dayjs.extend(LocalizedFormat)

const PUBLISH_NEW_MESSAGE = gql`
    mutation newMessage($content: String!, $name: String) {
        createMessage(content: $content, name: $name) {
            name
            content
        }
    }
`

export const MessagesPage = () => {
  const [name, setName] = useState('')
  const [content, setContent] = useState('')

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
        <MessageList />
      </div>

      <br />
      <hr />
      <br />

      <Input label="Name (optional)" placeholder="Someone Cool" type="text" value={name} onChange={({ target: { value } }) => setName(value)} />
      <br />
      <br />

      <TextArea placeholder="Your message..." value={content} onChange={({ target: { value } }) => setContent(value)} />
      <br />
      <br />

      <Button type="submit" disabled={publishing} loading={publishing} loadingText="Publishing" onClick={() => alert('You clicked!')}>Publish</Button>
    </form>
  )
}

export default MessagesPage
