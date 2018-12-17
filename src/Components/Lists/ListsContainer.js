import { connect } from 'react-redux';
import Lists from './Lists';

const mapStateToProps = state => {
  const { lists } = state.dndReducers;
  return {
    lists
  }
}
export default connect(mapStateToProps)(Lists);