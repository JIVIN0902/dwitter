import Feed from './components/Feed'
import Options from './components/Options'
import Happening from './components/Happening'

const Home = () => {
  return (
    <div className="grid grid-cols-10">
      <Options />
      <Feed />
      <Happening />
    </div>
  )
}

export default Home

