import style from './Hero.module.css';

export default function Hero() {
  return (
    <div className={style['container']}>
      <div className={`${style['side']} ${style['drop-shadow-right']}`}>
        <div className={`${style['blank']} ${style['blank-right']}`}></div>
        <div className={`${style['left']} ${style['light']}`}>Lorem ipsum dolor sit, amet, iste est sit!</div>
      </div>
  
      <div className={style['side']}>
        <div className={`${style['blank']} ${style['blank-left']}`}></div>
        <div className={style['right']}>1 2 3 4 5 6 7 8 9 10</div>
      </div>
    </div>
  )
}
