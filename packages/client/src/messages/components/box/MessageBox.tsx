import './styles.scss'
import * as dayjs from "dayjs";
import {Message} from "../../models/messageModel";

interface MessageBoxProps {
  message: Message
}

const MessageBox = ({ message }: MessageBoxProps) => {
  return (
    <div className="message-box">
      <small className="message-box__author">{message?.user?.name}</small>
      <p className="message-box__content">{message?.content}</p>
      <span className="message-box__timestamp">{dayjs(message?.createdAt).format('ll')}</span>
    </div>
  )

}

export default MessageBox
