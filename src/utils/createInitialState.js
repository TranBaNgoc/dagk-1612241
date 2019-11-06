
// This will be fed into the reducer when the app loads to initialize the state
const createInitialState = () => ({
    history: [
        {
            squares: Array(400).fill(null)
        }
    ],
    arrWin: [],
    arrWinTemp: [],
    stepNumber: 0,
    xIsNext: true,
    check: false,
    checkWin: false,
    moves: [],
    isIncrease: true,
    isDecrease: false,
    currentUser: {},
    error:{},
    pending: false,
    isAuto: false,
    messages: [],
    index: -1,
    withPerson: false,

})

export default createInitialState