import { TablePropsType } from '../../app/Types';

export const ReportTable = ({ TableData }: TablePropsType) => {
	const { contracts, egwp, agwp } = TableData;

	return (
		<>
			<table className="table">
				<thead>
					<tr>
						<th>#</th>
						<th>Jan</th>
						<th>Feb</th>
						<th>Mar</th>
						<th>Apr</th>
						<th>May</th>
						<th>Jun</th>
						<th>Jul</th>
						<th>Aug</th>
						<th>Sep</th>
						<th>Oct</th>
						<th>Nov</th>
						<th>Dec</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Number of Contracts</td>
						{
							contracts.map((contract, i) => <td key={i}>{contract.toLocaleString()}</td>)
						}
					</tr>
					<tr>
						<td>AGWP</td>
						{
							agwp.map((item, i) => <td key={i}>{item.toLocaleString()}</td>)
						}
					</tr>
					<tr>
						<td>EGWP</td>
						{
							egwp.map((item, i) => <td key={i}>{item.toLocaleString()}</td>)
						}
					</tr>
				</tbody>
			</table>
		</>
	)
}
