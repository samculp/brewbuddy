import { useAuth } from "../context/AuthContext";
import { calculateCurrentCaffeineLevel, coffeeConsumptionHistory, statusLevels, calculateCoffeeStats, getTopThreeCoffees } from "../utils";

function StatCard(props) {
  
  const { lg, title, children } = props
  
  return (
    <div className={"card stat-card" + (lg ? " col-span-2" : "")}>
      <h4>{title}</h4>
      {children}
    </div>
  )
}

function Stats() {

  const { globalData } = useAuth()

  const stats = calculateCoffeeStats(globalData)

  const caffeineLevel = calculateCurrentCaffeineLevel(globalData)

  const warningLevel = caffeineLevel < statusLevels["low"].maxLevel ? "low" :
    caffeineLevel < statusLevels["moderate"].maxLevel ? "moderate" : high

  return ( 
    <>
      <div className="section-header">
        <i className="fa-solid fa-chart-simple" />
        <h2>Stats</h2>
      </div>

      <div className="stats-grid">
        <StatCard lg title="Active Caffeine Level">
          <div className="status">
            <p><span className="stat-text">{caffeineLevel}</span>mg</p>
            <h5 style={{color: statusLevels[warningLevel].color, background: statusLevels[warningLevel].background}}>{warningLevel}</h5>
            <p>{statusLevels[warningLevel].description}</p>
          </div>
        </StatCard>
        <StatCard title="Daily Caffeine">
          <p><span className="stat-text">{stats.daily_caffeine}</span>mg</p>
        </StatCard>
        <StatCard title="Average # of Coffees">
          <p><span className="stat-text">{stats.average_coffees}</span></p>
        </StatCard>
        <StatCard title="Daily Cost ($)">
          <p>$ <span className="stat-text">{stats.daily_cost}</span></p>
        </StatCard>
        <StatCard title="Total Cost ($)">
          <p>$ <span className="stat-text">{stats.total_cost}</span></p>
        </StatCard>

        <table className="stat-table">
          <thead>
            <tr>
              <th>Coffee Name</th>
              <th># of Purchases</th>
              <th>% of Total</th>
            </tr>
          </thead>
          <tbody>
            {getTopThreeCoffees(globalData).map((coffee, coffeeIndex) => {
              return (
                <tr key={coffeeIndex}>
                  <td>{coffee.coffeeName}</td>
                  <td>{coffee.count}</td>
                  <td>{coffee.percentage}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Stats;