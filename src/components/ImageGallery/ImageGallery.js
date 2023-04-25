import { Component } from 'react';
import { FcBinoculars } from 'react-icons/fc';
import { Bars } from 'react-loader-spinner';
// import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
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
    page: 1,
    total: null,
    error: null,
    status: Status.IDLE,
    disabled: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevQuery !== nextQuery) {
      this.setState({
        images: [],
        page: 1,
        total: null,
        status: Status.PENDING,
        disabled: false,
      });

      getImages(nextQuery, 1)
        .then(images => {
          console.log(images);

          if (images.data.hits.length === images.data.totalHits) {
            return this.setState({
              images: [...images.data.hits],
              total: images.data.totalHits,
              status: Status.RESOLVED,
              disabled: true,
            });
          }
          return this.setState({
            images: [...images.data.hits],
            total: images.data.totalHits,
            status: Status.RESOLVED,
          });
        })
        .catch(error => this.setState({ error, status: Status.REJECTED }));
      return;
    }

    if (prevPage !== nextPage && nextPage !== 1) {
      this.setState({ status: Status.PENDING });

      getImages(nextQuery, nextPage)
        .then(images => {
          console.log(images);
          if (
            this.state.images.length + images.data.hits.length ===
            images.data.totalHits
          ) {
            return this.setState(prevState => ({
              images: [...prevState.images, ...images.data.hits],
              status: Status.RESOLVED,
              disabled: true,
            }));
          }
          return this.setState(prevState => ({
            images: [...prevState.images, ...images.data.hits],
            status: Status.RESOLVED,
          }));
        })
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }

  handleChangePage = e => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const { images, error, status } = this.state;

    if (status === 'idle') {
      return (
        <section className={status}>
          <div>
            <h3>Start your search right now...</h3>
            <FcBinoculars />
          </div>
        </section>
      );
    }

    if (status === 'pending') {
      return (
        <section className={status}>
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
        </section>
      );
    }

    if (status === 'rejected') {
      return (
        <section className={status}>
          <p>{error.message}</p>
        </section>
      );
    }

    if (status === 'resolved') {
      return (
        <section className={status}>
          <ul>
            <ImageGalleryItem list={images} />
          </ul>
          <Button
            page={this.state.page}
            total={this.state.total}
            onChangePage={this.handleChangePage}
            isActive={this.state.disabled}
          />
        </section>
      );
    }
  }
}

export default ImageGallery;
