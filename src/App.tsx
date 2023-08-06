import { Link, Route, Routes } from 'react-router-dom';
import { classNames } from './helpers/classnames';
import AboutPage from './pages/AboutPage';
import MainPage from './pages/MainPage';
import './styles/index.scss';
import { useTheme } from './theme/useTheme';

const App = () => {
	const { theme, toggleTheme } = useTheme();
	return (
		<div className={classNames('app', {}, [theme])}>
			<button onClick={toggleTheme}>TOGGLE THEME</button>
			<Link to={'/'}>Main</Link>
			<Link to={'/about'}>About</Link>
			<Routes>
				<Route path={'/about'} element={<AboutPage />} />
				<Route path={'/'} element={<MainPage />} />
			</Routes>
		</div>
	);
};

export default App;
