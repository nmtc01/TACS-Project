import {
    Link,
} from 'react-router-dom';

export default function HomePage() {

    return (
        <div>
            <ul className="App-header">
                <li>
                    <Link to="/client">All clients</Link>
                </li>
            </ul>
        </div>
    );
}
