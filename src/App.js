import React, {Component} from 'react';
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";
import Counter from "./Counter/Counter";
import './App.scss';
import Car from "./Car/Car";


export const ClickedContext = React.createContext(false)

class App extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      person: [
        {
          id: '1',
          name: "Витя-ку-ку",
          are: 27
        },
        {
          id: '2',
          name: "Юля",
          are: 24
        },
        {
          id: '3',
          name: "Петя",
          are: 50
        },
      ],
      pageTitle: "Витя ты крут!!",
      showCars: false
    }
  }

  changeTitleHandler = (pageTitle) => {
    this.setState({
      pageTitle
    })
  }

  showCarsHandler = () => {
    this.setState({
      showCars: !this.state.showCars
    })
  }

  onChangeName(name, index) {
    const pos = this.state.person[index]
    pos.name = name
    const post = [...this.state.person]
    post[index] = pos
    this.setState({
      post
    })
  }

  deleteHandler(index) {
    const person = this.state.person.concat()
    person.splice(index, 1)
    this.setState({person})
  }

  componentWillMount() {
    console.log('App: componentWillMount')
  }

  componentDidMount() {
    console.log('App: componentDidMount')
  }

  render() {
    console.log('App: render')
    let post = null
    if (this.state.showCars) {
      post = this.state.person.map((pos, index) => {
        return (
          <ErrorBoundary key={index}>
            <Car
              index={index}
              name={pos.name}
              age={pos.are}
              onChangeTitle={this.changeTitleHandler.bind(this, pos.name)}
              onChangeName={event => this.onChangeName(event.target.value, index)}
              onDelete={this.deleteHandler.bind(this, index)}
            />
          </ErrorBoundary>
        )
      })
    }

    return (
      <div style={{textAlign: "center", fontSize: "20px"}}>
        <h1 style={{margin: '0'}}>{this.props.title}</h1>

        <ClickedContext.Provider value={this.state.clicked}>
          <Counter/>
        </ClickedContext.Provider>

        <hr/>
        <button onClick={this.showCarsHandler}>Показать список</button>
        <button onClick={() => this.setState({clicked: true})}>Кнопка</button>
        {post}
      </div>
    );
  };
}

export default App;
