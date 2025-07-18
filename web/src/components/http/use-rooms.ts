import { useQuery } from "@tanstack/react-query"
import type { GetRoomsApiResponse } from "./types/get-rooms-response"

export function useRooms() {
   return useQuery({
    queryKey: ['get-rooms'],
    queryFn: async ()=> {
        const response = await fetch('http://localhost:3000/rooms')
        const result: GetRoomsApiResponse = await response.json()

        return result
    },
   })
}