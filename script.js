class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    //clear all, default to empty string
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }
    
    //delete single number using slice method
    delete() { 
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }

    //add number and only allow a single period
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    //if operand is empty return
    //sum is carried out if you have 2 operands and placed in previous operand  
    //changes operand from current to previous
    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    //calculate 
    //dont compute if previous or current operand is empty
    //switch statement for which operation is selected
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch(this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
             case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previous = '';
    }

    //update display and handles 
    //if operation is not null then show previous operand and operation
    //remove previous operand when calculated
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;    
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = 
                `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
        
    }
}

//variables
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const previousButton = document.querySelector('[data-previous]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

//create a new class and pass everything into it
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

//Loop over all buttons and add event listener
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

//Loop over operation buttons and add event listener
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

//equals button
equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

//clear button
allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
  })
  

//delete button
deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})