import {
    Link,
} from 'react-router-dom';

export default function HomePage() {

// TODO list of links to routes <ul><li></li></ul>, routes on file routes.tsx
    return (
        <div>
            <ul>
                <li>
                    <Link to="/client">All clients</Link>
                </li>
            </ul>
        </div>
    );
}
