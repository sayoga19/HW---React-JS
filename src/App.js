
import { Box, Button, VStack, useColorModeValue, Alert, AlertIcon, AlertTitle, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, useDisclosure, HStack } from '@chakra-ui/react';
import * as React from 'react';

function Board() {
  const [squares, setSquares] = React.useState(Array(9).fill(null));
  const nextValue = calculateNextValue(squares);
  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, nextValue);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  React.useEffect(() => {
    if (winner) {
      onOpen();
    }
  }, [winner, onOpen]);

  function selectSquare(square) {
    if (winner || squares[square]) {
      return;
    }
    const squaresCopy = [...squares];
    squaresCopy[square] = nextValue;
    setSquares(squaresCopy);
  }

  function restart() {
    setSquares(Array(9).fill(null));
  }

  function renderSquare(i) {
    return (
      <Button colorScheme='teal' width='50px' height='50px' onClick={() => selectSquare(i)}>
        {squares[i]}
      </Button>
    );
  }

  return (
    <VStack spacing={5}>
      <Alert justifyContent='center' status={winner ? 'success' : 'info'}>
        <AlertIcon />
        <AlertTitle>{status}</AlertTitle>
      </Alert>
      <VStack spacing={1}>
        <HStack spacing={1} >
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </HStack>
        <HStack spacing={1} >
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </HStack>
        <HStack spacing={1} >
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </HStack>
      </VStack>
      <Button colorScheme='orange' size='lg' onClick={restart}>
        restart
      </Button>
      <AlertDialog
        motionPreset='slideInBottom'
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontFamily={'georgia'} fontWeight='bold' textAlign={'center'}>
              Game Over
            </AlertDialogHeader>
            <AlertDialogBody fontSize='lg' fontFamily={'monospace'} textAlign={'center'}> 
              {status} 
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} size='lg' colorScheme='blackAlpha'>
                Close
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </VStack>
  );
}

function Game() {
  const bgColor = useColorModeValue('gray.200', 'gray.700');
  return (
    <Box p={4} bg={bgColor} shadow={'xl'} borderRadius={'lg'} borderWidth='1px'>
        <Board />
    </Box>
  );
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
      ? `Scratch: Cat's game`
      : `Next player: ${nextValue}`;
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return <Game />;
}

export default App;
