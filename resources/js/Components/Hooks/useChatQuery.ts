import { Message } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";


export interface PaginatedMessage {
    current_page: number;
    data: Message[];
    first_page_url: string,
    from: number,
    last_page: number,
    lasr_page_url: number,
    links: {
        url?: string,
        label: number,
        active: boolean
    }[];
    next_page_url: string,
    path: string,
    per_page: number,
    prev_page_url: string,
    to: number,
    total: number

}
interface Props {
    queryRoute: string;
    value: string;
    queryKey: string

}

export const useChatQuery = ({ queryRoute, value, queryKey }: Props) => {
    const fecthMessages = async ({ pageParam = undefined }) => {
        const { data } = await axios.get(pageParam || queryRoute) as { data: PaginatedMessage };
        return data;
    }

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
        queryKey: [queryKey],
        queryFn: fecthMessages,
        getNextPageParam: (lastpage) => lastpage?.next_page_url,
        refetchInterval: 10000,
        structuralSharing: false
    })

    return { data, fetchNextPage, hasNextPage, isFetchingNextPage, status }
}