import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { DeleteRoomRequest } from "./types/delete-rooms.request";

export function useDeleteRoom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ roomId}: DeleteRoomRequest) => {
      const response = await fetch(`http://localhost:3000/rooms/${roomId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error while deleting room');
      }

      return true;
    },

    onSuccess: (_data) => {
      queryClient.invalidateQueries({
        queryKey: ['get-rooms'],
      });
    },
  });
}
