import React from 'react';
import Homecontent from './Homecontent';
import { useSelector} from 'react-redux';


const Home = () => {
  
  const authStatus = useSelector(state => state.auth.status);

   return (
        <>
            {authStatus === true ? (
                <Homecontent />
            ) : (
                <h1>You need to log in first</h1>
            )}
        </>
    );
}

export default Home;
