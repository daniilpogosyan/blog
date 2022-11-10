import style from './Hero.module.css';

export default function Hero() {
  return (
    <div className={style['container']}>
      <div className={`${style['side']} ${style['drop-shadow-right']}`}>
        <div className={`${style['blank']} ${style['blank-right']}`}></div>
        <div className={`${style['left']} ${style['light']}`}>
          Share your thoughts with the world!
        </div>
      </div>
  
      <div className={style['side']}>
        <div className={`${style['blank']} ${style['blank-left']}`}></div>
        <div className={style['right']}></div>
      </div>
    </div>
  )
}
