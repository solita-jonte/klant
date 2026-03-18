import klantLogo from '/klant.svg'

export function KlantHeader() {
    return (
        <div className="flex items-center">
            <img className="w-20 pr-4" src={klantLogo} alt="Klant logo" />
            <h1 className="text-4xl">Klant File Viewer</h1>
        </div>
    );
}
