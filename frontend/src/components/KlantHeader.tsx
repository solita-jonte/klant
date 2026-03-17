import klantLogo from '/klant.svg'

export function KlantHeader() {
    return (
        <div className="header">
            <img src={klantLogo} className="logo" alt="Klant logo" />
            <h1>Klant File Viewer</h1>
        </div>
    );
}
