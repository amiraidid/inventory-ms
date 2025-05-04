import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@chakra-ui/react'


function Header() {

  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const handleLogout = () => {
    sessionStorage.removeItem('token')
    navigate('/login')
    window.location.reload()
  }

  return (
    <div>
      <nav className='flex justify-between items-center py-2 px-3 '>
        <Link to={'/'}><h1 className='text-3xl max-sm:text-xl font-bold italic text-text '>DAARJEEX</h1></Link>
        <ul className='flex items-center gap-3'>
          {
            user ? (
              <div className='flex gap-3'>
                <li><Link to={'/'}><i className="bi bi-bell text-2xl max-sm:text-xl"></i></Link></li>
                <li><Link to={'/carts'}><Button colorScheme='blue' variant={'link'}><i className="bi bi-cart-plus-fill text-xl"></i></Button></Link></li>
                <li><button onClick={() => handleLogout()} className='bg-sky-950 text-white px-3 py-1 rounded w-fit'>Logout</button></li>
              </div>
            ) : (
              <div className='flex gap-3 items-center'>
                {/* <li><Link to={'/sign-up-page'} className='bg-sky-50 text-black border px-3 py-1 rounded'>Signup</Link></li> */}
                <li><Link to={'/login'} className='bg-sky-950 text-white px-3 py-1 rounded'>Login</Link></li>
              </div>
            )
          }
          
         
        </ul>
      </nav>
      <hr />
    </div>
  )
}

export default Header