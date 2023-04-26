import css from './Loader.module.css';
import { Bars } from 'react-loader-spinner';

function Loader() {
  return (
    <div className="">
      <Bars
        height="200"
        width="200"
        color="#3f51b5"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass={css.loader}
        visible={true}
      />
    </div>
  );
}
export default Loader;
