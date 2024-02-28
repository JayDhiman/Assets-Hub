import React from 'react';
import Homecontent from './Homecontent';
import { useSelector} from 'react-redux';
import Dashboard from './Dashboard/Dashboard';


const Home = () => {
  
  const authStatus = useSelector(state => state.auth.status);

   return (
        <>
            {authStatus === true ? (
              <Dashboard/> ) : (
                    <Homecontent />
                    
            )}
        </>
    );
}

export default Home;
