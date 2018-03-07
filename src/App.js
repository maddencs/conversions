import React, {Component} from 'react';
import './App.css';


class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'feet': 0,
            'height': 0,
            'width': 0,
            'radius': 0,
            'answer': 0,
            'celsius': 0,
        }
    }

    calculateAnswer(name, val){}

    getFormInput(name){
        return(
            <label htmlFor={name}>{name}
                <input name={name} onChange={(input) =>this.calculateAnswer(name, input.target.value)}/>
            </label>
        )
    }
}

class FeetToMilesCalculator extends Calculator{
    calculateAnswer(feet, val){
        this.setState({feet: val, answer: Number(val)/5280});
    }
    render(){
        return(
            <form className={this.props.className}>
                <h6>Miles: {this.state.answer}</h6>
                {this.getFormInput('feet')}
            </form>
            )
    }
}

class AreaCalculator extends Calculator{
    calculateAnswer(side, val){
        let area;
        if(side === 'height') area = Number(this.state.width) * Number(val);
        if(side === 'width') area = Number(this.state.height) * Number(val);
        this.setState({[side]: val, answer: area})
    }

    render(){
        return(
            <form className={this.props.className}>
                <h6>Area: {this.state.answer}</h6>
                <p>
                    {this.getFormInput('height')}
                </p>
                <p>
                    {this.getFormInput('width')}
                </p>
            </form>
        )
    }
}

class Cels2Fahr extends Calculator{
    calculateAnswer(name, val){
        this.setState({celsius: val, answer: val*1.8 + 32})
    }
    render(){
        return (
            <form className={this.props.className}>
                <h6>Fahrenheit: {this.state.answer}</h6>
                <p>
                    {this.getFormInput('celsius')}
                </p>
            </form>
        )
    }
}

class Fahr2Cels extends Calculator{
    calculateAnswer(name, val){
        this.setState({fahrenheit: val, answer: (val-32)/1.8})
    }
    render(){
        return (
            <form className={this.props.className}>
                <h6>Celsius: {this.state.answer}</h6>
                <p>
                    {this.getFormInput('fahrenheit')}
                </p>
            </form>
        )
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.calculatorTypes = [
            ['feetToMiles', 'Feet to Miles'],
            ['area', 'Area(rectangle)'],
            ['cels2fahr', 'Celsius -> Fahrenheit'],
            ['fahr2cels', 'Fahrenheit -> Celsius'],
        ];
        this.state = {
            'calculatorType': this.calculatorTypes[0][0],
            'answer': 0,
        }
    }

    getCalculatorSelect(){
        return (
            <select onChange={(input) => this.setState({calculatorType: input.target.value})}>
                {this.calculatorTypes.map((type) => <option value={type[0]} selected={this.state.calculatorType == type[0]}>{type[1]}</option>)}
            </select>
        )
    }

    render() {
        let formClass = 'calculator';
        return (
            <div className="App">
                <div className={formClass}>
                {this.getCalculatorSelect()}

                {this.state.calculatorType == 'feetToMiles' ? <FeetToMilesCalculator/> : null }
                {this.state.calculatorType == 'area' ? <AreaCalculator/> : null }
                {this.state.calculatorType == 'cels2fahr' ? <Cels2Fahr/> : null }
                {this.state.calculatorType == 'fahr2cels' ? <Fahr2Cels/> : null }
                </div>
            </div>
        );
    }
}

export default App;
