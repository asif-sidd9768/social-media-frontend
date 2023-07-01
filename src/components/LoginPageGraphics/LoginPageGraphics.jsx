
import ParticlesBg from 'particles-bg'
import logoImg from "../../assets/images/logo-new.png"
import "./LoginPageGraphics.css"

export const LoginPageGraphics = () => {
  return (
    <div className='graphics-container'>
      <div className='graphics-content'>
        <div>
          <div>
            <img src={logoImg} className='graphics-logo' />
          </div>
          <hr className='graphics-divider' />
          <p className='graphics-long-text'>So, fasten your seatbelts and prepare for an electrifying adventure at Techadelic. Join us now and experience the future today! </p>
          <p>💡🌐💻</p>
        </div>
        <div>
          <p className='graphics-small-text'>Become a part of greater network within you.</p>
        </div>
      </div>
      {/* <ParticlesBg type="circle" bg={{
        position: "relative",
        top: 0,
        left: 0
      }} /> */}
    </div>
  )
}