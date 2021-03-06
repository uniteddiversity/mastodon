import ImmutablePropTypes from 'react-immutable-proptypes';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import IconButton from './icon_button';
import { injectIntl } from 'react-intl';

const videoStyle = {
  position: 'relative',
  zIndex: '1',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  top: '50%',
  transform: 'translateY(-50%)'
};

const muteStyle = {
  position: 'absolute',
  top: '10px',
  left: '10px',
  opacity: '0.8',
  zIndex: '5'
};

const VideoPlayer = React.createClass({
  propTypes: {
    media: ImmutablePropTypes.map.isRequired,
    width: React.PropTypes.number,
    height: React.PropTypes.number
  },

  getDefaultProps () {
    return {
      width: 196,
      height: 110
    };
  },

  getInitialState () {
    return {
      muted: true
    };
  },

  mixins: [PureRenderMixin],

  handleClick () {
    this.setState({ muted: !this.state.muted });
  },

  handleVideoClick (e) {
    e.stopPropagation();

    const node = ReactDOM.findDOMNode(this).querySelector('video');

    if (node.paused) {
      node.play();
    } else {
      node.pause();
    }
  },

  render () {
    const { media, intl, width, height } = this.props;

    return (
      <div style={{ cursor: 'default', marginTop: '8px', overflow: 'hidden', width: `${width}px`, height: `${height}px`, boxSizing: 'border-box', background: '#000', position: 'relative' }}>
        <div style={muteStyle}><IconButton title={intl.formatMessage({ id: 'video_player.toggle_sound', defaultMessage: 'Toggle sound' })} icon={this.state.muted ? 'volume-up' : 'volume-off'} onClick={this.handleClick} /></div>
        <video src={media.get('url')} autoPlay='true' loop={true} muted={this.state.muted} style={videoStyle} onClick={this.handleVideoClick} />
      </div>
    );
  }

});

export default injectIntl(VideoPlayer);
