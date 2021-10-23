import prismaClient from "../prisma"

class GetLast3MessagesService {
    async execute() {
        const messages = await prismaClient.message.findMany({
            take: 3, // pegar as tres ultimas pelo take
            orderBy: {
                created_at: "desc" // da mais nova pra masi velha
            },
            include: {
                user: true
            }
        })
        // SELECT * FROM MESSAGES LIMIT 3 ORDER BY CREATED_AT DESC
        return messages
    }
}

export { GetLast3MessagesService }