import './App.css';
import Header from './Components/Header';
import Hero from './Components/Hero';
import { ChakraProvider, extendTheme, Flex } from '@chakra-ui/react';

const modifiedTheme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: (props) => ({
      body: {
        backgroundColor: props.colorMode === 'dark' ? 'black' : 'white',
      },
    }),
  },
  shadows: {
    whiteShadow: '0px 30px 90px rgba(255, 255, 255, 0.12)',
  },
});

function App() {
  return (
    <ChakraProvider theme={modifiedTheme}>
      <div className="App">
        <Header />
        <Flex alignItems="center" justifyContent="center" width="100%">
          <Hero />
        </Flex>
        {/*         <Footer/> */}
      </div>
    </ChakraProvider>
  );
}

export default App;
