import Register from './components/user/create-user/create-user';
import Login from './components/user/create-user/login-user';
import PhotoUpload from './components/user/create-user/photo-upload/photo-upload';
function App() {
  return (
    <div className="App">
      <h1>Welcome to Hell</h1>
      <Register />
      <Login />
      <PhotoUpload />
    </div>
  );
}

export default App;
