import React, { useState } from 'react';
import styles from './App.module.css'; // подключаем стили

const App = () => {
	// Состояния для операндов и оператора
	const [operand1, setOperand1] = useState('');
	const [operand2, setOperand2] = useState('');
	const [operator, setOperator] = useState('');
	const [display, setDisplay] = useState('');
	const [isResult, setIsResult] = useState(false); // Флаг для отслеживания результата

	// Массив чисел
	const NUMS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

	// Массив операторов
	const OPERATORS = ['+', '-', '=', 'C'];

	// Обработчик для цифр
	const handleNumberClick = (num) => {
		if (isResult) {
			// Если был результат, сбрасываем операнды и оператор
			setOperand1(num);
			setOperand2('');
			setOperator('');
			setIsResult(false);
			setDisplay(num);
		} else {
			if (operator) {
				setOperand2(operand2 + num); // если оператор выбран, добавляем в operand2
				setDisplay(operand1 + operator + (operand2 + num));
			} else {
				setOperand1(operand1 + num); // иначе добавляем в operand1
				setDisplay(operand1 + num);
			}
		}
	};

	// Обработчик для операторов
	const handleOperatorClick = (op) => {
		if (op === 'C') {
			// Сбрасываем все значения
			setOperand1('');
			setOperand2('');
			setOperator('');
			setDisplay('');
			setIsResult(false);
		} else if (operand1 !== '' && operand2 === '') {
			// Устанавливаем оператор только если первый операнд введен и второй еще нет
			setOperator(op);
			setDisplay(operand1 + op);
			setIsResult(false);
		} else if (operand1 !== '' && operand2 !== '') {
			// Если оба операнда введены, считаем результат и меняем оператор
			const result = operator === '+'
				? parseInt(operand1) + parseInt(operand2)
				: parseInt(operand1) - parseInt(operand2);
			setOperand1(result.toString()); // обновляем operand1 с результатом
			setOperand2(''); // сбрасываем operand2
			setOperator(op); // сохраняем новый оператор
			setDisplay(result.toString() + op); // отображаем промежуточный результат
			setIsResult(false);
		}
	};

	// Обработчик для "="
	const handleEqualsClick = () => {
		if (operand1 && operator && operand2) {
			const result = operator === '+'
				? parseInt(operand1) + parseInt(operand2)
				: parseInt(operand1) - parseInt(operand2);
			setDisplay(result.toString()); // Показываем результат без знака "="
			setOperand1(result.toString()); // сохраняем результат в operand1
			setOperand2('');
			setOperator('');
			setIsResult(true); // Устанавливаем флаг, что результат отображен
		}
	};

	return (
		<div className={styles.calculator}>
			<div
				className={`${styles.display} ${isResult ? styles.result : styles.normal}`} // Используем условный класс
			>
				<span>{display || '0'}</span>
			</div>

			<div className={styles.buttons}>
				{/* Кнопки для цифр */}
				{NUMS.map((num) => (
					<button
						key={num}
						onClick={() => handleNumberClick(num)}
						className={styles.button}
					>
						{num}
					</button>
				))}

				{/* Кнопки для операторов */}
				{OPERATORS.map((op) => (
					<button
						key={op}
						onClick={() => handleOperatorClick(op)}
						className={styles.button}
					>
						{op}
					</button>
				))}
			</div>
		</div>
	);
};

export default App;
