import './App.css';
import { Provider } from 'react-redux';
import { store } from '../src/application/store';
import QuizApp from './views/quiz_component/page';

function App() {
  return (
    <div className="App">
     <Provider store={store}>
      <QuizApp/>
      </Provider>
    </div>
  );
}

export default App;
