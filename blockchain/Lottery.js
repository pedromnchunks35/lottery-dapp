import Web3 from "web3";
/* ABI */
const abi=[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"enter","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPlayers","outputs":[{"internalType":"address payable[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_lotteryId","type":"uint256"}],"name":"getWinnerByLottery","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lotteryId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pickwinner","outputs":[],"stateMutability":"nonpayable","type":"function"}];
/* CONTRACT ITSELF */
const lotteryContract = _web3 =>{
    return new _web3.eth.Contract(
        abi,
        "0xDD7FBC5C585A2AA06d613920b4bb09CC4F75aEeA"
    )
}
/* EXPORT IT */
export default lotteryContract;