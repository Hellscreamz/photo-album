import Register from './components/user/create-user/create-user';
import Login from './components/user/login-user/login-user';
import PhotoUpload from './components/user/photo-upload/photo-upload';
import HeaderMenu from './components/header/header';
import AdminPanel from './components/admin/admin-panel';

function App() {
  return (
    <div className="App">
      <h1>Photo Organizer</h1>
      <HeaderMenu />
      <AdminPanel />
      <Register />
      <Login />
      <PhotoUpload />
    </div>
  );
}

export default App;
