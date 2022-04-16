import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { Reports } from '../components/reports/Reports'
import { dataProcessor, setTaskType, selectTaskType } from './appSlice';

function App() {
	const dispatch = useAppDispatch(),
		taskType = useAppSelector(selectTaskType);
	useEffect(() => {
		dispatch(dataProcessor());
	}, [taskType])

	return (
		<div className="container">
			<header className='text-center m-4'>
				<div className="btn-group" role="group" aria-label="Basic radio toggle button group">
					<input
						type="radio"
						className="btn-check"
						name="btnradio"
						autoComplete="off"
						id="btnradio1"
						checked={taskType === 1}
						onChange={() => dispatch(setTaskType(1))}
					/>
					<label className="btn btn-outline-primary" htmlFor="btnradio1">Task 1</label>

					<input
						type="radio"
						className="btn-check"
						name="btnradio"
						autoComplete="off"
						id="btnradio2"
						checked={taskType === 2}
						onChange={() => dispatch(setTaskType(2))}
					/>
					<label className="btn btn-outline-primary" htmlFor="btnradio2">Task 2</label>
				</div>
			</header>
			<Reports />
		</div>
	);
}

export default App;
