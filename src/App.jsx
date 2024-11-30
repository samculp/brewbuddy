import Layout from "./components/Layout.jsx"
import Hero from "./components/Hero.jsx"
import CoffeeForm from "./components/CoffeeForm.jsx"
import Stats from "./components/Stats.jsx"
import History from "./components/History.jsx"
import { useAuth } from "./context/AuthContext.jsx"
import { coffeeConsumptionHistory } from "./utils/index.js"

function App() {

  const { globalUser, globalData, isLoading } = useAuth()
  const isAuthenticated = globalUser
  const isData = globalData && !!Object.keys(globalData || {}).length

  const authenticatedContent = (
    <>
      <Stats />
      <History />
    </>
  )

  return (
    <Layout>
      <Hero />
      <CoffeeForm isAuthenticated={isAuthenticated} />
      {(isLoading && isAuthenticated) && (
        <p>Loading data...</p>
      )}
      {(isAuthenticated && isData) && (authenticatedContent)}
    </Layout>
  )
}

export default App;