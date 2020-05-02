import React from "react";
import s from './Car.module.scss';
import withClass from '../hoc/withClass';
import PropTypes from 'prop-types';

class Car extends React.Component {

  constructor(props) {
    super(props)
    this.inputRef = React.createRef()
  }

  componentDidMount() {
    if (this.props.index === 0) {
      this.inputRef.current.focus()
    }
  }

  render() {
    const inputClasses = [s.input]

    if (this.props.name !== '') {
      inputClasses.push(s.green)
    } else {
      inputClasses.push(s.red)
    }

    if (this.props.name.length > 4) {
      inputClasses.push(s.bold)
    }
    return (
      <>
        <h2>
          Имя: {this.props.name}
        </h2>
        <span>{this.props.age}</span>
        <div>
          <input
            ref={this.inputRef}
            type="text"
            onChange={this.props.onChangeName}
            value={this.props.name}
            className={inputClasses.join(' ')}
          />
        </div>
        <div>
          <button onClick={this.props.onDelete}>Delete</button>
        </div>
      </>
    );
  }
}

Car.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
  onChangeName: PropTypes.func,
  onDelete: PropTypes.func,
  index: PropTypes.number
}

export default withClass(Car, s.Car)