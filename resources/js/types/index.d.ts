


export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    image?: string
    pivot: {
        member_role: MemberRole
    }
}


export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    servers: Server[];
    current_server: Server;
    current_channel: Channel;
    current_conversation?: Conversation


};

interface TimeStamps {
    created_at: string,
    updated_at: string
}

export type ChannelType = 'TEXT' | 'VIDEO' | 'AUDIO'
export type MemberRole = 'ADMIN' | 'MODERATOR' | 'GUEST'

export interface Server extends TimeStamps {
    id: number;
    user_id: number,
    name: string,
    image: string,
    invite_code: string,
    users: User[],
    user: User,
    channels: Channel[]
}
export interface Channel extends TimeStamps {
    id: number;
    user_id: number,
    server_id: number,
    user: User,
    server: Server,
    type: ChannelType
    name: string
}


export interface Message extends TimeStamps {
    id: number;
    user_id: number,
    user: User,
    channel_id: number,
    channel: Channel,
    content: string,
    file?: string,
    deleted_at: string

}

export interface Conversation {
    id: number,
    initiator_id: number,
    initiator: User,
    receiver_id: number,
    receiver: User
}
