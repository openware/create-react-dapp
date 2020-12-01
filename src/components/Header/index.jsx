import './style.scss';

export const Header = () => {
    return (
        <header className="header">
            <h1>Welcome to React decentralized application</h1>
            <h2>Powered by&nbsp;
                <a
                    href="https://www.openware.com/"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    Openware
                </a>
            </h2>
        </header>
    )
}
