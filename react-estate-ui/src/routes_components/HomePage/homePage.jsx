import './homePage.scss'
// import Navbar from './components/navbar/Navbar';
import SearchBar from '../../components/searchbar/SearchBar';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
function HomePage() {
  const {currentUser} = useContext(AuthContext)
  // console.log(currentUser)
   return(
    <div className="homePage">
        <div className="textContainer">
                <div className="wrapper">
                  <h1 className="title">Find Real Estate & Get Your Dream Place</h1>
                  <p>
                    user-friendly real estate platform designed to help you find your dream home with ease. Explore a wide range of listings, detailed property info, and advanced search options for a seamless home-buying experience.
                  </p>
                  <SearchBar/>
                  <div className="boxes">
                    <div className="box">
                      <h1>16+</h1>
                      <h2>Years of Experience</h2>
                    </div>
                    <div className="box">
                      <h1>200</h1>
                      <h2>Award Gained</h2>
                    </div>
                    <div className="box">
                      <h1>2000+</h1>
                      <h2>Property Ready</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="imgContainer">
                <img src="/bg.png" alt="" />
              </div>
    </div>
   )
}
export default HomePage;
/*
<div className="homePage">
              
            </div>
*/