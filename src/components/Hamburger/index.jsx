import style from './Hamburger.module.css';

export default function Hamburger({ onClick, isOpen }) {
  return (
    <button
      onClick={onClick}
      className={`${style['hamburger']} ${isOpen ? style['open'] : ''}`}
    >
      <div className={style["bar"]}></div>
      <div className={style["bar"]}></div>
      <div className={style["bar"]}></div>
    </button>
  )
}