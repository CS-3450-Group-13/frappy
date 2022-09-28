import "./NavigationBar.css"

export default function NavigationBar() {
  return (
    <nav className="navBar">
      <a className="navItem" href="/menu">Menu</a>
      <a className="navItem" href="/inventory">Inventory</a>
      <a className="navItem" href="/employees">Employees</a>
      <a className="navItem" href="/account">Account</a>
      <a className="navItem" href="/settings">Settings</a>
    </nav>
  );
}