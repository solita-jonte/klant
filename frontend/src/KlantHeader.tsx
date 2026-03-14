import klantLogo from '/klant.svg'

export function KlantHeader() {
    return (
        <div className="header">
            <img src={klantLogo} className="logo" alt="Klant logo" />
        </div>
    );
}
