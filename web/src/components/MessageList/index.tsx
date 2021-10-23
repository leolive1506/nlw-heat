import { useEffect, useState } from "react"

import { api } from "../../services/api"
import io from "socket.io-client"

import styles from './styles.module.scss'
import logoImg from "../../assets/logo.svg"

// tipagem da mensagem (apenas as que irá utilizar)
type Message = {
    id: string,
    text: string,
    user: {
        name: string,
        avatar_url: string,
    }
}

// fila de msg
const messagesQueue: Message[] = []

const socket = io('http://localhost:4000')
socket.on('new_message', newMessage => {
    messagesQueue.push(newMessage)
})

export function MessageList() {

    // irá armazenar uma lista de mensagens
    const [messages, setMessages] = useState<Message[]>([])

    useEffect(() => {
        const timer = setInterval(() => {
            if(messagesQueue.length > 0) {
                // adicionar na tela novas msg e as anteriores
                setMessages(prevState => [
                    messagesQueue[0],
                    prevState[0],
                    prevState[1],
                    // quando pega a que tava na fila tem que remover dps 
                ].filter(Boolean)) // com filter boolean, remove valores falses (ex: undefined, null)

                messagesQueue.shift() //remove primeiro item do array
            }
        }, 3000)

    }, [])

    useEffect(() => {
        // se não tiver <Message[]> da um erro falando que a tipagem naõ é a mesma que a Message
        api.get<Message[]>('/messages/last3').then(response => setMessages(response.data))
    }, [])

    return(
        <div className={styles.messageListWrapper}>
            <img src={logoImg} alt="Logo" />

            <ul className={styles.messageList}>

                {messages.map(message => {
                    return (
                        <li key={message.id} className={styles.message}>
                            <div className={styles.messageUser}>
                                <div className={styles.userImage}>
                                    <img  src={message.user.avatar_url} alt={message.user.name} />
                                </div>
                                <span>{message.user.name}</span>
                            </div>
                            <p className={styles.messageContent}>{message.text}</p>

                        </li>
                    )
                })}
                
                
   
         </ul>
        </div>
    )
}