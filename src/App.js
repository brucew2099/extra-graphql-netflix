import "./App.css"
import { useEffect, useState } from "react"
import Section from "./components/Section"
import HeroSection from "./components/HeroSection"
import NavBar from "./components/NavBar"

const App = () => {
  const genreIncrement = 4
  const [genres, setGenres] = useState(null)
  const [limit, setLimit] = useState(genreIncrement)

  const fetchData = async () => {
    const response = await fetch("/.netlify/functions/getGenres", {
      method: "POST",
      body: limit,
    })
    const responseBody = await response.json()
    setGenres(responseBody.data.reference_list.values)
  }

  useEffect(() => {
    fetchData()
    // To prevent the following error:
    // React Hook useEffect has a missing dependency: 'fetchData'. 
    // Either include it or remove the dependency array react-hooks/exhaustive-deps
    // Add the following line:
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit])

  return (
    <>
      <NavBar />
      <HeroSection />
      {genres && (
        <div className="container">
          {Object.values(genres).map((genre, index) => (
            <Section key={index} genre={genre.value} />
          ))}
        </div>
      )}
      <div
        className="page-end"
        onMouseEnter={() => {
          setLimit(limit + genreIncrement)
        }}
      />
    </>
  )
}

export default App