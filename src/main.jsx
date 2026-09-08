import React,{useEffect,useState} from 'react';
import {createRoot} from 'react-dom/client';
import './style.css';
const icons=['🍎','🚀','🎸','🐶','🌈','⚽','🎮','🦊'];
const shuffle=a=>[...a].sort(()=>Math.random()-.5);
function App(){
 const [cards,setCards]=useState([]),[flipped,setFlipped]=useState([]),[moves,setMoves]=useState(0),[matched,setMatched]=useState([]),[seconds,setSeconds]=useState(0),[started,setStarted]=useState(false);
 const reset=()=>{setCards(shuffle([...icons,...icons]).map((v,i)=>({id:i,v})));setFlipped([]);setMatched([]);setMoves(0);setSeconds(0);setStarted(false)};
 useEffect(()=>reset(),[]);
 useEffect(()=>{if(!started||matched.length===cards.length)return;const t=setInterval(()=>setSeconds(s=>s+1),1000);return()=>clearInterval(t)},[started,matched,cards]);
 useEffect(()=>{if(flipped.length===2){const [a,b]=flipped;setMoves(m=>m+1);if(cards[a].v===cards[b].v){setMatched(x=>[...x,a,b]);setFlipped([])}else setTimeout(()=>setFlipped([]),700)}},[flipped]);
 const click=i=>{if(matched.includes(i)||flipped.includes(i)||flipped.length===2)return;setStarted(true);setFlipped(f=>[...f,i])};
 const won=cards.length&&matched.length===cards.length;
 return <main><section className="game"><h1>🧠 Memory Card Game</h1><p className="subtitle">Find all matching pairs!</p><div className="stats"><div>Moves <b>{moves}</b></div><div>Time <b>{seconds}s</b></div><div>Pairs <b>{matched.length/2}/8</b></div></div>{won&&<div className="win">🎉 You won in {moves} moves!</div>}<div className="grid">{cards.map((c,i)=>{const open=flipped.includes(i)||matched.includes(i);return <button aria-label="memory card" key={c.id} className={'card '+(open?'open ':'')+(matched.includes(i)?'matched':'')} onClick={()=>click(i)}><span>{open?c.v:'?'}</span></button>})}</div><button className="reset" onClick={reset}>🔄 New Game</button></section></main>
}
createRoot(document.getElementById('root')).render(<App/>);
