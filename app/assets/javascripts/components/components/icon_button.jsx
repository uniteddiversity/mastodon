import PureRenderMixin from 'react-addons-pure-render-mixin';

const IconButton = React.createClass({

  propTypes: {
    title: React.PropTypes.string.isRequired,
    icon: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired,
    size: React.PropTypes.number,
    active: React.PropTypes.bool,
    style: React.PropTypes.object,
    activeStyle: React.PropTypes.object
  },

  getDefaultProps () {
    return {
      size: 18,
      active: false
    };
  },

  mixins: [PureRenderMixin],

  handleClick (e) {
    e.preventDefault();
    this.props.onClick();
    e.stopPropagation();
  },

  render () {
    let style = {
      display: 'inline-block',
      border: 'none',
      padding: '0',
      background: 'transparent',
      fontSize: `${this.props.size}px`,
      width: `${this.props.size * 1.28571429}px`,
      height: `${this.props.size}px`,
      lineHeight: `${this.props.size}px`,
      cursor: 'pointer',
      ...this.props.style
    };

    if (this.props.active) {
      style = { ...style, ...this.props.activeStyle };
    }

    return (
      <button aria-label={this.props.title} title={this.props.title} className={`icon-button ${this.props.active ? 'active' : ''}`} onClick={this.handleClick} style={style}>
        <i className={`fa fa-fw fa-${this.props.icon}`} aria-hidden='true' />
      </button>
    );
  }

});

export default IconButton;
