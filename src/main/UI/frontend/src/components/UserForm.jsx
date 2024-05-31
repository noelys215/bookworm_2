/* eslint-disable react/prop-types */
import { Box, TextField, Button, Divider, Chip } from '@mui/material';
import '@fontsource-variable/open-sans';

const UserForm = ({
	formTitle,
	userDetails,
	handleChange,
	handleSubmit,
	buttonLabel,
	password,
	handlePasswordChange,
	handlePasswordSubmit,
	passwordButtonLabel,
}) => {
	return (
		<Box sx={{ mt: 5, width: { xs: '90%', md: '60%' }, margin: 'auto' }}>
			<Box component="form" onSubmit={handleSubmit}>
				<Divider variant="middle">
					<Chip
						label={formTitle}
						sx={{ fontSize: '1.1rem', mb: 1, fontFamily: 'Open Sans Variable' }}
					/>
				</Divider>
				<TextField
					type="text"
					name="name"
					label="Name"
					value={userDetails.name || ''}
					onChange={handleChange}
					required
					variant="filled"
					fullWidth
					sx={{ mb: 2 }}
				/>
				<TextField
					type="email"
					name="email"
					label="Email"
					value={userDetails.email || ''}
					onChange={handleChange}
					required
					variant="filled"
					fullWidth
					sx={{ mb: 2 }}
				/>
				<Box width={'100%'} sx={{ display: 'flex', justifyContent: 'center' }}>
					<Button type="submit" variant="contained" color="primary">
						{buttonLabel}
					</Button>
				</Box>
			</Box>

			<Box component="form" onSubmit={handlePasswordSubmit} sx={{ mt: 3 }}>
				<Divider variant="middle">
					<Chip
						label="Update Password"
						sx={{
							fontSize: '1.1rem',
							mb: 1,
							fontFamily: 'Open Sans Variable',
						}}
					/>
				</Divider>
				<TextField
					type="password"
					name="password"
					label="New Password"
					value={password}
					onChange={handlePasswordChange}
					required
					variant="filled"
					fullWidth
					sx={{ mb: 2 }}
				/>
				<Box width={'100%'} sx={{ display: 'flex', justifyContent: 'center' }}>
					<Button type="submit" variant="contained" color="primary">
						{passwordButtonLabel}
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default UserForm;
