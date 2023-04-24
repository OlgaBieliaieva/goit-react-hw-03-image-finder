import { Component } from 'react';
import { FcBinoculars } from 'react-icons/fc';
import { Bars } from 'react-loader-spinner';
// import PropTypes from 'prop-types';
import getImages from 'services/api';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class ImageGallery extends Component {
  state = {
    images: [],
    error: null,
    status: Status.IDLE,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;

    if (prevQuery !== nextQuery) {
      this.setState({ status: Status.PENDING });
    }

    getImages(nextQuery)
      .then(images => this.setState({ images, status: Status.RESOLVED }))
      .catch(error => this.setState({ error, status: Status.REJECTED }));
  }

  render() {
    const { images, error, status } = this.state;

    if (status === 'idle') {
      return (
        <div>
          <h3>Start your search right now...</h3>
          <FcBinoculars />
        </div>
      );
    }

    if (status === 'pending') {
      return (
        <div>
          <Bars
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      );
    }

    if (status === 'rejected') {
      return <p>{error.message}</p>;
    }

    if (status === 'resolved') {
      return <p>it's OK</p>;
    }
  }
}

export default ImageGallery;
