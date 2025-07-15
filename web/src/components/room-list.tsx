import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowRight, Trash2 } from "lucide-react";

import { dayjs } from "@/utils/dayjs";
import { useRooms } from "./http/use-rooms";
import { useDeleteRoom } from "./http/use-delete-room";

export function RoomList() {
  const { data, isLoading } = useRooms();
  const deleteRoomMutation = useDeleteRoom();

  async function handleDelete(roomId: string) {
    try {
      await deleteRoomMutation.mutateAsync({ roomId });
    } catch (error) {
      console.error("Erro ao deletar sala:", error);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Salas recentes</CardTitle>
        <CardDescription>
          Acesso rápido para as salas criadas recentemente
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        {isLoading && (
          <p className="text-muted-foreground">Carregando salas...</p>
        )}

        {data?.map((room) => (
          <div
            key={room.id}
            className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent/50"
          >
            <Link
              className="flex-1 flex flex-col gap-1"
              to={`/room/${room.id}`}
            >
              <h3 className="font-medium">{room.name}</h3>

              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {dayjs(room.createdAt).toNow()}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {room.questionCount} pergunta(s)
                </Badge>
              </div>
            </Link>

            <div className="flex flex-col items-center gap-2">
              <Link
                to={`/room/${room.id}`}
                className="flex items-center gap-1 text-sm"
              >
                Entrar <ArrowRight className="size-3" />
              </Link>

              <button
                type="button"
                onClick={() => handleDelete(room.id)}
                aria-label="Deletar sala"
                className="text-destructive hover:text-destructive/80"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
