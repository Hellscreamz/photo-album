import Register from './components/user/create-user/create-user';
import Login from './components/user/login-user/login-user';
import PhotoUpload from './components/user/photo-upload/photo-upload';
import HeaderMenu from './components/header/header';

function App() {
  return (
    <div className="App">
      <h1>Welcome to Hell</h1>
      <HeaderMenu />
      <Register />
      <Login />
      <PhotoUpload />
    </div>
  );
}

export default App;
