import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { DeleteQuestionRequest } from "./types/delete-question-request";

export function useDeleteQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ roomId, questionId }: DeleteQuestionRequest) => {
      const response = await fetch(`http://localhost:3000/rooms/${roomId}/questions/${questionId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar a questão');
      }

      return true;
    },

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['get-questions', variables.roomId],
      });
    },
  });
}
