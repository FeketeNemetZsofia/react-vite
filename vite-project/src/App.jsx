import { useEffect, useState } from 'react'
import './App.css'
import Pokemons from './components/Pokemons'
import { CssBaseline, Button } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'

function App() {
  const [pokemons, setPokemons] = useState(null) // pokemon array
  const [pokemonsData, setPokemonsData] = useState(null) // fetch result: object with keys + pokemon array
  const [dark, setDark] = useState(true)

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  })

  useEffect(() => console.log(pokemons), [pokemons])

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then(res => res.json())
      .then(data => {
        setPokemons(data.results)
        setPokemonsData(data)
      })
  }, [])

  return (
    <>
      <ThemeProvider theme={dark ? darkTheme : ""}>
        <Button
          variant="contained"
          onClick={() => setDark(dark => !dark)}        
        >change theme</Button>

        <CssBaseline enableColorScheme />

        {pokemons && 
          <>
            <Pokemons pokemons={pokemons} />
            <Button
              variant="contained"
              onClick={() => {
                fetch(pokemonsData.next)
                  .then(res => res.json())
                  .then(data => setPokemons(currentData => [...currentData, ...data.results]))
              }}
            >load more</Button>
          </>
        }
      </ThemeProvider>
    </>
  )
}

export default App