/* eslint-disable react/jsx-no-target-blank */
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'bulma/css/bulma.css'
import Web3 from 'web3'
import { useState , useEffect } from 'react'
import lotteryContract from '../blockchain/Lottery'

export default function Home() {
  /* WEB3 INSTANCE */
  const[_web3,_setWeb3Instance]=useState(null);
  /* ACCOUNT */
  const[_account,_setAccount]=useState(null);
  /* CONTRACT PROVIDER */
  const[_contract,_setContract]=useState(null);
  /* POT */
  const[_pot,_setPot]=useState('');
  /* PLAYERS */
  const[_players,_setPlayers]=useState([]);
  /* ERROR HANDLER */
  const[_error,_setError]= useState('');
  /* SUCESS MESSAGE */
  const[_sucess,_setSucess]=useState('');
  /* LOTTERY WINNERS */
  const[_winners,_setWinners]=useState([]);
  
  /* SET PROB UPDATES */
  useEffect(()=>{
  /* GET POT */
  if(_contract)_getPot();
  /* GET PLAYERS */
  if(_contract)_getPlayers();
  /* GET WINNERS */
  if(_contract)_getWinners();
  },[_contract,_pot,_players,_winners]);
  
/* CHECK IF THE ACCOUNTS HAVE CHANGED */
if(_web3)window.ethereum.on('accountsChanged', async ()=>{
    /* SET THE ACCOUNT */
    const accounts = await _web3.eth.getAccounts();
    _setAccount(accounts[0]);
  })
  const _getWinners = async () =>{
    var array = [];
    /* LOOP */
    for (let index = 1; index != -1; index++) {
      /* GRAB RESULT */
      const address = await _contract.methods.getWinnerByLottery(index).call();
      /* CHECK IF THERES WINNERS */
      if(address==0){
        break;
      }else{
        /* IF THERES WINNERS IT WILL GRAB IT AND PUT IT IN THE ARRAY */
      array.push(address);
      }
    }
    /* IF THE ARRAY IS BIGGER THAN ONE THEN SET IT */
    if(array.length>0)_setWinners(array);
    
  }

  /* FUNCTION TO GET THE AMOUNT OF MONEY IT IS ON THE POT */
  const _getPot = async () =>{
    /* SETTING POT */
  const pot = await _contract.methods.getBalance().call();
  _setPot(pot);
  }
 /* GET PLAYERS */
  const _getPlayers = async () => {
  /* SETTING PLAYERS */
  const players = await _contract.methods.getPlayers().call();
  _setPlayers(players);
  }

  /* FUNCTION TO PLAY THE GAME */
  const _playGame = async () =>{
  
  try {
    /* ENTER THE GAME */
    if(_account){await _contract.methods.enter().send({from: _account , value: Web3.utils.toWei('0.001','ether')});
    _setSucess('Enter Sucess');
  }else{
    const account = await _web3.eth.getAccounts();
    await _contract.methods.enter().send({from: account[0] , value: Web3.utils.toWei('0.001','ether')});
    _setSucess('Enter Sucess');
    }

  } catch (error) {
    /* SET ERROR MESSAGE */
    _setError(error.message);
  }
  
  }

  /* FUNCTION TO PICK AN WINNER */
  const _pickWinner = async () => {
    try {
      /* ENTER THE GAME */
      if(_account){await _contract.methods.pickwinner().send({from: _account});
      _setSucess('Enter Sucess');
    }else{
      const account = await _web3.eth.getAccounts();
      await _contract.methods.pickwinner().send({from: account[0]});
      _setSucess('Enter Sucess');
      }
  
    } catch (error) {
      /* SET ERROR MESSAGE */
      _setError(error.message);
    }
  }

  /* FUNCTION TO CONNECT THE WALLET */
  const _Connectwallet = async () =>{
    /* TRY AGAIN */
    _setError('');
  /* CHECK IF METAMASK EXISTS */
  if(typeof window !== 'undefined' && typeof window.ethereum !== 'undefined'){
    try {
      /* MAKE THE REQUEST */
      await window.ethereum.request({method: "eth_requestAccounts"});
      /* SET WEB3 INSTANCE */
      var web3=new Web3(window.ethereum);
      _setWeb3Instance(web3);
      /* SET ACCOUNTS */
      var accounts=web3.eth.getAccounts();
      _setAccount(accounts[0]);
      /* SET CONTRACT PROVIDER */
      _setContract(lotteryContract(web3));
      /* SUCESS MESSAGE */
      _setSucess('Conection Sucess');
    } catch (error) {
    /* CASE ERROR */
    _setError(error.message);
    }
  }else{
  /* IF THERES NOT METAMASK */
  _setError('You need metamask to connect');
  }
  }

  return (
    <div>
      <Head>
        <title>Lottery Dapp</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* BULMA NAVVAR */}
        <nav className='navbar mt-4 mb-4'>
        {/* CONTAINER */}
        <div className='container'>
        {/* NAVBAR BRAND FOR HAVE TEXT IN THE LEFT */}
        <div className='navbar-brand'>
        <h1>Lottery</h1>
        </div>
        {/* ANOTHER NAVBAR BUT FOR THE END/RIGHT OF THE PAGE */}
        <div className='navbar-end'>
        {/* SIMPLE BUTTON FOR WALLET CONNECTION */}
        <button className='button is-link' onClick={_Connectwallet}>Connect wallet</button>
        </div>
        </div>
        </nav>
        {/* ANOTHER CONTAINER */}
        <div className='container'>
        {/* AN SECTION  */}
        <section className='mt-5'>



        {/* DIV WITH GRID */}
        <div className='columns'>
        {/* DIV WITH GRID */}
        <div className='column is-two-thirds'>

        {/* SECTION TO PLAY */}
        <section className='mt-5'>
        <p>Enter the lottery by sending 0.001 Ether</p>
        {/* SIMPLE BUTTON */}
        <button className='button is-large is-light is-link mt-3' onClick={_playGame}>Play now</button>
        </section>

        {/* SECTION TO PICK AN WINNER */}
        <section className='mt-6'>
        <p><b>Admin only:</b> Pick winner</p>
        {/* SIMPLE BUTTON */}
        <button className='button is-large is-light is-primary mt-3' onClick={_pickWinner}>Pick Winner</button>
        </section>
        
        {/* ERROR SECTION */}
        <section>
        <div className='container has-text-danger mt-5'>
        <p>{_error}</p>  
        </div>
        </section>

        {/* SUCESS SECTION */}
        <section>
        <div className='container has-text-success mt-5'>
        <p>{_sucess}</p>  
        </div>
        </section>





        </div>

        {/* DIV WITH GRID */}
        <div className={`${styles.lotteryinfo} column is-one-thirds`}>
        <section className='mt-5'>
        {/* LOTTERY INFO CARD CONTENT */}
        <div className='card'>
        <div className='card-content'>
        <div className='content'>
          <h2>Lottery History</h2>
          <div className='history-entry'>
          <ul className='ml-0'>
          {/* MAPPING WINNERS */}
          {_winners.map((winner,index) =>{
          
          // eslint-disable-next-line react/jsx-key
          return (<div>
          <li>
          {/* RETURN OF THE FOLLOWING */} 
          <p>Lottery Winner #{index+1}</p>
          <a href={`https://rinkeby.etherscan.io/address/${winner}`} target={"_blank"}>{winner}</a>  
          </li>
          </div>)

          })}
          </ul>

          </div>
        </div>
        </div>  
        </div>
        </section>

        <section className='mt-5'>
        {/* LOTTERY INFO CARD CONTENT */}
        <div className='card'>
        <div className='card-content'>
        <div className='content'>
          <h2>Players ({_players.length})</h2>
          <div>
          
          <ul className='ml-0'>
          {/* MAPPING */}
          {_players.map((player) =>{
            {/* MAKING IT RETURNING LINKS OF THE PLAYERS */}
            // eslint-disable-next-line react/jsx-key
            return <li><a href={`https://rinkeby.etherscan.io/address/${player}`} target={"_blank"}>{player}</a></li>
          })}
            </ul>
          </div>
          
        </div>
        </div>  
        </div>
        </section>

        <section className='mt-5'>
        {/* LOTTERY INFO CARD CONTENT */}
        <div className='card'>
        <div className='card-content'>
        <div className='content'>
          <h2>POT</h2>
          <p>{Web3.utils.fromWei(_pot,'ether')} ether</p>
        </div>
        </div>  
        </div>
        </section>


        </div>
        </div>



        </section>
        </div>
      </main>

      <footer className={styles.footer}>
      <p>pedrochunks</p>
      </footer>
    </div>
  )
}
