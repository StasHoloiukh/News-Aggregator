import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {Feed} from './pages/Feed'
import './App.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Feed />
    </QueryClientProvider>
  )
}

export default App
