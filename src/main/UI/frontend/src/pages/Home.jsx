import { Box, Container, Typography } from '@mui/material';
import AuthForm from '../components/AuthForm';
import '@fontsource-variable/open-sans';

const Home = () => {
	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				<Typography component="h1" variant="h5" fontFamily={'Open Sans Variable'}>
					Welcome to Bookworm Base
				</Typography>
				<AuthForm />
			</Box>
		</Container>
	);
};

export default Home;
