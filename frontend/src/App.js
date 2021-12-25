import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Upload from './components/Upload';
import NavigationBar from './components/NavigationBar';
import Travel from './components/Travel';
import Document from './components/Document'

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Routes>
          <Route exact path='/register' element={<Document register/>} />
          <Route exact path='/login' element={<Document />} />
          <Route exact path='/upload' element={<Upload />} />
          <Route exact path='/travels/:title' element={<Travel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
