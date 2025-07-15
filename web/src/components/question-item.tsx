import { Bot, Loader2, MessageSquare, Trash } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { dayjs } from "@/utils/dayjs";
import { useDeleteQuestion } from './http/use-delete-question' // ajuste o caminho se necessário
import { useState } from 'react';

interface Question {
  id: string
  question: string
  answer?: string | null
  createdAt: string
  isGeneratingAnswer?: boolean
}

interface QuestionItemProps {
  question: Question
  roomId: string // adiciona o roomId aqui
}

export function QuestionItem({ question, roomId }: QuestionItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteMutation = useDeleteQuestion();

  async function handleDelete() {
    setIsDeleting(true);
    try {
      await deleteMutation.mutateAsync({ roomId, questionId: question.id });
      // você pode querer exibir um toast ou atualizar UI aqui
    } catch (error) {
      console.error('Erro ao deletar questão:', error);
      // opcional: toast de erro
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Card>
      <CardContent>
        <div className="space-y-4">
          {/* Question */}
          <div className="flex items-start justify-between space-x-3">
            <div className="flex items-start space-x-3 flex-1">
              <div className="flex-shrink-0">
                <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
                  <MessageSquare className="size-4 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <p className="mb-1 font-medium text-foreground">Pergunta</p>
                <p className="whitespace-pre-line text-muted-foreground text-sm leading-relaxed">
                  {question.question}
                </p>
              </div>
            </div>

            {/* Botão deletar */}
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              aria-label="Deletar questão"
              className="text-destructive hover:text-destructive/80 transition"
              title="Deletar questão"
              type="button"
            >
              {isDeleting ? (
                <Loader2 className="size-4 animate-spin text-destructive" />
              ) : (
                <Trash className="size-4" />
              )}
            </button>
          </div>

          {(!!question.answer || question.isGeneratingAnswer) && (
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
                  <Bot className="size-4 text-secondary-foreground" />
                </div>
              </div>
              <div className="flex-1">
                <p className="mb-1 font-medium text-foreground">Resposta da IA</p>
                <div className="text-muted-foreground">
                  {question.isGeneratingAnswer ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="size-4 animate-spin text-primary" />
                      <span className="text-primary text-sm italic">
                        Gerando resposta...
                      </span>
                    </div>
                  ) : (
                    <p className="whitespace-pre-line text-sm leading-relaxed">
                      {question.answer}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <span className="text-muted-foreground text-xs">
              {dayjs(question.createdAt).toNow()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
