import './App.css';
import HeaderForSignUp from './components/HeaderForSignUp';
import Main from './components/Main';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
import Step1of1 from './components/Step1of1';
import Step2of1 from './components/Step2of1';
import Step3of1 from './components/Step3of1';
import Step4of1 from './components/Step4of1';
import Step1of2 from './components/Step1of2';
import Step2of2 from './components/Step2of2';
import Step1of3 from './components/Step1of3';
import SignIn from './components/SignIn';
import OnlyNetflixHeader from './components/OnlyNetflixHeader';
import OnlyNetflixContent from './components/OnlyNetflixContent';
import MoneyHeist from './components/MoneyHeist';
import SeasonX from './components/SeasonX';
import MovieX from './components/MovieX';
import { ContentContext } from './context/contentContext';

import ErrorPage from './components/ErrorPage';
import SignOut from './components/SignOut';
import { useContext } from 'react';
import { SignContext } from './context/signContext.js';
import Home from './components/Home';

// import { useTranslation, Trans } from 'react-i18next';

function App() {
  // const { t } = useTranslation();
  const { sign, signed } = useContext(SignContext);
  const { linkexpo } = useContext(ContentContext);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main></Main>} />
          <Route path='signout' element={<SignOut></SignOut>} />
          <Route path='SignIn' element={<SignIn></SignIn>} />

          <Route path='signup' element={<HeaderForSignUp Signtitle={sign} ></HeaderForSignUp>} title='Netflix'>
            <Route path='step1of1' element={<Step1of1></Step1of1>} />
            <Route path='step2of1' element={<Step2of1></Step2of1>} />
            <Route path='step3of1' element={<Step3of1></Step3of1>} />
            <Route path='step4of1' element={<Step4of1></Step4of1>} />
            <Route path='step1of2' element={<Step1of2></Step1of2>} />
            <Route path='step2of2' element={<Step2of2></Step2of2>} />
            <Route path='step1of3' element={<Step1of3></Step1of3>} />
          </Route>
          <Route path='onlyonnetflix' element={<OnlyNetflixHeader Signtitle={signed}></OnlyNetflixHeader>}>
            <Route path='content' element={<OnlyNetflixContent></OnlyNetflixContent>} />
            <Route path='moneyheist' element={<MoneyHeist></MoneyHeist>} />
            <Route path={`series/${linkexpo}`} element={<SeasonX></SeasonX>} />
            <Route path={`movie/${linkexpo}`} element={<MovieX></MovieX>} />
          </Route>
          <Route path='home' element={<Home></Home>} />

          <Route path='*' element={<ErrorPage></ErrorPage>} />
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
