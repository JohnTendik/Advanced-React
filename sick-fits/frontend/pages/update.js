import UpdateItem from '../components/UpdateItem/UpdateItem';

const Update = ({query}) => (
  <div>
    <UpdateItem id={query.id}/>
  </div>
)

export default Update;