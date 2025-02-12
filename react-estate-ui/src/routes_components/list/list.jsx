import './list.scss';
import Card from '../../components/card/Card';

const List = ({posts}) =>{
  
    return(
        <div className='list'>
      {posts.map(item=>(
        <Card key={item._id} item={item}/>
      ))}
    </div>
    )
}
export default List;