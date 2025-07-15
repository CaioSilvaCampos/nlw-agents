import { Routes,Route, BrowserRouter } from "react-router-dom"
import { CreateRoom } from "./pages/create-room"
import { Room } from "./pages/rooms"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RecordRoomAudio } from "./pages/record-room-audio"

const queryClient = new QueryClient()

function App() {
  return (
   <QueryClientProvider client={queryClient}> 
   <BrowserRouter>
    <Routes>
      <Route element={<CreateRoom/>} index />
      <Route path="/room/:roomId" element={<Room/>}/>
      <Route element={<RecordRoomAudio/>} path="/room/:roomId/audio"></Route>
    </Routes>
    </BrowserRouter>
    </QueryClientProvider>  
  )
  
}

export default App
