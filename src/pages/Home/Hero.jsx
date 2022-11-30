import style from './Hero.module.css';

export default function Hero() {
  return (
    <div className={style['container']}>
      <div className={`${style['side']} ${style['left']} ${style['drop-shadow-right']}`}>
        <div className={`${style['clipper']} ${style['light']}`}>
          <div className={style['content']}>
            Share your thoughts with the world!
          </div>
        </div>
      </div>
  
      <div className={`${style['side']} ${style['right']}`}>
        <div className={style['clipper']}>
        <div className={style['content']}></div>
        </div>
      </div>
    </div>
  )
}
