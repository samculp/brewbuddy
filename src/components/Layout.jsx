import Modal from "./Modal";
import Authentication from "./Authentication";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Layout(props) {

  const { children } = props
  const { globalUser, logout } = useAuth()

  const [showModal, setShowModal] = useState(false)

  const header = (
    <header>
      <div>
        <h1 className="text-gradient">BREWBUDDY</h1>
        <p>For Coffee Insatiates</p>
      </div>
      {globalUser ?
      (
        <button onClick={logout}>
          <p>Logout</p>
          <i className="fa-solid fa-mug-hot"></i>
        </button>
      ) : 
      (
        <button onClick={() => {setShowModal(true)}}>
          <p>Sign up free</p>
          <i className="fa-solid fa-mug-hot"></i>
        </button>
      )}
    </header>
  )

  const footer = (
    <footer>
      <p><span className="text-gradient">BrewBuddy</span> was made by <a href="https://github.com/samculp" target="_blank">Sam Culp</a><br/> using the <a href="https://www.fantacss.smoljames.com" target="_blank">FantaCSS</a> design library.<br/>Check out the project on <a target="_blank" >GitHub</a></p>
    </footer>
  )

  function handleCloseModal() {
    setShowModal(false)
  }

  return ( 
    <>
      {showModal && 
        (<Modal handleCloseModal={handleCloseModal}>
          <Authentication handleCloseModal={handleCloseModal} />
        </Modal>)}
      {header}
      <main>
        {children}
      </main>
      {footer}
    </>
  );
}

export default Layout;