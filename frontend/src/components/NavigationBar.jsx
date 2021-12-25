import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { setTravels } from '../redux/actions/travelsActions';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/loginActions';



const NavigationBar = () => {
    
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const dispatch = useDispatch()
    const travels = useSelector(state => state.travels)
    const login = useSelector(state => state.login)


    useEffect(() => {
        const source = axios.CancelToken.source()
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await axios.get('/api/travels/', { headers: {'Content-Type': 'application/json',
            cancelToken: source.token}})
            dispatch(setTravels(res.data))
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()

        return () => {
            console.log("Clean up function.")
            source.cancel()
        }
    },[dispatch])
    
    

    const handleLogout = () => {
        dispatch(logout())
        localStorage.clear()
    }


    return (
        <Navbar bg="light" >
            <Container>
                <Navbar.Brand as={Link} to={"/"}>Travel Log</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Nav>
                    <Nav.Link as={Link} to={"/register"}>Register</Nav.Link>
                    <Nav.Link as={Link} to={"/login"}>Login</Nav.Link>
                    <Nav.Link as={Link} to={"/upload"}>Post Travel</Nav.Link>
                    <NavDropdown title="View Travels" id="basic-nav-dropdown">
                        {loading ? <NavDropdown.Item>Loading...</NavDropdown.Item>
                        : (travels && travels.map(e => {
                            return <NavDropdown.Item as={Link} to={`/travels/${e.title}`} key={e._id}>{e.title}</NavDropdown.Item>
                        }))}
                    </NavDropdown>
                    {login && <Nav.Link href="/" onClick={handleLogout}>Logout</Nav.Link>}
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavigationBar