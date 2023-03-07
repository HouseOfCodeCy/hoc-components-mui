import { IMetaResponse } from '@houseofcodecy/hoc-utils';
import { Grid } from '@mui/material';
import React from 'react';

interface Props {
	meta: IMetaResponse;
}

const ResponseMeta = ({ meta }: Props) => {
	const calculatePageSize = () => {
		if (meta.pagination.pageSize > meta.pagination.total) {
			return meta.pagination.total;
		} else {
			return meta.pagination.pageSize;
		}
	};

	return (
		<Grid container>
			<Grid item xs={12}>
				<Grid container display={'flex'} justifyContent={'space-between'}>
					<Grid item>
						Viewing page {meta.pagination.page} of {meta.pagination.pageCount}
					</Grid>
					<Grid item>Showing: {calculatePageSize()}</Grid>
					<Grid item>Total Records: {meta.pagination.total}</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default ResponseMeta;
