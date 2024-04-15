import { Link } from 'react-router-dom';
import PageNav from '../components/PageNav';
import AppNav from '../components/AppNav';

function Homepage() {
  return (
    <div>
      <PageNav />
      <AppNav />
      <h1 className='test'>WorldWise</h1>
      <Link to='/pricing'>Pricing</Link>
    </div>
  );
}

export default Homepage;
