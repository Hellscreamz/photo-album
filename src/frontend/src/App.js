import Register from './components/user/create-user/create-user';
import Login from './components/user/create-user/login-user';
import PhotoUpload from './components/user/create-user/photo-upload/photo-upload';
import HeaderMenu from './components/header/header';
import LastTenPhotos from './components/last-uploaded-pics/last-uploaded-pics';

function App() {
  return (
    <div className="App">
      <h1>Welcome to Hell</h1>
      <LastTenPhotos />
      <HeaderMenu />
      <Register />
      <Login />
      <PhotoUpload />
    </div>
  );
}

export default App;
