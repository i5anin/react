import React, { useState } from 'react';
import data from './data.json';
import styles from './App.module.css';

function App() {
	const [steps, setSteps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	const isFirstStep = activeIndex === 0;
	const isLastStep = activeIndex === steps.length - 1;

	const handleNextStep = () => {
		if (!isLastStep) {
			setActiveIndex(prev => prev + 1);
		}
	};

	const handlePrevStep = () => {
		if (!isFirstStep) {
			setActiveIndex(prev => prev - 1);
		}
	};

	const handleRestart = () => {
		setActiveIndex(0);
	};

	const handleStepClick = index => {
		setActiveIndex(index);
	};

	return (
		<div className={styles.container}>
			<h1 className={styles['page-heading']}>Интерактивная инструкция</h1>

			<div className={styles['steps-content']}>
				<p>{steps[activeIndex].content}</p>
			</div>

			<div className={styles['steps-list']}>
				{steps.map((step, index) => (
					<div
						key={step.id}
						className={`${styles['steps-item']} ${activeIndex === index ? styles.active : ''} ${index < activeIndex ? styles.done : ''}`}
						onClick={() => handleStepClick(index)}
					>
						<button className={styles['steps-item-button']}>{index + 1}</button>
						<span>{step.title}</span>
					</div>
				))}
			</div>

			<div className={styles['buttons-container']}>
				<button
					className={styles.button}
					onClick={handlePrevStep}
					disabled={isFirstStep}
				>
					Назад
				</button>

				<button
					className={styles.button}
					onClick={isLastStep ? handleRestart : handleNextStep}
				>
					{isLastStep ? 'Начать сначала' : 'Далее'}
				</button>
			</div>
		</div>
	);
}

export default App;
