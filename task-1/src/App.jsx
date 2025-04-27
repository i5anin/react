import {useState} from 'react';
import styles from './App.module.css';

function App() {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');

	const isValueValid = value.trim().length >= 3;

	const onInputButtonClick = () => {
		const promptValue = prompt('Введите значение:')?.trim() || '';

		if (promptValue.length < 3) {
			setError('Введенное значение должно содержать минимум 3 символа');
			return;
		}

		setValue(promptValue);
		setError('');
	};

	const onAddButtonClick = () => {
		if (!isValueValid) return;

		setList(prevList => [
			...prevList,
			{
				id: Date.now(),
				value,
				date: new Date().toLocaleString('ru-RU'),
			},
		]);

		setValue('');
		setError('');
	};

	return (
		<div className={styles.app}>
			<h1 className={styles['page-heading']}>Ввод значения</h1>

			<p className={styles['no-margin-text']}>
				Текущее значение <code>value</code>:
				{' '}
				"
				<output className={styles['current-value']}>{value}</output>
				"
			</p>

			{error && <div className={styles.error}>{error}</div>}

			<div className={styles['buttons-container']}>
				<button className={styles.button} onClick={onInputButtonClick}>
					Ввести новое
				</button>
				<button
					className={styles.button}
					onClick={onAddButtonClick}
					disabled={!isValueValid}
				>
					Добавить в список
				</button>
			</div>

			<div className={styles['list-container']}>
				<h2 className={styles['list-heading']}>Список:</h2>

				{list.length === 0 ? (
					<p className={styles['no-margin-text']}>Нет добавленных элементов</p>
				) : (
					<ul className={styles.list}>
						{list.map(item => (
							<li key={item.id} className={styles['list-item']}>
								{item.value} ({item.date})
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}

export default App;
