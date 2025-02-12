import Card from '../../components/card/Card';
import Filter from '../../components/filter/Filter';
import { listData } from '../../lib/dummydata';
import Map from '../../components/map/map';
import './listPage.scss'
import { useLoaderData } from 'react-router';
function ListPage() {
    
    const posts = useLoaderData();
    return <div className="listPage">

      <div className="listContainer">
        <div className="wrapper">
          <Filter/>
          {posts.map((item,index)=>(
            <Card key={item.id || index} item={item}/>
          ))}
        </div>
      </div>
      <div className="mapContainer">
      <Map items= {posts}/>
      </div>
    </div>;
  }
  
  export default ListPage;