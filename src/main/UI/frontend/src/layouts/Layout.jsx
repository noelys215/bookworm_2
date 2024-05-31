/* eslint-disable react/prop-types */
import {
	AppBar,
	Box,
	Container,
	IconButton,
	Tabs,
	Toolbar,
	Typography,
	Drawer,
	List,
	ListItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuBookTwoToneIcon from '@mui/icons-material/MenuBookTwoTone';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackToDashboardButton from '../components/BackToDashboardButton';
import BackToExploreButton from '../components/BackToExploreButton';
import BackToAdminButton from '../components/BackToAdminButton';
import Logout from '../components/Logout';
import '@fontsource-variable/open-sans';
import '@fontsource/yeseva-one';

const Layout = ({ children, title }) => {
	const navigate = useNavigate();
	const [drawerOpen, setDrawerOpen] = useState(false);

	const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

	const drawer = (
		<Box
			sx={{ width: '50%' }}
			role="presentation"
			onClick={handleDrawerToggle}
			onKeyDown={handleDrawerToggle}>
			<List>
				<ListItem>
					<BackToAdminButton />
				</ListItem>
				<ListItem>
					<BackToExploreButton />
				</ListItem>
				<ListItem>
					<BackToDashboardButton />
				</ListItem>
				<ListItem>
					<Logout />
				</ListItem>
			</List>
		</Box>
	);

	return (
		<Box
			sx={{
				minHeight: '100vh',
				display: 'flex',
				flexDirection: 'column',
				backgroundColor: '#F9F6EE',
				width: '100%',
				overflow: 'auto',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<Container
				disableGutters
				maxWidth="xl"
				sx={{
					backgroundColor: '#F9F6EE',
					borderRadius: { xs: 0, md: 2 },
					width: { xs: '100%', md: '70vw' },
					height: { xs: '100%', md: 'auto' },
					border: { sm: 'none', md: 'solid 2px' },
				}}>
				<AppBar
					position="static"
					sx={{
						width: '100%',
						padding: 'none',
						borderTopRightRadius: { xs: 0, md: 5 },
						borderTopLeftRadius: { xs: 0, md: 5 },
					}}>
					<Toolbar
						disableGutters
						sx={{ justifyContent: { xs: 'space-between', md: 'flex-start' } }}>
						<IconButton
							size="large"
							aria-controls="menu-appbar"
							onClick={() => navigate('/dashboard')}
							color="inherit">
							<MenuBookTwoToneIcon />
						</IconButton>
						<Typography
							variant="h5"
							noWrap
							href="#app-bar-with-responsive-menu"
							sx={{
								display: { xs: 'flex', md: 'flex' },
								flexGrow: { xs: 1, md: 0 },
								justifyContent: { xs: 'center', md: 'flex-start' },
								position: { xs: 'absolute', md: 'relative' },
								left: { xs: '50%', md: 'initial' },
								transform: { xs: 'translateX(-50%)', md: 'none' },
								fontFamily: 'Yeseva One',
								fontWeight: 400,
								letterSpacing: '.05rem',
								color: 'inherit',
								textDecoration: 'none',
							}}>
							Bookworm Base
						</Typography>
						<IconButton
							size="large"
							color="inherit"
							aria-label="open drawer"
							edge="end"
							onClick={handleDrawerToggle}
							sx={{ display: { xs: 'flex', md: 'none' } }}>
							<MenuIcon />
						</IconButton>
						<Tabs
							textColor="inherit"
							sx={{ marginLeft: 'auto', display: { xs: 'none', md: 'flex' } }}>
							<BackToAdminButton />
							<BackToExploreButton />
							<BackToDashboardButton />
							<Logout />
						</Tabs>
					</Toolbar>
				</AppBar>
				<Drawer
					anchor="right"
					open={drawerOpen}
					onClose={handleDrawerToggle}
					sx={{ display: { xs: 'block', md: 'none' } }}>
					{drawer}
				</Drawer>
				<Box
					sx={{
						width: '100%',
						textAlign: 'center',
						paddingTop: '1rem',
						marginBottom: 2,
					}}>
					<Typography variant="h4" fontFamily={'Open Sans Variable'}>
						{title}
					</Typography>
				</Box>
				{children}
			</Container>
		</Box>
	);
};

export default Layout;
